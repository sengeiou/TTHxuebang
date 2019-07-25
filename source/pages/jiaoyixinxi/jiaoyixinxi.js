// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '找课程',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();
    api.xiaoxiinfo({ id: this.Base.options.id }, (xiaoxi) => {

      this.Base.setMyData({ xiaoxi: xiaoxi })

    })

  }
  kecheninfo(){
  var xioaoxi=this.Base.getMyData().xiaoxi;
   
   console.log(xioaoxi);
   

    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + xioaoxi.dindan.course_id,
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.kecheninfo = content.kecheninfo;
Page(body)