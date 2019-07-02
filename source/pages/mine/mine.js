// pages/mine/mine.js
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
    this.Base.setMyData({ reminderpay});
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });


    var api = new PurchaseApi();


    api.purchaselist({
      pstatus: 'W'
    }, (wclist) => {
      this.Base.setMyData({
        reminderpay: wclist.length
      });
    });
  }
  startscan() {
    var that=this;
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        var result=res.result;
        if(result==""||result.length!=8){
          that.Base.info("扫码内容不正确~"+result);
          return;
        }
        wx.navigateTo({
          url: '/pages/hexiao/hexiao?usecode='+result,
        })
      }
    })
  }

  todetails(e){
    var name=e.currentTarget.dataset.name;
    // if (name == "cj") {
    //   wx.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if (name == "jfsc") {
      wx.navigateTo({
        url: '/pages/shopmall/shopmall',
      })
    }
    // if (name == "yhq") {
    //   wx.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if (name == "kf") {
       wx.navigateTo({
         url: '/pages/lianxikefu/lianxikefu',
       })
     }
    if (name=="dizhi"){
      wx.navigateTo({
        url: '/pages/xuanzedizhi/xuanzedizhi?type='+"Y",
      })
    } 
    if (name == "pc") {
      wx.navigateTo({
        url: '/pages/mypingce/mypingce',
      })
    }
    if(name=="dd"){
      wx.navigateTo({
        url: '/pages/myorder/myorder',
      })
    }
    if (name == "dz") {
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
    if (name == "xx") {
      wx.navigateTo({
        url: '/pages/mymessage/mymessage',
      })
    }
    if (name == "wt") {
      wx.navigateTo({
        url: '/pages/problem/problem',
      })
    }
    if (name == "sc") {
      wx.navigateTo({
        url: '/pages/mycollect/mycollect',
      })
    }
    if (name == "wm") {
      wx.navigateTo({
        url: '/pages/aboutus/aboutus',
      })
    }
    if (name == "jg") {
      wx.navigateTo({
        url: '/pages/addmechanism/addmechanism',
      })
    }
    if (name == "tg") {
      wx.navigateTo({
        url: '/pages/promotion/promotion',
      })
    }

   
  
  }
  gotohaizi(){
    wx.navigateTo({
      url: '/pages/studentmsg/studentmsg',
    })
  }
  showtoast(e){
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon:'none'
    })
  }
  orderlist(e)
  {

 wx.navigateTo({
   url: '/pages/myorder/myorder?type='+e.currentTarget.dataset.id,
 })

  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.startscan = content.startscan;
body.todetails = content.todetails;
body.gotohaizi = content.gotohaizi;
body.showtoast = content.showtoast;
body.orderlist = content.orderlist;
Page(body)