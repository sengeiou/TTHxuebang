// pages/ceshi/ceshi.js 
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
  BaomaApi
} from "../../apis/baoma.api.js";

import {
  JifenApi
} from "../../apis/jifen.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      signNum: 0, //签到数
      signState: false, //签到状态
      min: 1, //默认值日期第一天1
      max: 7, //默认值日期最后一天7
      weeks: 0, //默认倍数
      dakashow:false,
      tangchuan: false
    })
  }

  onMyShow() {

    var that = this
    this.btn();
    
    var jifenapi = new JifenApi();




  }

  bindSignIn(e) {
    var that = this,
      days = e.currentTarget.dataset.days;
    days++

    console.log(days + "天数");
    // wx.showToast({
    //   icon: 'success',
    //   title: '打卡成功',
    // })

    this.Base.setMyData({
      signNum: days,
      signState: true,
      dakashow: true,
      tangchuan: false
    })

    var min = e.currentTarget.dataset.min,
      max = e.currentTarget.dataset.max,
      weeks = e.currentTarget.dataset.weeks;

    if (days % 7 == 0) {
      weeks += 1;
      this.Base.setMyData({
        weeks: weeks
      })
    }

    if (days == 7 * weeks + 1) {
      this.Base.setMyData({
        min: 7 * weeks + 1,
        max: 7 * weeks + 7
      })
    }

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
    this.Base.setMyData({
      dakashow: false,
      tangchuan: false,
      guize: false
    })
  }

  btn(){

    var jifenapi = new JifenApi();
    var dakalist = this.Base.getMyData().dakalist;
    
    jifenapi.dakalist({}, (dakalist) => {
      this.Base.setMyData({ dakalist })

      for (var i = 0; i < dakalist.length; i++) {
        var ss = new Date(dakalist[i].daka_date_dateformat).getTime();
        console.log("数组时间戳"+ss)
      }
    })



    var nowdate = ApiUtil.GetNowFormatDate();
    
    var timestamp = new Date(nowdate).getTime();

    var cj = new Date('2019-07-03 15:35').getTime();

    var time = ApiUtil.DateLater('2019-07-02',7);

    var week = ApiUtil.GetDates(7, nowdate);

    this.Base.setMyData({ seven_date: week});
    
    console.log(time)
    console.log("地方" + nowdate)
    console.log("时间戳" + timestamp)
    console.log("创建时间戳" + cj)
    console.log(week)
  }

  getDates(days, todate) {//todate默认参数是当前日期，可以传入对应时间
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = ApiUtil.DateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  }



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 

body.btn = content.btn; 
body.getDates = content.getDates;

body.bindSignIn = content.bindSignIn;
body.showtc = content.showtc; 
body.chakanjilu = content.chakanjilu;
body.closetanchuang = content.closetanchuang; 
Page(body)