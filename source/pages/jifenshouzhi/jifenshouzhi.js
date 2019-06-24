// pages/jifenshouzhi/jifenshouzhi.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '收支明细'
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show : 1})
  }
  onMyShow() {
    var that = this;
  }
  xuanze(e){
    var type = e.currentTarget.id;
    console.log(type);
    if (type=="shouru"){
      this.Base.setMyData({show:1})
    }
    if (type == "zhichu") {
      this.Base.setMyData({ show: 2 })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.xuanze = content.xuanze;
Page(body)