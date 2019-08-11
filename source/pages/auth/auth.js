import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onShow(){
    
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = false;
  }
  onMyShow() {
    var that = this;
  }
  checkPermission() {

  }
  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({ isgrantphonenumber: true, mobile: phoneno });
  }

  getUserInfo(e) {
    console.log(666666666);
    wx.clearStorage();
    wx.navigateBack({
      
    })
    //open-type="getUserInfo" bindgetuserinfo="getUserInfo"
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.getUserInfo = content.getUserInfo;
Page(body)