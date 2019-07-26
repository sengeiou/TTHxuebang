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
import {
  MemberApi
} from '../../apis/member.api';


class Content extends AppBase {
  constructor() {
    super();
  }
   
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      mobile: ""
    });
    // this.Base.setMyData({ reminderpay });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
   

    jigouapi.myxiaoxi({ isread:'N'},(xiaoxi)=>{
       
         this.Base.setMyData({xiaoxi:xiaoxi.length})

    })

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

    var memberapi = new MemberApi();
//     memberapi.info({
//     }, (memberinfo) => {
// this.Base.setMyData({memberinfo})
//     })

    var mobile=this.Base.getMyData().memberinfo.mobile;
    
    var phone1=  mobile.substr(0, [3]);
    var phone2 = mobile.substr(3, [4]);
    var phone3 = mobile.substr(7, [4]);
    this.Base.setMyData({ mobile: phone1 + ' ' + phone2 + ' ' + phone3 })
    console.log(phone1 + phone2 + phone3);
    

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
    var that = this;
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        var result = res.result;
        if (result == "" || result.length != 8) {
          that.Base.info("扫码内容不正确~" + result);
          return;
        }
        wx.navigateTo({
          url: '/pages/hexiao/hexiao?usecode=' + result,
        })
      }
    })
  }

  shua(e){
    this.onMyShow();
  }

  todetails(e) {
    var name = e.currentTarget.dataset.name;
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
    if (name == "dizhi") {
      wx.navigateTo({
        url: '/pages/xuanzedizhi/xuanzedizhi?type=' + "Y",
      })
    }
    if (name == "pc") {
      wx.navigateTo({
        url: '/pages/mypingce/mypingce',
      })
    }
    if (name == "dd") {
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
    if (name == "ketan") {
      wx.navigateTo({
        url: '/pages/ketan/ketan',
      })
    }



  }
  gotohaizi() {
    wx.navigateTo({
      url: '/pages/studentmsg/studentmsg',
    })
  }
  showtoast(e) {
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none'
    })
  }

  orderlist(e) {

    wx.navigateTo({
      url: '/pages/myorder/myorder?type=' + e.currentTarget.dataset.id,
    })



  }
  pintuan() {
    wx.navigateTo({
      url: '/pages/pintuan/pintuan',
    })


  }

  tuikuan() {
    this.Base.info("暂未开放");
    return
    wx.navigateTo({
      url: '/pages/tuikuan/tuikuan',
    })


  }

  phonenoCallback(phoneno, e) {
    console.log(phoneno);


    var memberapi = new MemberApi();
    memberapi.updatemobile({
      mobile: phoneno,
      member_id: this.Base.getMyData().memberinfo.id
    }, () => {
      
    })

    this.Base.setMyData({
      mobile: phoneno
    });
    this.onMyShow();

  }
  update() {
    var data = this.Base.getMyData();
    

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.update = content.update;
body.startscan = content.startscan;
body.todetails = content.todetails;
body.gotohaizi = content.gotohaizi;
body.showtoast = content.showtoast;
body.orderlist = content.orderlist;
body.pintuan = content.pintuan;
body.tuikuan = content.tuikuan; 

body.shua = content.shua; 

Page(body)