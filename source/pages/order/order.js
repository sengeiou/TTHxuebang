// pages/order/order.js
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
  JigouApi
} from "../../apis/jigou.api.js";
import {
  PurchaseApi
} from "../../apis/purchase.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 21;
    super.onLoad(options);

    var timerid=setInterval(()=>{
      var reminderpay = this.Base.getMyData().reminderpay;
      if(reminderpay>0){
        reminderpay--;
        
        var mHour = reminderpay / 3600;
        var mMinute = (reminderpay - mHour * 3600) / 60;
        var mSecond = (reminderpay) % 60;
        mHour = this.Base.util.ten2(mHour);
        mMinute = this.Base.util.ten2(mMinute);
        mSecond = this.Base.util.ten2(mSecond);
        console.log("reminderpay" + reminderpay);
        this.Base.setMyData({ mHour, mMinute, mSecond, reminderpay});

        if(reminderpay<=0){
          this.onMyShow();
        }
      }
    },1000);

    this.Base.setMyData({
      show: "finished",
      reminderpay:0,
      timerid
    })
  }
  onUnload(){
    var timerid = this.Base.getMyData().timerid;
    clearInterval(timerid);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var purchaseapi = new PurchaseApi();
    purchaseapi.purchaseinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });
      if(info.pstatus=='W'){
        var reminderpay=parseInt(info.reminderpay);
        this.Base.setMyData({ reminderpay });
      }
      jigouapi.courseinfo({
        id: info.course_id
      }, (courseinfo) => {
        this.Base.setMyData({
          courseinfo
        });
      })
    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.Base.setMyData({
        show: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        show: "wait"
      })
    }
  }
  bindback(e) {
    wx.navigateBack({
      delta: 2,
    })
  }

  bindpay(){
    var that=this;
    var wechatapi = new WechatApi();
    wechatapi.prepay({ id: this.Base.options.id }, (payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      wx.requestPayment(payret)
    });
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow; 
body.bindback = content.bindback;
body.bindpay = content.bindpay;
Page(body)