// pages/xuanzedizhi/xuanzedizhi.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '选择地址',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({show:false})
  }
  onMyShow() {
    var that = this;
  }
  addressmanage(e) {
    wx.navigateTo({
      url: '/pages/addressmanage/addressmanage',
    })
  }
  queren(e){
    this.Base.setMyData({
      show:true
    })
  }
  quedin(e){
    this.Base.setMyData({
      show: false
    })
  }
  quxiao(e) {
    this.Base.setMyData({
      show: false
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.addressmanage = content.addressmanage; 
body.queren = content.queren; 
body.quxiao = content.quxiao; 
body.quedin = content.quedin; 
Page(body)