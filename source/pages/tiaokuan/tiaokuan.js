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
    var jigouapi = new JigouApi();

    jigouapi.tiaokuan({}, (tiaokuan) => {
      this.Base.setMyData({ tiaokuan });
    });



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