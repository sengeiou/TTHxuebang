// pages/kcdetails/kcdetails.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";

class Content extends AppBase {

  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "kcxq"
    })
  }
  daojishi() {
    var that = this;


    var list = that.Base.getMyData().daojishilist;
    console.log(list);
    console.log(52);
    this.timer=setInterval(() => {

      var sjlist = [];
      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        var jisuandate = new Date(list[i]);
        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000)));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000)));   //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000)));//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));


        sjlist.push(listtt);

      }
      that.Base.setMyData({

        sjlist: sjlist

      })



    }, 1000)





  }
  onHide() {
    console.error(66666);
    clearInterval(this.timer);
 

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();


    //this.Base.options.id
    jigouapi.courseinfo({
      id: this.Base.options.id
    }, (courseinfo) => {
      console.log("哈哈哈");
      console.log(courseinfo);
      if (courseinfo.isgroup != 0) {
        jigouapi.pintuanlist({ group_course_id: courseinfo.id }, (pintuanlist) => {
          console.log(pintuanlist);
          var pintuanrenshu = 0;
          var daojishilist = [];
          for (var i = 0; i < pintuanlist.length; i++) {
            pintuanrenshu += pintuanlist[i].tuanlist.length;
            pintuanlist[i].commander_id_name = ApiUtil.masaike(pintuanlist[i].commander_id_name);
            pintuanlist[i].xunhuandate = ApiUtil.shijianjisuan(pintuanlist[i].jieshushijian);
            daojishilist[i] = pintuanlist[i].jieshushijian;
          }

          this.Base.setMyData({
            pintuanlist: pintuanlist, pintuanrenshu: pintuanrenshu, daojishilist: daojishilist
          })
          this.daojishi();
        })
      }

      jigouapi.kechenlunbo({
        name: courseinfo.id, orderby: 'r_main.seq', status: "A"
      }, (kechenlunbo) => {

        this.Base.setMyData({
          kechenlunbo
        });
      });


      this.Base.getAddress((address) => {
        console.log(address);
        var mylat = address.location.lat;
        var mylng = address.location.lng;

        var mile = ApiUtil.GetDistance(mylat, mylng, courseinfo.JG_lat, courseinfo.JG_lng);

        var miletxt = ApiUtil.GetMileTxt(mile);
        this.Base.setMyData({
          miletxt,
          scoring: parseInt(courseinfo.scoring)
        });
        var scoring = this.Base.getMyData().scoring;
        console.log("啊啊啊" + scoring)

      });

      this.Base.setMyData({
        courseinfo,
        isfav: courseinfo.isfav
      });

    });

    jigouapi.checkcanbuy({
      course_id: this.Base.options.id
    }, (canbuy) => {

      this.Base.setMyData({
        canbuy
      });
    });


  }
  onPageScroll(e) {
    console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    }
    if (e.scrollTop > 520) {
      this.setData({
        sco: 1
      });
    }
    if (e.scrollTop <= 520) {
      this.setData({
        sco: 2, show: "kcxq"
      });
    }
    if (e.scrollTop <= 100) {
      this.setData({
        floorstatus: false
      });
    }
  }
  gotoBottom(e) {
    this.Base.setMyData({
      show: "gmxz"
    })
    wx.pageScrollTo({
      scrollTop: 100000,
      duration: 300
    })
  }

  bindcut(e) {
    this.Base.setMyData({
      show: "kcxq"
    })
    wx.pageScrollTo({
      scrollTop: 521,
      duration: 300
    })
  }

  bindtopurchase(e) {
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id
    })
  }

  fav(e) {

    var status = e.currentTarget.id;



    if (status == "Y") {
      this.Base.setMyData({ tishi: 1 });
    }
    if (status == "N") {
      this.Base.setMyData({ tishi: 2 });
    }



    var jigouapi = new JigouApi();
    jigouapi.coursefav({
      course_id: this.Base.options.id,
      status
    }, (ret) => {
      //this.Base.info(ret.result);
      this.Base.setMyData({
        isfav: status
      });
    });

    setTimeout(() => {
      this.Base.setMyData({ tishi: 0 })
      // clearTimeout(timeoutId);
    }, 1000);




  }
  todetails(e) {
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + this.Base.getMyData().courseinfo.jg_id,
    })
  }

  onReachBottom(e) {
    this.Base.setMyData({ show: "gmxz" })
  }

  qupinban(e)
  {
    
    wx.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.currentTarget.dataset.id,
    })

  }





}
var timer=1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcut = content.bindcut;
body.bindtopurchase = content.bindtopurchase;
body.fav = content.fav;
body.daojishi = content.daojishi;
body.gotoBottom = content.gotoBottom;
body.todetails = content.todetails;
body.onPageScroll = content.onPageScroll;
body.onReachBottom = content.onReachBottom;
body.qupinban = content.qupinban;
Page(body)