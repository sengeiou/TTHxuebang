// pages/shopmall/shopmall.js
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
import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      // title: '积分商城',
      title: '学榜商城',
    });
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      show: "wc"
    });

  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.commoditylist({
      istopvalue: "Y",
      orderby: 'r_main.seq'
    }, (list) => {
      this.Base.setMyData({
        topvaluelist: list
      })
    })


    jifenapi.commoditylist({
      isscore: "Y",
      orderby: 'r_main.seq'
    }, (list) => {
      this.Base.setMyData({
        scrolllist: list
      })
    })


  }
  courseinfo(e) {
    wx.navigateTo({
      url: '/pages/order/order?id=' + e.currentTarget.dataset.id
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
        show: "wc"
      })
    }

  }
  ss(e) {
    this.Base.setMyData({
      kf: 1
    })
  }
  onUnload() {
    console.log("1321")
  }
  toshouzhi(e) {
    this.onUnload();
    console.log("看来大家");
    wx.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }
  todetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shopmalldetail/shopmalldetail?id=' + id
    })
  }

  toorder(e) {
    wx.navigateTo({
      url: '/pages/jifenorder/jifenorder'
    })
  }
  showtoset(e) {
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none'
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onUnload = content.onUnload;
body.toshouzhi = content.toshouzhi;
body.todetails = content.todetails;
body.toorder = content.toorder;
body.bindshow = content.bindshow;
body.ss = content.ss;
body.showtoset = content.showtoset;
Page(body)