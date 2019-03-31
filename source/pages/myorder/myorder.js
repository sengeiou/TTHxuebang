// pages/myorder/myorder.js 
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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "finished",
      wclist: [],
      dflist: []
    })
  }
  onMyShow() {
    var that = this;
    var api = new PurchaseApi();
    api.purchaselist({
      pstatus: 'P,C,U,R,F,S'
    }, (wclist) => {
      this.Base.setMyData({
        wclist
      });
    });
    api.purchaselist({
      pstatus: 'W'
    }, (dflist) => {
      this.Base.setMyData({
        dflist
      });
    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
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
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
Page(body)