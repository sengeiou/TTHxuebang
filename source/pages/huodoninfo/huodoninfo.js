// pages/baoma/baoma.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import { InstApi } from "../../apis/inst.api.js";
import { HuodonApi } from "../../apis/huodon.api.js";

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
    var huodonapi = new HuodonApi();
    huodonapi.huodonlist({}, (huodonlist) => {
      this.Base.setMyData({ huodonlist });

    })

    console.log("牛逼了");




  }

  listclick(e) {
    console.log(e);

    wx.navigateTo({
      url: '/pages/huodoninfo/huodoninfo?id=' + e.currentTarget.dataset.id,
    })

  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddetails = content.binddetails;
body.onPageScroll = content.onPageScroll;
body.listclick = content.listclick;
Page(body)