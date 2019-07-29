// pages/content/content.js
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
  MemberApi
} from "../../apis/member.api.js";
import {
  PingceApi
} from "../../apis/pingce.api.js";

import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
	
	jglist=[];
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    
    this.Base.setMyData({ scenes:AppBase.scenes})
    // var str = "(1+8+9)*5/4";
    // console.log(eval(str));
    //console.log(aa)
    // var qeqe = wx.getStorageSync(jintian);
    
   

    var jintian = ApiUtil.FormatDate(new Date);
    console.log(jintian, "滴滴")
    var aaa = wx.getStorageSync(jintian);
    console.log(aaa + "电饭锅");

     //勿删
    // if (aaa == "") {
    //   wx.setStorage({
    //     key: jintian,
    //     data: 1
    //   })
    //   console.log("空空空")
    //   this.Base.setMyData({ pd: 1 })
      
    // }

    // console.log(wx.getStorageSync(jintian), "刚刚")

    // console.log(this.Base.getMyData().pd, "靠靠靠")

    this.Base.setMyData({
      currentItemId: 2,
      mylat: 0,
      mylng: 0,
      currectcityid: 0,
      signNum: 0, //签到数
      signState: false, //签到状态
      min: 1, //默认值日期第一天1
      max: 7, //默认值日期最后一天7
      weeks: 0, //默认倍数
      dakashow: false,
      tangchuan: false,
      guize: false,
      dk: -1,
      jf: 5,
      dian: 0, 
      pd: 1
      
    })

  }

  onMyShow() {
    var that = this;

    var jigouapi = new JigouApi();

    jigouapi.myxiaoxi({}, (xiaoxilist) => {
       
       var weidu=xiaoxilist.filter((item)=>{

         return item.isread_value=='N'

       })

   console.log("消息哈哈哈哈敖德萨大所");
      this.Base.setMyData({ xiaoxishu: weidu.length })
     
    })


    this.btn();

    this.jifen();

    var instapi = new InstApi();


    // wx.showLoading({
    //   title: '加载中...',
    // })

    console.log(this.Base.options.id);
    console.log("邀请人");
    console.log(this.Base.getMyData().memberinfo.id);
    console.log("我的用户id");
    if (this.Base.options.id != undefined && this.Base.getMyData().memberinfo.id != undefined) {
      if (this.Base.options.id != this.Base.getMyData().memberinfo.id) {

        jigouapi.yaoqin({
          yaoqinren: this.Base.options.id
        }, (res) => {

          console.log(res);
          console.log("asdasdasdasdasdas");

        })

      }

    }
    var pingceapi = new PingceApi();



    var pingceapi = new PingceApi();
    pingceapi.mypingcelist({
      member_id: this.Base.getMyData().memberinfo.id
    }, (mypingcelist) => {
      this.Base.setMyData({
        mypingcelist
      })
    })


    pingceapi.indexlist({orderby:'r_main.seq'}, (indexlist) => {
      this.Base.setMyData({
        indexlist
      });

    });


    var memberinfo = this.Base.getMyData().memberinfo;
    var citylist = memberinfo.citylist;


    this.loadBanner();


    var lastdistance = this.Base.getMyData().lastdistance;

    if (AppBase.CITYID != this.Base.getMyData().currectcityid ||
      this.lastdistance > 500
    ) {
    
      console.log(AppBase.CITYID);
      console.log("asldjhaskdhas");
      console.log(this.Base.getMyData().currectcityid);

      if (AppBase.CITYID != this.Base.getMyData().currectcityid) {
        this.Base.setMyData({
          currectcityid: AppBase.CITYID
        });
        this.loadjg();
      }
    }

    this.Base.setMyData({
      currectcityid: AppBase.CITYID
    });

    this.jisuanrenshu();

    // setTimeout(() => {
    //   wx.hideLoading()
    // }, 1000);


    setTimeout(() => {
      this.Base.setMyData({ pd: 2 })
    }, 6000)

  }

  closetop(e){
    this.Base.setMyData({ nocity:0})
  }
  
  setcity(e) {
    var id=e.currentTarget.id;
    this.Base.setMyData({ currectcityid: id });
    this.loadjg();
  }

  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  toduihuan(e){
    wx.navigateTo({
      url: '/pages/shopmall/shopmall',
    })
  }

  toketang(e) {
    wx.navigateTo({
      url: '/pages/zaixianketang/zaixianketang'
    })
  }

  toceshilist(e){
    wx.navigateTo({
      url: '/pages/mypingce/mypingce?type=A'
    })
  }

  loadBanner() {
    var instapi = new InstApi();
    // console.log()
    instapi.indexbanner({
      orderby: 'r_main.seq'
    }, (indexbanner) => {
      var bn = [];
      for (var item of indexbanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
        }
      }
      this.Base.setMyData({
        indexbanner: bn
      });
    });

    var cacheid = wx.getStorageSync("homenoticecacheid");

    instapi.lasthomenotice({
      orderby: 'r_main.seq',
      cacheid: cacheid
    }, (noticebanner) => {
      var bn = [];
      cacheid = cacheid.split(",");

      console.log(cacheid,"解决");
      for (var item of noticebanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
          cacheid.push(item.id);
        }
      }
     wx.setStorageSync("homenoticecacheid", cacheid.join(","));
      if (bn.length > 0) {
        this.Base.setMyData({
          noticebanner: bn,
          showlastnotice: true
        });
      }
    });


  }

  closenotice() {
    this.Base.setMyData({
      showlastnotice: false
    });
  }

  totake(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    if (name == "jg") {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "jg",
      })
    } else {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "kc",
      })
    }

  }

  onPullDownRefresh() {
    this.onLoad({});
    super.onPullDownRefresh();
  }

  tobaoma(e) {
    wx.navigateTo({
      url: '/pages/baoma/baoma',
    })
  }

  swiperChange(e) {
    var currentItemId = e.detail.currentItemId;
    this.Base.setMyData({
      currentItemId: currentItemId
    })
  }

  clickChange(e) {
    var itemId = e.currentTarget.dataset.itemId;
    this.Base.setMyData({
      currentItemId: itemId
    });
  }
  loadjg() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    console.log(AppBase.CITYID);
    console.log("那真的牛批");
    
    jigouapi.jglist({
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    }, (jglist) => {

      var jgvteach = [];
      for (var i = 0; i < 4 && i < jglist.length; i++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
        var miletxt = ApiUtil.GetMileTxt(mile);
        jglist[i]["miletxt"] = miletxt;
        jgvteach.push(jglist[i]);
      }

      this.Base.jglist=jglist;
      this.Base.setMyData({
        jgvteach
      });
    });
  }



  onReachBottom() {
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    console.log("???kk");
    // wx.showLoading({
    //   title: '加载中...'
    // })
    var jgvteach = this.Base.getMyData().jgvteach;
    var jglist = this.Base.jglist;
    var cs = 0;


    for (var j = jgvteach.length; j < jglist.length; j++) {

      var mile = ApiUtil.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
      var miletxt = ApiUtil.GetMileTxt(mile);
      jglist[j]["miletxt"] = miletxt;

      jgvteach.push(jglist[j]);
      cs++;
      if (cs >= 7) {
        break;
      }
    }
    if (cs == 0) {
      wx.showToast({
        title: '已经没有了',
        icon: 'none'
      })
      this.Base.setMyData({
        jgnomore: 1,
      });
    } else {
      setTimeout(() => {
        console.log("llll");
        this.Base.setMyData({
          jgvteach
        });
        // wx.hideLoading()
      }, 500);
    }


  }



  bannerGo(e) {
    var id = e.currentTarget.id;
    var indexbanner = this.Base.getMyData().indexbanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id=' + indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }

        console.log(indexbanner[i].url,"当电灯")
        
        if (indexbanner[i].type == 'SF') {
          
          if (indexbanner[i].url == '/pages/home/home' || indexbanner[i].url == '/pages/baoma/baoma' || indexbanner[i].url == '/pages/teacher/teacher' || indexbanner[i].url == '/pages/mine/mine'){
            console.log("试试")
            wx.reLaunch({
              url: indexbanner[i].url
            })
          }
          else{
            console.log("不杀死hi")
            wx.navigateTo({
             url: indexbanner[i].url
            })
          }
        }
        return;
      }
    }
  }



  bannerGo2(e) {

    this.Base.setMyData({
      showlastnotice: false
    });

    var id = e.currentTarget.id;
    console.log(id);
    var indexbanner = this.Base.getMyData().noticebanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id=' + indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }
        if (indexbanner[i].type == 'SF') {
          wx.navigateTo({
            url: indexbanner[i].url
          })
        }
        return;
      }
    }
  }

  tocity(e) {
    wx.navigateTo({
      url: '/pages/city/city',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
        sco: 2
      });
    }
    if (e.scrollTop <= 100) {
      this.setData({
        floorstatus: false
      });
    }
  }

  toceshi(e) {
    var id = e.currentTarget.id;

    var pingceapi = new PingceApi();
    // pingceapi.mypingcelist({}, (mypingcelist) => {

    //   var a = mypingcelist.filter((item, idx) => {
    //     return item.pingce_id == id & item.member_id == this.Base.getMyData().memberinfo.id
    //   })

    //   console.log(a,"刚刚")

    //   if(a.length>0){
    //     wx.navigateTo({
    //       url: '/pages/pingcejieguo/pingcejieguo?id=' + id + '&typeA=' + a[0].typeA + '&typeB=' + a[0].typeB + '&typeC=' + a[0].typeC + '&typeD=' + a[0].typeD
    //     })
    //   }
    //   else{
    //     wx.navigateTo({
    //       url: '/pages/pingceindex/pingceindex?id=' + id
    //     })
    //   }

    // })
    wx.navigateTo({
      url: '/pages/pingceindex/pingceindex?id=' + id + '&member_id=' + this.Base.getMyData().memberinfo.id
    })
    //return;

    
  }



  showtc(e) {

    this.Base.setMyData({
      tangchuan: true
    })

  }

  chakanjilu(e) {
    this.Base.setMyData({
      tangchuan: true,
      dakashow: false
    })
  }
  closetanchuang(e) {
    this.onMyShow();
    this.Base.setMyData({
      dakashow: false,
      tangchuan: false,
      guize: false
    })
  }


  //打卡
  btn() {
    var dian = this.Base.getMyData().dian;
    var jifenapi = new JifenApi();
    // var num = 0;
    

    // jifenapi.dakalist({ member_id: this.Base.getMyData().memberinfo.id }, (dakalist) => {


    //   var le = dakalist.length;

    //   if (time(today) - time(arr[le - 1]) == 86400000)
      
    //   {
    //     num = 2; 
        
    //     for (var i = le; i > 0; i--) {
    //       if (time(arr[i - 1]) - time(arr[i - 2]) == 86400000) {
    //         num++;
    //       }
    //       else {
    //         break; 
    //       }
    //       console.log(num);
    //     }
    //   } 
    //   else {
    //     console.log('第一天');
    //   }


    //   this.Base.setMyData({
    //     dakalist
    //   })


      
    // })



   // return;


    jifenapi.dakalist({ member_id: this.Base.getMyData().memberinfo.id }, (dakalist) => {
      this.Base.setMyData({
        dakalist
      })

      if (dakalist.length == 0) {
        var jintian = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '/' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '/' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));

        var panduan = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })

        var week = ApiUtil.GetDates(7, pd_time);
     
        this.Base.setMyData({
          day: -1,
          dian: 0,
          no: 1,
          week
        })
        console.log("哈哈哈开始")

        return

      }

      if (this.Base.getMyData().dk == -1) {
        var jintian = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '/' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '/' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));



        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) + 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })

        if (a.length == 0) {
          this.Base.setMyData({
            xianzai: jintian, day: -1, no: 1,dk:0,dian:0
          })
          console.log("考虑开始");

          // return

        }

        else {
          this.Base.setMyData({
            day: 0,
            dk: 0,
            dian: 1,
            xianzai: time
          })
          console.log("今天")
        }

      }

      if (this.Base.getMyData().dk == 0) {

        var jintian = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '/' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '/' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));
        var panduan = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        if (a.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("一天前开始")
          //return
        }
        else {
          this.Base.setMyData({
            day: 1,
            dk: 1
          })
          console.log("一天前")
        }

      }

      if (this.Base.getMyData().dk == 1) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 2 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        console.log("离开了")
        console.log(a2)
        console.log("离开了")

        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("前天")
          //return
        } else {
          this.Base.setMyData({
            day: 2,
            dk: 2
          })
          console.log("两天前")
        }
      }

      if (this.Base.getMyData().dk == 2) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 3 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 2 * 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("三天前开始")

          //return
        } else {
          this.Base.setMyData({
            day: 3,
            dk: 3
          })
          console.log("三天前")
        }

      }

      if (this.Base.getMyData().dk == 3) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 4 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 3 * 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("四天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 4,
            dk: 4
          })
          console.log("四天前")
        }

      }

      if (this.Base.getMyData().dk == 4) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 5 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 4 * 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("五天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 5,
            dk: 5
          })
          console.log("五天前")
        }

      }

      if (this.Base.getMyData().dk == 5) {
        var jf = this.Base.getMyData().jf;
        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 6 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })

        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 5 * 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("六天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 6,
            dk: 6,
            jf: 25
          })
          console.log("三天前")
        }

      }

      if (this.Base.getMyData().dk == 6) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 7 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 6 * 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("七天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 7,
            dk: 7
          })
         // console.log("三天前")
        }

      }

      if (this.Base.getMyData().dk == 7) {
        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 8 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '/' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '/' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })

        var panduan = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());

        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '/' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '/' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("七天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 7,
            dk: 7
          })
          console.log("三天前")
        }

        var week = ApiUtil.GetDates(7, pd_time);

        this.Base.setMyData({
          day: -1,
          dian: 0,
          no: 1,
          week
        })

      }

      //  if (dakalist.length==0){
      //   var xianzai = ApiUtil.GetNowFormatDate();
      //  }
      //  else{
      //    var xianzai = this.Base.getMyData().xianzai;
      //  }
      var xianzai = this.Base.getMyData().xianzai;
      console.log("现在" + xianzai)

      var nowdate = ApiUtil.GetNowFormatDate();

      var timestamp = new Date(nowdate).getTime();

      var cj = new Date('2019-07-03 15:35').getTime();

      var time = ApiUtil.DateLater('2019-07-02', 7);

      var week = ApiUtil.GetDates(7, xianzai);

      console.log("现在时间" + nowdate)
      console.log("时间戳" + timestamp)
      console.log("创建时间戳" + cj)
      console.log(week)

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }

      this.Base.setMyData({
        week: week
      });

    })

  }
  //打卡
  bindSignIn(e) {
    var that = this;

    this.Base.setMyData({dian:1})
    //   days = e.currentTarget.dataset.days;
    // days++

    if (this.Base.getMyData().jf == 25) {
      this.Base.setMyData({ jifen: 25 })
    } else {
      this.Base.setMyData({ jifen: 5 })
    }

    var jifenapi = new JifenApi();
    jifenapi.daka({
      member_id: this.Base.getMyData().memberinfo.id,
      jifen: this.Base.getMyData().jifen,
      status: "A"
    }, (daka) => {

      if (this.Base.getMyData().jifen==5){
        jifenapi.addjifen({ member_id: this.Base.getMyData().memberinfo.id, unicode: "meiridaka" }, (addjifen) => {
          this.Base.setMyData({ addjifen })
        })
      }
      if (this.Base.getMyData().jifen == 25) {
        jifenapi.addjifen({ member_id: this.Base.getMyData().memberinfo.id, unicode: "lianxvdaka" }, (addjifen) => {
          this.Base.setMyData({ addjifen })
        })
      }
      

      this.Base.setMyData({
        daka
      })
      this.onMyShow();

    })


    //console.log(days + "天数");
    // wx.showToast({
    //   icon: 'success',
    //   title: '打卡成功',
    // })

    this.Base.setMyData({
      // signNum: days,
      signState: true,
      dakashow: true,
      tangchuan: false
    })

    // var min = e.currentTarget.dataset.min,
    //   max = e.currentTarget.dataset.max,
    //   weeks = e.currentTarget.dataset.weeks;

    // if (days % 7 == 0) {
    //   weeks += 1;
    //   this.Base.setMyData({
    //     weeks: weeks
    //   })
    // }

    // if (days == 7 * weeks + 1) {
    //   this.Base.setMyData({
    //     min: 7 * weeks + 1,
    //     max: 7 * weeks + 7
    //   })
    // }

  }

   //打卡
  jifen() {
    var jifenapi = new JifenApi();
    jifenapi.dakalist({ member_id: this.Base.getMyData().memberinfo.id }, (dakalist) => {
      this.Base.setMyData({
        dakalist
      })
      var sum = 0
      for (var i = 0; i < dakalist.length; i++) {
        sum += parseInt(dakalist[i].jifen);
      }
      this.Base.setMyData({ sum })
    })
  }
  //打卡
  getDates(days, todate) { //todate默认参数是当前日期，可以传入对应时间
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = ApiUtil.DateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  }

  guize(e) {
    this.Base.setMyData({
      guize: true
    })
  }

  jisuanrenshu(){
    var jifenapi = new JifenApi();
    jifenapi.dakalist({
       
    }, (dakalist) => {

      //var arr = [1, 2, 3, 1, 3, 4, 5, 5];
      var resultArr = [];
      for (var i = 0; i < dakalist.length; i++) {
        for (var j = 0; j < resultArr.length; j++) {
          if (resultArr[j].member_id == dakalist[i].member_id) {
            break;
          }
        }
        if (j == resultArr.length) {
          resultArr[resultArr.length] = dakalist[i];
        }
      }

      this.Base.setMyData({
         resultArr
      })
    })



  }

  xiaoxiliebiao(){
  wx.navigateTo({
    url: '/pages/mymessage/mymessage'
  })

  }



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.toceshi = content.toceshi; 
body.tojgdetails = content.tojgdetails;
body.toketang = content.toketang;
body.totake = content.totake; 
body.toceshilist = content.toceshilist;
body.jisuanrenshu = content.jisuanrenshu;
body.swiperChange = content.swiperChange;
body.clickChange = content.clickChange;
body.tobaoma = content.tobaoma;
body.loadjg = content.loadjg;
body.bannerGo = content.bannerGo;
body.bannerGo2 = content.bannerGo2;
body.tocity = content.tocity;
body.onReachBottom = content.onReachBottom;
body.onPageScroll = content.onPageScroll;
body.loadBanner = content.loadBanner; 

body.closetop = content.closetop; 

body.btn = content.btn;
body.getDates = content.getDates;
body.jifen = content.jifen; 

body.toduihuan = content.toduihuan; 
body.setcity = content.setcity;

body.bindSignIn = content.bindSignIn;
body.showtc = content.showtc;
body.chakanjilu = content.chakanjilu;
body.closetanchuang = content.closetanchuang;
body.guize = content.guize;
body.closenotice = content.closenotice;
body.xiaoxiliebiao = content.xiaoxiliebiao;

Page(body)