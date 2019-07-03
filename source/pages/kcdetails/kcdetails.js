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
import {
  PingjiaApi
} from "../../apis/pingjia.api.js";
import {
  HaibaoApi
} from "../../apis/haibao.api.js";

class Content extends AppBase {

  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '课程详情',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "kcxq",
      shulian: 0
    })
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    var pingjiaapi = new PingjiaApi();




    //this.Base.options.id
    jigouapi.courseinfo({
      id: this.Base.options.id
    }, (courseinfo) => {


      pingjiaapi.pingjialist({
        kecheng_id: this.Base.options.id
      }, (pingjialist) => {
        this.Base.setMyData({
          pingjialist
        });
      });


      console.log("哈哈哈");
      console.log(courseinfo);
      if (courseinfo.isgroup != 0) {
        jigouapi.pintuanlist({
          group_course_id: courseinfo.id
        }, (pintuanlist) => {
          console.log(pintuanlist);
          var pintuanrenshu = 0;
          var daojishilist = [];
          for (var i = 0; i < pintuanlist.length; i++) {
            pintuanrenshu += pintuanlist[i].tuanlist.length;
            pintuanlist[i].commander_id_name = ApiUtil.masaike(pintuanlist[i].commander_id_name);
            pintuanlist[i].xunhuandate = ApiUtil.shijianjisuan(pintuanlist[i].jieshushijian);

            if (daojishilist.length < 2) {

              if (pintuanlist[i].status == 'A') {
                daojishilist.push(pintuanlist[i]);
              }
            }
          }

          this.Base.setMyData({
            pintuanlist: pintuanlist,
            pintuanrenshu: pintuanrenshu,
            daojishilist: daojishilist
          })
          this.daojishi();
        })
      }

      jigouapi.kechenlunbo({
        name: courseinfo.id,
        orderby: 'r_main.seq',
        status: "A"
      }, (kechenlunbo) => {

        this.Base.setMyData({
          kechenlunbo
        });
      });



      var mylat = this.Base.getMyData().mylat;
      var mylng = this.Base.getMyData().mylng;

      var mile = ApiUtil.GetDistance(mylat, mylng, courseinfo.JG_lat, courseinfo.JG_lng);

      var miletxt = ApiUtil.GetMileTxt(mile);
      this.Base.setMyData({
        miletxt,
        scoring: parseInt(courseinfo.scoring)
      })
      var scoring = this.Base.getMyData().scoring;
      console.log("啊啊啊" + scoring)


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
  daojishi() {
    var that = this;


    var list = that.Base.getMyData().daojishilist;
    console.log(list);
    console.log(52);
    this.timer = setInterval(() => {

      var sjlist = [];
      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        console.log(danqiandate);
        var jisuandate = new Date(list[i].jieshushijian.replace(/-/g, '/'));


        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000))); //计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000))); //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000))); //计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));


        sjlist.push(listtt);

      }
      console.log("循环");
      that.Base.setMyData({

        sjlist: sjlist

      })



    }, 1000)





  }
  onHide() {
    console.error(66666);
    clearInterval(this.timer);


  }
  onUnload() {
    console.error(66666);
    clearInterval(this.timer);
  }
  onMyShow() {
    var that = this;

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
        sco: 2,
        show: "kcxq"
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

    this.Base.setMyData({
      tanchuang: true,
      ppp: 0
    })
    return
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id
    })
  }

  opengroup() {

    this.Base.setMyData({
      tanchuang: true,
      ppp: 1
    })

    return

    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id + '&&type=0'
    })
  }
  fav(e) {

    var status = e.currentTarget.id;



    if (status == "Y") {
      this.Base.setMyData({
        tishi: 1
      });
    }
    if (status == "N") {
      this.Base.setMyData({
        tishi: 2
      });
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
      this.Base.setMyData({
        tishi: 0
      })
      // clearTimeout(timeoutId);
    }, 10000);




  }
  todetails(e) {
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + this.Base.getMyData().courseinfo.jg_id,
    })
  }

  onReachBottom(e) {
    this.Base.setMyData({
      show: "gmxz"
    })
  }

  qupinban(e) {

    wx.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.currentTarget.dataset.id,
    })

  }


  bindtolist(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/pingjialist/pingjialist?id=' + id
    })
  }
  jian() {
    var shulian = this.Base.getMyData().shulian;
    if (shulian == 0) {
      return
    }
    this.Base.setMyData({
      shulian: --shulian
    });
  }
  jia() {
    var shulian = this.Base.getMyData().shulian;


    this.Base.setMyData({
      shulian: ++shulian
    });
  }
  bindclose() {
    this.Base.setMyData({
      tanchuang: false
    })

  }
  yaoqin() {
    var api = new HaibaoApi;
    api.haibao1({
      kcid: this.Base.options.id
    }, (res) => {
      console.log(res);
      if (res.code == 0) {
        wx.navigateTo({
          url: '/pages/kcyaoqin/kcyaoqin?name=' + res.return+'&&kcid=' + this.Base.options.id,
        })


      }
    })

  }
  tobuy() {
    this.Base.setMyData({
      tanchuang: false
    });

    var ppp = this.Base.getMyData().ppp;
    if (ppp == 1) {
      wx.navigateTo({
        url: '/pages/purchase/purchase?course_id=' + this.Base.options.id + '&&type=0'
      })

    } else {
      wx.navigateTo({
        url: '/pages/purchase/purchase?course_id=' + this.Base.options.id
      })
    }

  }
  shouye() {

    wx.switchTab({
      url: '/pages/home/home',
    })

  }
  gotojigou() {

    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + this.Base.getMyData().courseinfo.jg_id,
    })


  }
  lifk() {
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })

  }
  check(e) {

    this.Base.setMyData({
      ppp: e.currentTarget.dataset.id
    })
  }

  chakangenduo() {
    this.Base.setMyData({
      ispintuan: true
    })
  }
  closetanchuang() {
    this.Base.setMyData({
      ispintuan: false,

    })
  }
}
var timer = 1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcut = content.bindcut;
body.shouye = content.shouye;
body.bindtolist = content.bindtolist;
body.gotojigou = content.gotojigou
body.bindtopurchase = content.bindtopurchase;
body.fav = content.fav;
body.daojishi = content.daojishi;
body.gotoBottom = content.gotoBottom;
body.todetails = content.todetails;
body.onPageScroll = content.onPageScroll;
body.onReachBottom = content.onReachBottom;
body.qupinban = content.qupinban;
body.jian = content.jian;
body.closetanchuang = content.closetanchuang;
body.jia = content.jia;
body.opengroup = content.opengroup;
body.bindclose = content.bindclose;
body.tobuy = content.tobuy;
body.yaoqin = content.yaoqin;
body.lifk = content.lifk;
body.check = content.check;
body.chakangenduo = content.chakangenduo;
Page(body)