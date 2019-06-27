// pages/yiduihuang/yiduihuang.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '兑换成功',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  back(e){
   wx.navigateBack({
    delta:3
   })
  }
  order(e){
    wx.navigateTo({
      url: '/pages/exchangesuccess/exchangesuccess',
    })
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.back = content.back; 
body.order = content.order;

Page(body)