// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的客户',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "all",
      date:"all",
  
    })
  }
  onMyShow() {
    var that = this;
  }
  bindshow(e){
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({ show: type})
  }
  binddate(e)
  {
    var type = e.currentTarget.dataset.val;
    this.Base.setMyData({ date: type })

  }
  kehuinfo()
  {
    wx.navigateTo({
      url: '/pages/kehuinfo/kehuinfo',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindshow = content.bindshow;
body.binddate = content.binddate;
body.kehuinfo = content.kehuinfo;
Page(body)