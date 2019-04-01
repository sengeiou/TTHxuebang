// pages/mine/mine.js
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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
  }
  startscan() {
    var that=this;
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        var result=res.result;
        if(result==""||result.length!=8){
          that.Base.info("扫码内容不正确~"+result);
          return;
        }
        wx.navigateTo({
          url: '/pages/hexiao/hexiao?usecode='+result,
        })
      }
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.startscan = content.startscan;
Page(body)