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
    if (this.Base.options.id != undefined) {
      var yaoqinren = this.Base.options.id;
      if (yaoqinren != this.Base.getMyData().memberinfo.id) {
        wx.reLaunch({
          url: '/pages/home/home?id=' + yaoqinren,
        })
        return
      }

    }


    console.log(ApiConfig.GetUploadurl() + this.options.name);
          console.log("那真的牛逼");
    this.Base.setMyData({ lujin: ApiConfig.GetUploadurl()+ this.options.name })
    this.Base.setMyData({ erweima: ApiConfig.GetApiUrl()+ "inst/qrcode?inst_id=1&url=/pages/home/home?id=" + this.Base.getMyData().memberinfo.id })
  }
  baocun() {
    var that = this;
    var url ="https://tthxb2.artxb.cn/Users/upload/tthxb/" + this.options.name;
    console.log("uuu1",url);
    // url = "https://tthxb2.artxb.cn/Users/upload/tthxb/23695_ttxhbyq.png";
    // console.log("uuu2", url);
    this.download(url);
  
  }
  onShareAppMessage(e) {
    return {

      title: this.Base.getMyData().instinfo.zhuanfatishi,

      desc: '分享页面的内容',

      path: '/pages/home/home?id=' + this.Base.getMyData().memberinfo.id

    }

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baocun = content.baocun;
Page(body)