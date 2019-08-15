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
      title: '分享海报',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.setMyData({ lujin: ApiConfig.GetUploadurl() + this.options.name })
    this.Base.setMyData({ bg: ApiConfig.GetUploadPath() +   "resource/613db08f9d08ea17b8c68db38314ecee_19070419047_1556147856.png" })
    this.Base.setMyData({
      erweima: ApiConfig.GetApiUrl() + "/inst/qrcode?inst_id=1&url=/pages/groupinfo/groupinfo?id=" + options.id
    })

    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  baocun(e) {
    if (e.currentTarget.dataset.id == 'erweima') {
      this.download(this.Base.getMyData().erweima + '.png');
    }
    else {
      this.download(this.Base.getMyData().lujin);

    }


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baocun = content.baocun;
Page(body)