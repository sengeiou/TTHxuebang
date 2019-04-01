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
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "t1",
    })
  }
  onMyShow() {
    var that = this;
    var api = new MemberApi();
    api.favcourselist({
    }, (kclist) => {
      this.Base.setMyData({
        kclist
      });
      });
    api.favjigoulist({
    }, (jglist) => {
      this.Base.setMyData({
        jglist
      });
    });

    api.favvideolist({
    }, (splist) => {
      this.Base.setMyData({
        splist
      });
    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    this.Base.setMyData({
      show: type
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
Page(body)