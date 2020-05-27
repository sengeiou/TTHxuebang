// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { WechatApi } from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '缴纳保证金',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      num:this.Base.options.num,
      id:this.Base.options.id
    })
  }
  onMyShow() {
    var that = this;
  }
  zhifu(){

    var wechatApi = new WechatApi();
    wechatApi.prepay5({ id: this.Base.options.id }, (payret) => {
      payret.complete = function (e) {
        console.log(e);
        //that.onMyShow();
        if (e.errMsg =="requestPayment:ok"){
          //成功支付
        }else{
          //错误
        }
      }
      console.log(payret);
      wx.requestPayment(payret)
    });


    // wx.reLaunch({
    //   url: '/pages/ruzhuchenggong/ruzhuchenggong',
    // })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.zhifu = content.zhifu;
Page(body)