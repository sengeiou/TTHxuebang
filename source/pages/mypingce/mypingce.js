// pages/mypingce/mypingce.js
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
  PingceApi
} from "../../apis/pingce.api.js";
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
    this.Base.setMyData({ type: this.Base.options.type})
  }
  setPageTitle() {
    // if (this.Base.getMyData().type == "A") {
    //   wx.setNavigationBarTitle({
    //     title: '评测列表',
    //   });
    // } else {
    //   wx.setNavigationBarTitle({
    //     title: '我的评测',
    //   });
    // }

  }
  onMyShow() {
    var that = this;
    if (this.Base.getMyData().type == "A") {
      wx.setNavigationBarTitle({
        title: '评测列表',
      });
    } else {
      wx.setNavigationBarTitle({
        title: '我的评测',
      });
    }
    var pingceapi = new PingceApi();
    pingceapi.mypingcelist({}, (mypingcelist) => {
      this.Base.setMyData({
        mypingcelist
      })
    })
    
  }
  
  toceshi(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/pingceindex/pingceindex?id=' + id
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.toceshi = content.toceshi;
Page(body)