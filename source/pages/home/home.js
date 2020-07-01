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

  jglist = [];
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);


    this.Base.setMyData({
      scenes: AppBase.scenes
    })
    // var str = "(1+8+9)*5/4";
    // console.log(eval(str));
    //console.log(aa)
    // var qeqe = wx.getStorageSync(jintian);
    // var jintian = ApiUtil.FormatDate(new Date);
    // console.log(jintian, "滴滴")
    var san = wx.getStorageSync('first');
    console.log(san + "电饭锅");

    //勿删
    if (san == "" || san == null) {
      wx.setStorage({
        key: 'first',
        data: 1
      })
      console.log("空空空")
      this.Base.setMyData({ yd: 1 })
    }

    // console.log(wx.getStorageSync(jintian), "刚刚")

    // console.log(this.Base.getMyData().pd, "靠靠靠")


    this.Base.setMyData({
      currentItemId: 2,
      mylat: 0,
      mylng: 0,
      indexcurrent:0,
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
      img: 1,
      num: 0,
      dian: 0,
      pd: 1,
      days: [],
      goodsinterval:2
    })

  }

  onMyShow() {
    var that = this;
 
    var jigouapi = new JigouApi();

    var jifenapi = new JifenApi();



    jifenapi.commoditylist({
      istopvalue: "Y",
      orderby: 'r_main.seq'
    }, (list) => {
      this.Base.setMyData({
        topvaluelist: list
      })
    })


    jigouapi.coursetype({}, (filtercoursetype) => {
      this.Base.setMyData({
        filtercoursetype
      });
    });


    jifenapi.dakalist({
      member_id: this.Base.getMyData().memberinfo.id
    }, (dakalist) => {

      var days = this.Base.getMyData().days;
      for (var i = dakalist.length - 1; i >= 0; i--) {
        days.push(dakalist[i].daka_date_dateformat)
      }

      this.Base.setMyData({
        dakalist,
        days
      })
      console.log(this.Base.getMyData().days, '打卡日期列表');

      this.timetwo();

    })

    jigouapi.myxiaoxi({}, (xiaoxilist) => {
        
       if(xiaoxilist!=undefined)
       {
      var weidu = xiaoxilist.filter((item) => {

        return item.isread_value == 'N'

      })
   
      console.log("消息哈哈哈哈敖德萨大所");
      this.Base.setMyData({
        xiaoxishu: weidu.length
      })
    }
    })

    // this.btn();
    //this.jifen();

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

    pingceapi.mypingcelist({
      member_id: this.Base.getMyData().memberinfo.id
    }, (mypingcelist) => {
      this.Base.setMyData({
        mypingcelist
      })
    })


    pingceapi.indexlist({
      orderby: 'r_main.seq'
    }, (indexlist) => {
      this.Base.setMyData({
        indexlist
      });

    });


    var memberinfo = this.Base.getMyData().memberinfo;
    var citylist = memberinfo.citylist;

    var citycode = this.Base.getMyData().citycode;

    var citys = citylist.filter((item, idx) => {
      return item.code == citycode
    })

    console.log(citycode, "好借口", AppBase.CITYID);

    if (citys.length != 0 && AppBase.CITYID != citycode) {
      this.Base.setMyData({
        nocity: 2
      });
    }




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
      this.Base.setMyData({
        pd: 2
      })
    }, 6000)

  }
  qiehuan(e) {
    this.Base.setMyData({
      img: 2
    })
  }
  closeimage(e) {
    this.Base.setMyData({
      yd: 0
    })
  }
  closetop(e) {
    this.Base.setMyData({
      nocity: 0
    })
  }

  setcity(e) {
    var that=this;
    var id = (e.currentTarget.id).substr(0, 4) + "00";
    var name=e.currentTarget.dataset.name;
    var memberinfo = this.Base.getMyData().memberinfo;
    var citylist = memberinfo.citylist;

    for (var i = 0; i < citylist.length; i++) {
      if (id == citylist[i].id) {
        AppBase.CITYID = citylist[i].id;
        AppBase.CITYNAME = citylist[i].name;
        AppBase.CITYSET = true;
        var memberapi = new MemberApi();
        memberapi.usecity({
          city_id: AppBase.CITYID
        });
      }
    }

    this.Base.setMyData({
      nocity: 0, cityname: name
    });

      this.onMyShow();

    //this.loadjg();
  }

  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  toduihuan(e) {
    wx.navigateTo({
      url: '/pages/shopmall/shopmall',
    })
  }

  toketang(e) {

    var syso = AppBase.System;
    console.log(syso);
    if (syso.substr(0, 3) == 'iOS') {
      wx.showToast({
        title: "暂未开放~",
        icon: "none"
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/zaixianketang/zaixianketang'
      })

    }
 

  }

  toceshilist(e) {
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
        indexcurrent:0,
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

      console.log(cacheid, "解决");
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
    wx.reLaunch({
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
    console.log(mylat, "那真的牛批", mylng);

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

      this.Base.jglist = jglist;
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
      }, 1);
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

        console.log(indexbanner[i].url, "当电灯")

        if (indexbanner[i].type == 'SF') {

          if (indexbanner[i].url == '/pages/home/home' || indexbanner[i].url == '/pages/baoma/baoma' || indexbanner[i].url == '/pages/teacher/teacher' || indexbanner[i].url == '/pages/mine/mine') {
            console.log("试试")
            wx.reLaunch({
              url: indexbanner[i].url
            })
          } else {
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
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

  onPageScroll(e) {
    //console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop > 100 && floorstatus!=true) {
      this.setData({
        floorstatus: true
      });
    }
    var sco = this.Base.getMyData().sco;
    if (e.scrollTop > 520 && sco!=1) {
      this.setData({
        sco: 1
      });
    }
    var sco2 = this.Base.getMyData().sco;
    if (e.scrollTop <= 520 && sco2!=2) {
      this.setData({
        sco: 2
      });
    }
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop <= 100 && floorstatus!=false) {
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
    //this.onMyShow();
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


  //打卡部分
  timetwo(e) {
    console.log('卡路里')

    var days = this.Base.getMyData().days;
    var nowtime = new Date();
    var now = this.Base.util.FormatDate(nowtime);
    var leg = days.length;

    var time1 = (new Date(now)).getTime(); //当前日期时间戳
    var time2 = (new Date(this.Base.util.FormatDate(new Date(days[leg - 1])))).getTime(); //数组中倒数第一天日期时间戳
    var time3 = (new Date(this.Base.util.FormatDate(new Date(days[leg - 2])))).getTime(); //数组中倒数第二天日期时间戳
    var num = 0; //该变量用以计算连续天数

    if (time1 - time2 == 0) {
      this.Base.setMyData({
        daka: true
      })
    } else {
      this.Base.setMyData({
        daka: false
      })
    }

    console.log((time1 - time2), "判断日期连续");

    if (time1 - time2 <= 86400000) { //判断当前日期与最近一天

      console.log("昨天有记录,此处可用以执行查询连续天数方法")

      num = 1;

      for (var i = leg; i > 0; i--) {
        var t_one = (new Date(this.Base.util.FormatDate(new Date(days[i - 1])))).getTime();
        var t_two = (new Date(this.Base.util.FormatDate(new Date(days[i - 2])))).getTime();

        if (t_one - t_two == 86400000) {
          console.log("加起来")
          num++; //连续天数
          this.Base.setMyData({
            num: num
          })
          console.log(num, "连续天数")
        } else {
          console.log("结束循环")
          this.Base.setMyData({
            num: num
          })
          break;
        }

      }

      var num = this.Base.getMyData().num;

      if (days == null || days.length == 0) {
        console.log("品牌")
        var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()));
        var begindate = this.Base.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));
      } else {
        console.log("饭饭")
        if (time1 - time2 == 0) {
          var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - (num - 1) * 86400000);
        } else {
          var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - num * 86400000);
        }

        var begindate = this.Base.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));
      }


      var week = ApiUtil.GetDates(7, begindate);

      var timestamp = new Date(ApiUtil.GetNowFormatDate()).getTime();

      console.log(timestamp, "测试");

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }
      if (num % 7 > 0) {
        this.Base.setMyData({
          min: num % 7,
          week: week
        })
      }
      if (num % 7 == 0) {
        this.Base.setMyData({
          min: 7,
          week: week
        })
      }
    } else {
      console.log("昨天无记录,重新计算天数")

      var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()));
      var begindate = this.Base.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));

      var week = ApiUtil.GetDates(7, begindate);

      var timestamp = new Date(ApiUtil.GetNowFormatDate()).getTime();

      console.log(timestamp, "测试");

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }

      this.Base.setMyData({
        min: 0,
        week: week
      })

    }

  }
  //打卡部分
  bindSignIn(e) {
     
    var that = this;

    if (this.Base.getMyData().daka==false){

      this.Base.setMyData({
        signState: true,
        dakashow: true,
        tangchuan: false,
       // daka:true
      })

      var num = this.Base.getMyData().num;

    console.log(num,"理论");

      if (this.Base.getMyData().num >= 7) {
        this.Base.setMyData({
          jifen: 25
        })
      } else {
        this.Base.setMyData({
          jifen: 5
        })
      }
//return;
      var jifenapi = new JifenApi();
      jifenapi.daka({
        member_id: this.Base.getMyData().memberinfo.id,
        jifen: this.Base.getMyData().jifen,
        status: "A"
      }, (daka) => {
        
        this.onMyShow();
      })
    }

  }


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

  jisuanrenshu() {
    var jifenapi = new JifenApi();
    jifenapi.dakalist({

    }, (ret) => {
      var dakalist = ret.result;
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


      var personnumber = parseInt(this.Base.getMyData().instinfo.personnumber);
      console.log(personnumber, "人数");

      var number = ret.return;

      if ((parseInt(number) + personnumber)>=10000){
         var zong = ((parseInt(number) + personnumber) / 10000).toFixed(2) + 'W';
      console.log(zong, "总数")
     }else{
        var zong = parseInt(number) + personnumber
     }
      

      this.Base.setMyData({
        zong, resultArr
      })
    })



  }

  xiaoxiliebiao() {
    wx.navigateTo({
      url: '/pages/mymessage/mymessage'
    })

  }

  bindtokc(e){
   var typeid=parseInt(e.currentTarget.id);

    var typename = e.currentTarget.dataset.name;

    var url = '/pages/seek/seek?type=kc&typeid='+typeid;
    url += '&typename=' + typename;
    if (typeid>0){
      url += '&keyword=' + typename;
    }

    console.log(url,'链接')
    //return;
    wx.navigateTo({
      url: url
    })

  }

  togoods(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shopmalldetail/shopmalldetail?id=' + id
    })
  }

  tomall(){
    wx.navigateTo({
      url: '/pages/shopmall/shopmall' 
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindtokc = content.bindtokc;

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
body.timetwo = content.timetwo;

body.showtc = content.showtc;
body.chakanjilu = content.chakanjilu;
body.closetanchuang = content.closetanchuang;
body.guize = content.guize;
body.closenotice = content.closenotice;
body.xiaoxiliebiao = content.xiaoxiliebiao;

body.qiehuan = content.qiehuan; 
body.togoods = content.togoods;
body.closeimage = content.closeimage;
body.tomall = content.tomall;
Page(body)