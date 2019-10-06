import { Component, ViewChild,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { JifenApi } from 'src/providers/jifen.api';
import { InstApi } from 'src/providers/inst.api';
import { PingceApi } from 'src/providers/pingce.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [MemberApi, JigouApi, JifenApi, InstApi, PingceApi]
})
export class HomePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public pingceApi: PingceApi,
    public jifenApi: JifenApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  currentItemId = 2;
  mylat = 0;
  mylng = 0;
  indexcurrent = 0;
  currectcityid = 0;
  signNum = 0; //签到数
  signState = false; //签到状态
  min = 1; //默认值日期第一天1
  max = 7; //默认值日期最后一天7
  weeks = 0; //默认倍数
  dakashow = false;
  tangchuan = false;
  guize = false;
  dk = -1;
  jf = 5;
  img = 1;
  num = 0;
  dian = 0;
  pd = 1;
  days = []
  filtercoursetype = [];
  fapk=[];
  nocity = 0;

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }

  dakalist = [];
  xiaoxishu = 0;
  mypingcelist = [];
  indexlist = [];

  onMyShow(e=undefined) {
    var that = this;

    var jigouapi = this.jigouApi;

    var jifenapi = this.jifenApi;

    jigouapi.coursetype({}).then((filtercoursetype) => {
      this.filtercoursetype = filtercoursetype;
      this.fapk=this.getArray(10-((filtercoursetype.length)-8));
    });


    jifenapi.dakalist({
      member_id: this.MemberInfo.id
    }).then((dakalist) => {

      var days = this.days;
      for (var i = dakalist.length - 1; i >= 0; i--) {
        days.push(dakalist[i].daka_date_dateformat)
      }
      this.dakalist = dakalist;
      this.days = days;
      console.log(this.days, '打卡日期列表');

      this.timetwo();

    })

    jigouapi.myxiaoxi({}).then((xiaoxilist) => {

      var weidu = xiaoxilist.filter((item) => {
        return item.isread_value == 'N'
      })

      this.xiaoxishu = weidu.length;
    })


    // this.btn();

    //this.jifen();

    var instapi = this.instApi;


    // wx.showLoading({
    //   title: '加载中...',
    // })

    if (this.params.id != undefined && this.MemberInfo.id != undefined) {
      if (this.params.id != this.MemberInfo.id) {

        jigouapi.yaoqin({
          yaoqinren: this.params.id
        });

      }

    }

    var pingceapi = this.pingceApi;

    pingceapi.mypingcelist({
      member_id: this.MemberInfo.id
    }).then((mypingcelist) => {
      this.mypingcelist = mypingcelist;
    })


    pingceapi.indexlist({
      orderby: 'r_main.seq'
    }).then((indexlist) => {
      this.indexlist = indexlist;

    });


    var MemberInfo = this.MemberInfo;
    var citylist = MemberInfo.citylist;

    var citycode = this.citycode;

    var citys = citylist.filter((item, idx) => {
      return item.code == citycode
    })

    console.log(citycode, "好借口", AppBase.CITYID);

    if (citys.length != 0 && AppBase.CITYID != citycode) {
      this.nocity = 2;
    }

    this.loadBanner();


    var lastdistance = this.lastdistance;

    if (AppBase.CITYID != this.currectcityid ||
      this.lastdistance > 500
    ) {

      console.log(AppBase.CITYID);
      console.log("asldjhaskdhas");
      console.log(this.currectcityid);

      if (AppBase.CITYID != this.currectcityid) {
        this.currectcityid = AppBase.CITYID;
        this.loadjg();
      }
    }

    this.currectcityid = AppBase.CITYID;

    this.jisuanrenshu();

    // setTimeout(() => {
    //   wx.hideLoading()
    // }, 1000);


    setTimeout(() => {
      this.pd = 2;
    }, 6000)

  }
  yd = -1;
  qiehuan(e=undefined) {
    this.img = 2;
  }
  closeimage(e=undefined) {
    this.yd = 0;
  }
  closetop(e=undefined) {
    this.nocity = 0;
  }
  cityname = "";
  setcity(e) {
    var that = this;
    var id = (e.target.id).substr(0, 4) + "00";
    var name = e.target.dataset.name;
    var MemberInfo = this.MemberInfo;
    var citylist = MemberInfo.citylist;

    for (var i = 0; i < citylist.length; i++) {
      if (id == citylist[i].id) {
        AppBase.CITYID = citylist[i].id;
        AppBase.CITYNAME = citylist[i].name;
        AppBase.CITYSET = true;
        var memberapi = this.memberApi;
        memberapi.usecity({
          city_id: AppBase.CITYID
        });
      }
    }
    this.nocity = 0;
    this.cityname = name;

    this.onMyShow();

    //this.loadjg();
  }

  tojgdetails(e) {
    var id = e.target.id;
    this.navigate("jgdetails", { id: id });
  }
  toduihuan(e=undefined) {
    this.navigate("shopmall");
  }

  toketang(e) {
    this.navigate("zaixianketang");
  }

  toceshilist(e) {
    this.navigate("mypingce", { type: "A" });
  }
  indexbanner = [];
  noticebanner = [];
  showlastnotice = false;
  loadBanner(e=undefined) {
    var instapi = this.instApi;
    // console.log()
    instapi.indexbanner({
      orderby: 'r_main.seq'
    }).then((indexbanner) => {
      var bn = [];
      for (var item of indexbanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
        }
      }
      this.indexcurrent = 0;
      this.indexbanner = bn;
    });

    var cacheid = window.localStorage.getItem("homenoticecacheid");

    instapi.lasthomenotice({
      orderby: 'r_main.seq',
      cacheid: cacheid
    }).then((noticebanner) => {
      var bn = [];
      var cacheid2 = cacheid.split(",");

      console.log(cacheid, "解决");
      for (var item of noticebanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
          cacheid2.push(item.id);
        }
      }
      window.localStorage.setItem("homenoticecacheid", cacheid2.join(","));
      if (bn.length > 0) {
        this.noticebanner = [];
        this.showlastnotice = true;
      }
    });


  }

  closenotice(e=undefined) {
    this.showlastnotice = false;
  }

  totake(e) {
    var name = e.target.dataset.name;
    console.log(name);
    if (name == "jg") {
      this.navigate("seek", { type: "jg" });
    } else {
      this.navigate("seek", { type: "kc" });
    }

  }

  onPullDownRefresh(e=undefined) {
    //todo
  }

  tobaoma(e) {
    // wx.reLaunch({
    //   url: '/pages/baoma/baoma',
    // })
    //todo
  }
  jglist = [];
  jgvteach = [];
  loadjg(e=undefined) {
    var jigouapi = this.jigouApi;
    var mylat = this.mylat;
    var mylng = this.mylng;
    console.log(AppBase.CITYID);
    console.log("那真的牛批");

    jigouapi.jglist({
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    }).then((jglist) => {

      var jgvteach = [];
      for (var i = 0; i < 4 && i < jglist.length; i++) {
        var mile = AppUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
        var miletxt = AppUtil.GetMileTxt(mile);
        jglist[i]["miletxt"] = miletxt;
        jgvteach.push(jglist[i]);
      }

      this.jglist = jglist;
      this.jgvteach = jgvteach;
    });
  }

  jgnomore = 0;

  onReachBottom(e=undefined) {
    var mylat = this.mylat;
    var mylng = this.mylng;
    console.log("???kk");
    // wx.showLoading({
    //   title: '加载中...'
    // })
    var jgvteach = this.jgvteach;
    var jglist = this.jglist;
    var cs = 0;


    for (var j = jgvteach.length; j < jglist.length; j++) {

      var mile = AppUtil.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
      var miletxt = AppUtil.GetMileTxt(mile);
      jglist[j]["miletxt"] = miletxt;

      jgvteach.push(jglist[j]);
      cs++;
      if (cs >= 7) {
        break;
      }
    }
    if (cs == 0) {
      this.toast("已经没有了");
      this.jgnomore = 1;
    } else {
      setTimeout(() => {
        console.log("llll");
        this.jgvteach = jgvteach;
        // wx.hideLoading()
      }, 1);
    }


  }



  bannerGo(e) {
    var id = e.target.id;
    var indexbanner = this.indexbanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          this.navigate("kcdetails", { id: indexbanner[i].course_id });
        }
        if (indexbanner[i].type == 'JG') {
          this.navigate("jgdetails", { id: indexbanner[i].jg_id });
        }

        console.log(indexbanner[i].url, "当电灯")

        if (indexbanner[i].type == 'SF') {

          if (indexbanner[i].url == '/pages/home/home' || indexbanner[i].url == '/pages/baoma/baoma' || indexbanner[i].url == '/pages/teacher/teacher' || indexbanner[i].url == '/pages/mine/mine') {
            console.log("试试")
            // wx.reLaunch({
            //   url: url indexbanner[i].url
            // })
            //todo
          } else {
            console.log("不杀死hi")
            // this.navigateTo({
            //   url: indexbanner[i].url
            // })
            //todo
          }
        }
        return;
      }
    }
  }



  bannerGo2(e) {

    this.showlastnotice = false;

    var id = e.target.id;
    console.log(id);
    var indexbanner = this.noticebanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          this.navigate("kcdetails", { id: indexbanner[i].course_id });
        }
        if (indexbanner[i].type == 'JG') {
          this.navigate("jgdetails", { id: indexbanner[i].jg_id });
        }
        // if (indexbanner[i].type == 'SF') {
        //   this.navigateTo({
        //     url: indexbanner[i].url
        //   })
        // }
        //todo
        return;
      }
    }
  }

  tocity(e=undefined) {
    this.navigate("city");
  }

  //todo
  // onPageScroll(e) {
  //   //console.log(e)
  //   //this.setMyData({ scrolltop: e.scrollTop})
  //   var floorstatus = this.floorstatus;
  //   if (e.scrollTop > 100 && floorstatus != true) {
  //     this.setData({
  //       floorstatus: true
  //     });
  //   }
  //   var sco = this.sco;
  //   if (e.scrollTop > 520 && sco != 1) {
  //     this.setData({
  //       sco: 1
  //     });
  //   }
  //   var sco2 = this.sco;
  //   if (e.scrollTop <= 520 && sco2 != 2) {
  //     this.setData({
  //       sco: 2
  //     });
  //   }
  //   var floorstatus = this.floorstatus;
  //   if (e.scrollTop <= 100 && floorstatus != false) {
  //     this.setData({
  //       floorstatus: false
  //     });
  //   }
  // }

  toceshi(e) {
    var id = e.target.id;

    var pingceapi = this.pingceApi
    this.navigate("pingceindex", { id: id, member_id: this.MemberInfo.id });

  }



  showtc(e) {
    this.tangchuan = true;

  }

  chakanjilu(e) {
    this.dakashow = false
    this.tangchuan = true;
  }
  closetanchuang(e) {
    this.onMyShow();
    this.dakashow = false;
    this.tangchuan = false;
    this.guize = false
  }


  //打卡部分
  daka = false;
  week = [];
  timetwo(e=undefined) {
    console.log('卡路里')

    var days = this.days;

    var nowtime = new Date();

    var now = this.util.FormatDate(nowtime);

    var leg = days.length;


    var time1 = (new Date(now)).getTime(); //当前日期时间戳

    var time2 = (new Date(this.util.FormatDate(new Date(days[leg - 1])))).getTime(); //数组中倒数第一天日期时间戳

    var time3 = (new Date(this.util.FormatDate(new Date(days[leg - 2])))).getTime(); //数组中倒数第二天日期时间戳

    var num = 0; //该变量用以计算连续天数

    if (time1 - time2 == 0) {
      this.daka = true;
    } else {
      this.daka = false;
    }

    if (time1 - time2 <= 86400000) { //判断当前日期与最近一天

      num = 1;

      for (var i = leg; i > 0; i--) {
        var t_one = (new Date(this.util.FormatDate(new Date(days[i - 1])))).getTime();
        var t_two = (new Date(this.util.FormatDate(new Date(days[i - 2])))).getTime();

        if (t_one - t_two == 86400000) {
          num++; //连续天数
          this.num = num;
        } else {
          this.num = num;
          break;
        }

      }

      var num = this.num;

      if (days == null || days.length == 0) {
        console.log("品牌")
        var daysago = new Date((new Date(AppUtil.GetNowFormatDate()).getTime()));
        var begindate = this.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));
      } else {
        console.log("饭饭")
        if (time1 - time2 == 0) {
          var daysago = new Date((new Date(AppUtil.GetNowFormatDate()).getTime()) - (num - 1) * 86400000);
        } else {
          var daysago = new Date((new Date(AppUtil.GetNowFormatDate()).getTime()) - num * 86400000);
        }

        var begindate = this.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));
      }


      var week = AppUtil.GetDates(7, begindate);

      var timestamp = new Date(AppUtil.GetNowFormatDate()).getTime();

      console.log(timestamp, "测试");

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }
      if (num % 7 > 0) {
        this.week = week
        this.min = num % 7;
      }
      if (num % 7 == 0) {
        this.week = week
        this.min = 7;
      }
    } else {
      console.log("昨天无记录,重新计算天数")

      var daysago = new Date((new Date(AppUtil.GetNowFormatDate()).getTime()));
      var begindate = this.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));

      var week = AppUtil.GetDates(7, begindate);

      var timestamp = new Date(AppUtil.GetNowFormatDate()).getTime();

      console.log(timestamp, "测试");

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }
      this.week = week
      this.min = 0;

    }

  }
  jifen = 5;
  addjifen = null;
  //打卡部分
  bindSignIn(e) {



    var that = this;


    if (this.daka == false) {


      this.dakashow = true;
      this.tangchuan = false;
      this.daka = true;
      this.signState = true;

      var num = this.num;


      if (this.num < 7) {
        this.jifen = 5;
      } else {
        this.jifen = 25;
      }

      var jifenapi = this.jifenApi;
      jifenapi.daka({
        member_id: this.MemberInfo.id,
        jifen: this.jifen,
        status: "A"
      }).then((daka) => {
        if (this.jifen == 5) {
          jifenapi.addjifen({
            member_id: this.MemberInfo.id,
            unicode: "meiridaka"
          }).then((addjifen) => {
            this.addjifen = addjifen;
          })
        }
        if (this.jifen == 25) {
          jifenapi.addjifen({
            member_id: this.MemberInfo.id,
            unicode: "lianxvdaka"
          }).then((addjifen) => {
            this.addjifen = addjifen;
          })
        }
        this.daka = daka;
        this.onMyShow();
      })
    }






  }

  getDates(days, todate) { //todate默认参数是当前日期，可以传入对应时间
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = AppUtil.DateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  }

  guizeclick(e=undefined) {
    this.guize = true;
  }

  zong = "";
  resultArr = [];

  jisuanrenshu(e=undefined) {
    var jifenapi = this.jifenApi;
    jifenapi.dakalist({

    }).then((dakalist) => {

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


      var personnumber = parseInt(this.InstInfo.personnumber);
      console.log(personnumber, "人数");

      var number = resultArr.length;

      if ((number + personnumber) >= 10000) {
        var zong = (((number) + personnumber) / 10000).toFixed(2) + 'W';
        console.log(zong, "总数")
      } else {
        var zong = ((number) + personnumber).toString()
      }
      this.zong = zong;
      this.resultArr = resultArr;

    })



  }

  xiaoxiliebiao(e=undefined) {
    this.navigate("mymessage");

  }

  bindtokc(e) {
    var typeid = parseInt(e.target.id);

    var typename = e.target.dataset.name;
    var json = null;
    json = { type: "kc", typeid: 0, typename: typename };

    if (typeid > 0) {
      json.keyword = typename;
    }

    this.navigate("seek")

  }

}
