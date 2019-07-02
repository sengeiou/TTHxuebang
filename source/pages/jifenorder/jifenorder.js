// pages/jifenorder/jifenorder.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的兑换',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show: "all"})
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.jifenorderlist({ }, (alllist) => {
      this.Base.setMyData({ alllist })
    })

    jifenapi.jifenorderlist({orderstatus:"A"}, (daifalist) => {
      this.Base.setMyData({ daifalist })
    })

    jifenapi.jifenorderlist({ orderstatus: "B"}, (daishoulist) => {
      this.Base.setMyData({ daishoulist })
    })

    jifenapi.jifenorderlist({ orderstatus: "C"}, (wanchenlist) => {
      this.Base.setMyData({ wanchenlist })
    })

  }
  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "all") {
      this.Base.setMyData({
        show: "all"
      })
    }
    if (type == "wc") {
      this.Base.setMyData({
        show: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        show: "wait"
      })
    }
    if (type == "ok") {
      this.Base.setMyData({
        show: "wc"
      })
    }
  }
  bindtodetails(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jifenorderinfo/jifenorderinfo?id='+id
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindshow = content.bindshow; 
body.bindtodetails = content.bindtodetails;
Page(body)