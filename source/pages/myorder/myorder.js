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
  PurchaseApi
} from "../../apis/purchase.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";
import {
  BatchApi
} from "../../apis/batch.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "all",
      wclist: [],
      dflist: []
    })
    var type = this.Base.options.type;
    console.log("那真的牛批" + type);
    if (type != undefined) {
      if (type == 'ygm') {
        var show = 'wc';
      }
      if (type == 'dfk') {
        var show = 'wait'
      }
      if (type == 'dsh') {
        var show = 'dsh';
      }
      if (type == 'dpj') {
        var show = 'dpj';
      }
      console.log("那真的牛批");
      this.Base.setMyData({
        show: show
      })
    }


  }
  onMyShow() {
    var that = this;
    var api = new PurchaseApi();

    api.purchaselist({
    }, (alllist) => {

      this.Base.setMyData({
        alllist
      });
    });

    api.purchaselist({
      pstatus: 'P,U,R,PJ'
    }, (wclist) => {
      this.Base.setMyData({
        wclist
      });
    });

    api.purchaselist({
      pstatus: 'W'
    }, (dflist) => {
      this.Base.setMyData({
        dflist
      });
    });

    api.purchaselist({
      pstatus: 'PJ'
    }, (pjlist) => {
      this.Base.setMyData({
        pjlist
      });
    });

    api.purchaselist({
      pstatus: 'DSH'
    }, (dshlist) => {
      this.Base.setMyData({
        dshlist
      });
    });

  }
  courseinfo(e)
  {
    wx.navigateTo({
      url: '/pages/order/order?id=' + e.currentTarget.dataset.id
    })
  
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "all") {
      this.Base.setMyData({
        show: "all"
      })
    }
    if (type == "wc") {
      this.Base.setMyData({
        show: "wc"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        show: "wait"
      })
    }
    if (type == "dsh") {
      this.Base.setMyData({
        show: "dsh"
      })
    }
    if (type == "dpj") {
      this.Base.setMyData({
        show: "dpj"
      })
    }
  }

  bindpay(e) {
    var that = this;
    var id = e.currentTarget.id;
    var wechatapi = new WechatApi();
    var list = this.Base.getMyData().alllist.filter((item)=>{
       
       return  item.id==id;

    });
     if(list[0].type=='PT')
     {
       wechatapi.prepay2({ id: id }, (payret) => {
         payret.complete = function (e) {
           that.onMyShow();
         }
         console.log(payret);
         wx.requestPayment(payret)
       });

     }
else{

    wechatapi.prepay({ id: id }, (payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      wx.requestPayment(payret)
    });
     }
  }
  toorder(e) {
    var that = this;
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/order/order?id=' + id,
    })
  }
  colseorder(e) {
    var that = this;
    var id = e.currentTarget.id;

    wx.showModal({
      title: '',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var batchapi = new BatchApi();
          batchapi.closeorder({ id: id }, (colseorder) => {
            that.Base.setMyData({ colseorder })
            that.onMyShow();
          })
        }
      }
    });


  }
  kantuan(e) {
    wx.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.currentTarget.dataset.pt,
    })

  }
  pinjia(e)
  {
    wx.navigateTo({
      url: '/pages/pingjia/pingjia?id='+e.currentTarget.dataset.id+'&&order_id='+e.currentTarget.id,
    })

  }
  shanchu(e)
  {
    var that = this;
    var id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '确认删除此订单？',
      content: '删除后不能恢复',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#FF6600',
      confirmText: '确定',
      confirmColor: '#FF6600',
      success: function (res) {
        if (res.confirm) {
          var batchapi = new BatchApi();
          batchapi.deleteorder({ id: id }, (colseorder) => {
            that.Base.setMyData({ colseorder })
            that.onMyShow();
          })
        }
      }
    });
  }
  pinjialist(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pingjialist/pingjialist?id=' + id
    })
  }
  onPageScroll(e) {
    //console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop > 100 && floorstatus != true) {
      this.setData({
        floorstatus: true
      });
    }
    var sco = this.Base.getMyData().sco;
    if (e.scrollTop > 520 && sco != 1) {
      this.setData({
        sco: 1
      });
    }
    var sco2 = this.Base.getMyData().sco;
    if (e.scrollTop <= 520 && sco2 != 2) {
      this.setData({
        sco: 2
      });
    }
    var floorstatus = this.Base.getMyData().floorstatus;
    if (e.scrollTop <= 100 && floorstatus != false) {
      this.setData({
        floorstatus: false
      });
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;

body.colseorder = content.colseorder;
body.bindpay = content.bindpay;
body.toorder = content.toorder;
body.kantuan = content.kantuan;
body.pinjia = content.pinjia;
body.shanchu = content.shanchu;
body.courseinfo = content.courseinfo; 
body.pinjialist = content.pinjialist;
body.bindshow = content.bindshow;
body.onPageScroll = content.onPageScroll;
Page(body)