// pages/mymessage/mymessage.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { PurchaseApi } from "../../apis/purchase.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      right: [{
        text: '取消',
        style: 'background-color: #ddd; color: #fff;padding-left:20rpx;padding-right:20rpx',
      },
      {
        text: '删除',
        style: 'background-color: #F4333C; color: #fff;padding-left:20rpx;padding-right:20rpx',
      }],
      left: [{
        text: 'Reply',
        style: 'background-color: #108ee9; color: white',
      },
      {
        text: 'Cancel',
        style: 'background-color: #ddd; color: white',
      }],})
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    var api = new PurchaseApi();
   
    jigouapi.myxiaoxi({},(xiaoxilist)=>{

      this.Base.setMyData({ xiaoxilist: xiaoxilist})
  console.log(12132);
    })
  
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    jigouapi.jglist({}, (jglist) => {
      this.Base.setMyData({ jglist });
    });





    
  }


  onClick(e) {
    console.log('onClick', e.detail)
  }
  onShare() {
    console.log('onShare')
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails; 
body.onShare = content.onShare;
body.onClick = content.onClick;
Page(body)