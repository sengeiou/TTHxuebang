// pages/addressmanage/addressmanage.js

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
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '资料填写',
    });
  }

  onLoad(options) {
    this.Base.Page = this; 
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type:"mine"
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi(); 
    
  }

  bindRegionChange(e) {
    this.Base.setMyData({
      city: e.detail.value
    })
  }

  confirm(e){
    var that = this;
    var data = e.detail.value;
    var member_id = this.Base.getMyData().memberinfo.id;
    console.log(this.Base.getMyData().memberinfo.id + "乐扣乐扣")

    if (data.name == "") {
      this.Base.toast("请填写收件人姓名");
      return;
    }

    if (data.mobile == "") {
      this.Base.toast("请填写手机号");
      return;
    }

    if (data.region == "") {
      this.Base.toast("请选择地址");
      return;
    }

    if (data.address == "") {
      this.Base.toast("请填写门牌号");
      return;
    }


    wx.showModal({
      title: '保存',
      content: '确认保存地址？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          
          var addressapi = new AddressApi();
          addressapi.addedaddress({
            member_id: member_id,
            name:data.name,
            phonenumber:data.mobile,
            region:data.region,
            address: data.address,
            status:"A"
          }, (addedaddress) => {
            that.Base.setMyData({ addedaddress })
            wx.navigateBack({
              delta: 1,
            })
          })

        }
      }
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addressmanage = content.addressmanage;
body.bindRegionChange = content.bindRegionChange; 

body.confirm = content.confirm;

Page(body)