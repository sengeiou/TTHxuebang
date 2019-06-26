// pages/shopmall/shopmall.js
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
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '积分商城',
    });
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
        kf:0
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

  }
  ss(e){
   this.Base.setMyData({kf:1})
  }
  onUnload(){
    console.log("1321")
  }
  toshouzhi(e){
    this.onUnload();
    console.log("看来大家");
    wx.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }
  todetails(e){
    wx.navigateTo({
      url: '/pages/shopmalldetail/shopmalldetail'
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.onUnload = content.onUnload;
body.toshouzhi = content.toshouzhi; 
body.todetails = content.todetails; 

body.ss = content.ss; 
Page(body)