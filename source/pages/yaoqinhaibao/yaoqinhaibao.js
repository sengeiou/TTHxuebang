// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '推广海报',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  
    this.Base.setMyData({ lujin:"https://cmsdev.app-link.org/Users/alucard263096/tthxb/upload/tthxb/"+this.options.name})

  }
  baocun()
  {
    this.download(this.Base.getMyData().lujin);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baocun = content.baocun;
Page(body)