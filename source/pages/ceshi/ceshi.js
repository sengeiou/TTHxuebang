// pages/ceshi/ceshi.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";
import {
  ApiUtil
} from "../../apis/apiutil";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
     
      days:[],

      signState: false, //签到状态

      fen:2.6,
     // min: 0,
    })
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.dakalist({ member_id: this.Base.getMyData().memberinfo.id }, (dakalist) => {
      
      var days=this.Base.getMyData().days;
      for (var i = dakalist.length - 1; i >= 0; i--){
        days.push(dakalist[i].daka_date_dateformat)
      }
      this.Base.setMyData({ dakalist, days })
      console.log(this.Base.getMyData().days, '打卡日期列表');

      this.timetwo();

    })

  }


  timetwo(e) {
    console.log('卡路里')

    var days = this.Base.getMyData().days;


    var nowtime = new Date();

    var now = this.Base.util.FormatDate(nowtime);

    var leg = days.length;



    var time1 = (new Date(now)).getTime(); //当前日期时间戳

    var time2 = (new Date(this.Base.util.FormatDate(new Date(days[leg - 1])))).getTime(); //数组中倒数第一天日期时间戳

    var time3 = (new Date(this.Base.util.FormatDate(new Date(days[leg - 2])))).getTime(); //数组中倒数第二天日期时间戳

    var num = 0;//该变量用以计算连续天数

    if (time1-time2==0){
      this.Base.setMyData({daka:true})
    }
    else{
      this.Base.setMyData({ daka: false })
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

      if (time1 - time2 == 0){
        var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - (num - 1) * 86400000);
      }else{
        var daysago = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - num * 86400000);
      }

      console.log(daysago,"测试");

       var begindate = this.Base.util.FormatDate(new Date(daysago.getFullYear() + '/' + (daysago.getMonth() + 1 < 10 ? '0' + (daysago.getMonth() + 1) : daysago.getMonth() + 1) + '/' + (daysago.getDate() < 10 ? '0' + (daysago.getDate()) : daysago.getDate()) + ' '));

      var week = ApiUtil.GetDates(7, begindate);
      var timestamp = new Date(ApiUtil.GetNowFormatDate()).getTime();

      for (var i = 0; i < week.length; i++) {
        if (new Date(week[i].seven_date).getTime() == timestamp) {
          week[i].daka_date = "今天"
        }
      }
        if (num % 7 > 0){
          this.Base.setMyData({
            min: num % 7, week: week
          })
        }
        if(num % 7 == 0){
          this.Base.setMyData({
            min: 7, week: week
          })
        }
    }
     else {
      console.log("昨天无记录,重新计算天数")
    }


  }

  bindSignIn(e) {
    var that = this;
    var num = this.Base.getMyData().num;
  
    if (this.Base.getMyData().num < 7) {
      this.Base.setMyData({ jifen: 25 })
    } 
    else {
      this.Base.setMyData({ jifen: 5 })
    }

    var jifenapi = new JifenApi();
    jifenapi.daka({
      member_id: this.Base.getMyData().memberinfo.id,
      jifen: this.Base.getMyData().jifen,
      status: "A"
    }, (daka) => {
      if (this.Base.getMyData().jifen == 5) {
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

    this.Base.setMyData({ 
      signState: true,
      dakashow: true,
      tangchuan: false
    })

  }
  showtc(e) {
    this.onMyShow();
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

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.time = content.time;
body.timetwo = content.timetwo;
body.closetanchuang = content.closetanchuang;
body.showtc = content.showtc;
body.chakanjilu = content.chakanjilu;
body.bindSignIn = content.bindSignIn;

Page(body)