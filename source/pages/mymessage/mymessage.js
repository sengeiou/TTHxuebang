// pages/mymessage/mymessage.js
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


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    var api = new PurchaseApi();

    jigouapi.myxiaoxi({}, (xiaoxilist) => {
      for (var i = 0; i < xiaoxilist.length; i++) {
        xiaoxilist[i].youhua = [{
            text: '取消',

            style: 'background-color: #ddd; color: #fff;padding-left:20rpx;padding-right:20rpx',
          },
          {
            text: '删除',
            id: xiaoxilist[i].id,
            style: 'background-color: #F4333C; color: #fff;padding-left:20rpx;padding-right:20rpx',
          }
        ]

      }

      this.Base.setMyData({
        xiaoxilist: xiaoxilist
      })
      console.log(12132);
    })

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
    jigouapi.jglist({}, (jglist) => {
      this.Base.setMyData({
        jglist
      });
    });
  }


  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index == 0) {
      return
    }
    var xiaoxilist = this.Base.getMyData().xiaoxilist;
    xiaoxilist = xiaoxilist.filter((item) => {

      return item.id != e.detail.value.id

    })
    this.Base.setMyData({
      xiaoxilist
    })

    var api = new JigouApi();
    api.shanchuxiaoxi({
      id: e.detail.value.id
    }, (res) => {

      console.log("真的删除了啊啊");
      console.log(res);

    })


  }
  onShare() {
    console.log('onShare')
  }
  xianqin(e) {
    console.log(e);
    var xiaoxilist = this.Base.getMyData().xiaoxilist;
    xiaoxilist = xiaoxilist.filter((item) => {

      return item.id == e.currentTarget.dataset.id;

    })
    console.log(xiaoxilist);
    if (xiaoxilist[0].type == 'A') {

      wx.navigateTo({
        url: '/pages/jiaoyixinxi/jiaoyixinxi?id=' + e.currentTarget.dataset.id,
      })
    }
    if (xiaoxilist[0].type == 'C') {

      wx.navigateTo({
        url: '/pages/tuiguanxiaoxi/tuiguanxiaoxi?id=' + e.currentTarget.dataset.id,
      })
    }
    if (xiaoxilist[0].type == 'B') {


      var api = new JigouApi();
      api.xiaoxiinfo({
        id: e.currentTarget.dataset.id
      }, (xiaoxi) => {

      })



      wx.navigateTo({
        url: '/pages/wuliu/wuliu?id=' + e.currentTarget.dataset.idd,
      })
    }
    if (xiaoxilist[0].type == 'E') {

      console.log(xiaoxilist[0].content);
      console.log(e.currentTarget.dataset.idd);

      wx.navigateTo({
        url: '/pages/xiton/xiton?id=' + xiaoxilist[0].content,
      })
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.onShare = content.onShare;
body.onClick = content.onClick;
body.xianqin = content.xianqin;
Page(body)