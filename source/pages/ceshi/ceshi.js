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

  }

  bindSignIn(e) {
    var that = this,
      days = e.currentTarget.dataset.days;
    days++

    console.log(days+"天数");
    // wx.showToast({
    //   icon: 'success',
    //   title: '打卡成功',
    // })

    this.Base.setMyData({
      signNum: days,
      signState: true,
      dakashow:true,
      tangchuan:false
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
  showtc(e){
    
      this.Base.setMyData({ tangchuan: true })
    
  }
  chakanjilu(e) {
    this.Base.setMyData({ tangchuan: true, dakashow: false })
  }
  closetanchuang(e){
    this.Base.setMyData({
      dakashow: false,
      tangchuan: false })
  }



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindSignIn = content.bindSignIn;
body.showtc = content.showtc; 
body.chakanjilu = content.chakanjilu;
body.closetanchuang = content.closetanchuang; 
Page(body)