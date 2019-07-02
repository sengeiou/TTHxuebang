// pages/shopmalldetail/shopmalldetail.js
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
  JifenApi
} from "../../apis/jifen.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '积分商城',
    });
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      show: 0
    });
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.commodityinfo({id:this.Base.options.id}, (info) => {
      this.Base.setMyData({ info })
    })

  }
  toshouzhi(e) {
    wx.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }
  toduihuan(e) {
    
    this.Base.setMyData({
      show: 1
    })
    //return;
    

  }
  close(e) {
    this.Base.setMyData({
      show: 0
    })
  }
  next(e){
    var inventory = e.currentTarget.id;
    var interral = e.currentTarget.dataset.jifen;
    console.log(inventory - 1 + "库存");
    console.log(interral + "积分");
    //return;
    if (inventory<=0){
      wx.showToast({
        title: '库存不足，无法兑换',
        title:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/xuanzedizhi/xuanzedizhi?inventory=' + inventory + '&interral=' + interral+'&id='+this.Base.options.id
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.toshouzhi = content.toshouzhi;
body.toduihuan = content.toduihuan;
body.close = content.close; 
body.next = content.next;
Page(body)