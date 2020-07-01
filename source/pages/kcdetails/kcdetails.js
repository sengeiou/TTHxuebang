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
    // options.id=26;
    super.onLoad(options);
    this.Base.setMyData({
      show: "kcxq",
      shulian: 0,
      daojishilistdd:[]
    })
    this.daojishi();
  }


  daojishi() {
    var that = this;


    this.timer = setInterval(() => {

      var list = that.Base.getMyData().daojishilistdd;
      console.log(list);
     
      console.log(52);
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
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    console.log(this.Base.options.yaoqin_id);
    console.log("邀请人");
    console.log(this.Base.getMyData().memberinfo.id);
    console.log("我的用户id");
    if (this.Base.options.yaoqin_id != undefined && this.Base.getMyData().memberinfo.id != undefined) {
      if (this.Base.options.yaoqin_id != this.Base.getMyData().memberinfo.id) {

        jigouapi.yaoqin({
          yaoqinren: this.Base.options.yaoqin_id
        }, (res) => {

          console.log(res);
          console.log("asdasdasdasdasdas");

        })

      }

    }










    var pingjiaapi = new PingjiaApi();

    var that = this;
    //this.Base.options.id
    jigouapi.courseinfo({
      id: this.Base.options.id
    }, (courseinfo) => {

      jigouapi.fenxiaoinfo({}, (fenxiaoinfo)=>{

        this.Base.setMyData({ fenxiaoinfo: fenxiaoinfo})
      })

      pingjiaapi.pingjialist({
        kecheng_id: this.Base.options.id
      }, (pingjialist) => {
        this.Base.setMyData({
          pingjialist
        });
      });


      console.log("哈哈哈");
      console.log(courseinfo);
      if (courseinfo.isgroup != 0 || courseinfo.isgroup_tiyan!=0) {
        jigouapi.pintuanlist({
          group_course_course_id: courseinfo.id
        }, (pintuanlist) => {
          console.log(pintuanlist);
          var pintuanrenshu = 0;
          var daojishilist = [];
          var daojishilistdd=[];
          for (var i = 0; i < pintuanlist.length; i++) {
            pintuanrenshu += pintuanlist[i].tuanlist.length;
            pintuanlist[i].commander_id_name = ApiUtil.masaike(pintuanlist[i].commander_id_name);
            pintuanlist[i].xunhuandate = ApiUtil.shijianjisuan(pintuanlist[i].jieshushijian);

            if (daojishilist.length < 2) {

              if (pintuanlist[i].status == 'A') {
                daojishilist.push(pintuanlist[i]);
              }
            }
            if (pintuanlist[i].status == 'A') {
              daojishilistdd.push(pintuanlist[i]);
            }
          }
     
          this.Base.setMyData({
            pintuanlist: pintuanlist,
            pintuanrenshu: pintuanrenshu,
            daojishilist: daojishilist,
            daojishilistdd: daojishilistdd
          })
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


    jigouapi.orderstatus({
      id: this.Base.options.id
    }, (canbuy) => {

      this.Base.setMyData({
        canbuy
      });
    });

  }
  onPageScroll(e) {
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop > 100 && floorstatus != true) {
      this.setData({
        floorstatus: true
      });
    }
    var sco = this.Base.getMyData().sco;
    if (e.scrollTop > 520 && sco != 1) {
      this.setData({
        sco: 1
      });
    }
    var sco2 = this.Base.getMyData().sco;
    if (e.scrollTop <= 520 && sco2 != 2) {
      this.setData({
        sco: 2,
        show: "kcxq"
      });
    }
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop <= 100 && floorstatus != false) {
      this.setData({
        floorstatus: false
      });
    }
    // if (e.scrollTop > 820) {
    //   this.setData({
    //     sco: 1
    //   });
    // }
    // if (e.scrollTop <= 820) {
    //   this.setData({
    //     sco: 2,
        
    //   });
    // }
    // var floorstatus = this.Base.getMyData().floorstatus;
    // if (e.scrollTop <= 100 && floorstatus != false) {
    //   this.setData({
    //     floorstatus: false
    //   });
    // }
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
     
    var price = this.Base.getMyData().courseinfo.price;
      
      if(price<=0)
      {
        this.Base.setMyData({
          tanchuang: true,
          ppp: 0,
          pppp: 1,
        })
      }
      else{

    this.Base.setMyData({
      tanchuang: true,
      ppp: 0,
      pppp:0,
    })
      }
  
  }

  opengroup() {
    var expeprice = this.Base.getMyData().courseinfo.expeprice;
    if (expeprice <= 0)
    {
      this.Base.setMyData({
        tanchuang: true,
        ppp: 1,
        pppp: 0,
      })
    }
    else{
    this.Base.setMyData({
      tanchuang: true,
      ppp: 1,
      pppp:1,
    })
    }


    return

    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id + '&&type=0'
    })
  }
  fav(e) {

    var status = e.currentTarget.id;



    if (status == "Y") {
      // this.Base.setMyData({
      //   tishi: 1
      // });
      wx.showToast({
        title: '收藏成功',
      })
    }
     if (status == "N") {
    //    this.Base.setMyData({
    //      tishi: 2
    // });
       wx.showToast({
         title: '取消收藏',
       })
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
    }, 3000);




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
      kcid: this.Base.options.id,isdebug:'Y'
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
        url: '/pages/purchase/purchase?course_id=' + this.Base.options.id + '&&type=0&&leixin='+this.Base.getMyData().pppp
      })

    } else {
      wx.navigateTo({
        url: '/pages/purchase/purchase?course_id=' + this.Base.options.id+'&&leixin='+this.Base.getMyData().pppp
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
      pppp: e.currentTarget.dataset.id
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
  chakantuan(){
    wx.navigateTo({
      url: '/pages/groupinfo/groupinfo?id='+this.Base.getMyData().canbuy.pt,
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
body.chakantuan = content.chakantuan;
body.ceshiceshi = content.ceshiceshi;
Page(body)