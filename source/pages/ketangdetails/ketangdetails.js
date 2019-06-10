// pages/ketangdetails/ketangdetails.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ check: 1 })
  }
  onMyShow() {
    var that = this;
    var pingjiaapi = new PingjiaApi();

    pingjiaapi.pingjialist({}, (pingjialist) => {
      this.Base.setMyData({
        pingjialist
      });
    });

  }

  bindcheck(e) {
   var type=e.currentTarget.id;
   if(type==1){
    this.Base.setMyData({  check: 1 })
   }
   if (type == 2) {
     this.Base.setMyData({ check: 2 })
    }

   if (type == 3) {
     this.Base.setMyData({ check: 3 })
    }
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
Page(body)