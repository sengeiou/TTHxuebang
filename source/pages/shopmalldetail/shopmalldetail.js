// pages/shopmalldetail/shopmalldetail.js
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
      show: 0
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

  }
  toshouzhi(e) {
    wx.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }
  toduihuan(e) {
    this.Base.setMyData({
      show: 1
    })
  }
  close(e) {
    this.Base.setMyData({
      show: 0
    })
  }
  next(e){
    wx.navigateTo({
      url: '/pages/xuanzedizhi/xuanzedizhi'
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.toshouzhi = content.toshouzhi;
body.toduihuan = content.toduihuan;
body.close = content.close; 
body.next = content.next;
Page(body)