// pages/baoma/baoma.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { BaomaApi } from "../../apis/baoma.api.js";

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
    var baomaapi = new BaomaApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    baomaapi.baomalist({}, (baomalist) => {
      this.Base.setMyData({ baomalist });
    });
  }
  binddetails(e){
    var id=e.currentTarget.id;

    wx.navigateTo({
      url: '/pages/baomainfo/baomainfo?id=' + id,
    })

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddetails = content.binddetails;
Page(body)