// pages/jifenorderinfo/jifenorderinfo.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '学榜商城',
    });
  }
  onLoad(options) {
    //options.id = 361;
    this.Base.Page = this;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.jifenorderinfo({ id: this.Base.options.id }, (info) => {
      this.Base.setMyData({ info })
    })
  }
  towuliu(e) {
    var id = e.currentTarget.id;
  }
  shouhuo(e) {
    var that = this;
    var id = e.currentTarget.id;
    var jifenapi = new JifenApi();

    wx.showModal({
      title: '提示',
      content: '确认收货？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          jifenapi.shouhuo({ id: id }, (shouhuo) => {
            that.Base.setMyData({ shouhuo })

            wx.showToast({
              title: '确认收货成功',
              icon: 'none'
            })
            that.onMyShow();
          })
        }
      }
    });
  }

  submit() {

  }

  gotoOrder(){
    wx.navigateTo({
      url: '/pages/jifenorderinfo/jifenorderinfo?id='+this.Base.options.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.towuliu = content.towuliu;
body.shouhuo = content.shouhuo;
body.gotoOrder = content.gotoOrder;
Page(body)