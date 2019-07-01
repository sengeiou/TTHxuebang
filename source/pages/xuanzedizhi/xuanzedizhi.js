// pages/xuanzedizhi/xuanzedizhi.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";
import {
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '选择地址',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show: false, jifen: this.Base.options.interral, kong: false, type:this.Base.options.type})
  }
  onMyShow() {
    var that = this; 
    var addressapi = new AddressApi();
    
    addressapi.addresslist({ member_id:this.Base.getMyData().memberinfo.id   }, (addresslist) => {
      this.Base.setMyData({ addresslist })
    })

  }


  bindcheck(e){
    var id=e.currentTarget.id;

    this.Base.setMyData({ check: id})
  }

  addressmanage(e) {
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/addressmanage/addressmanage?xiugai=1&id=' + id,
    })
  }
  addnew(e){
    
    wx.navigateTo({
      url: '/pages/addressmanage/addressmanage',
    })
  }
  queren(e){
    this.Base.setMyData({
      show:true
    })
  }
  quedin(e){
    var inventory = this.Base.options.inventory;
    var jifen = this.Base.options.interral;
    var myjifen = e.currentTarget.id;

    var shengyu = myjifen - jifen;
    console.log(shengyu + "剩余");
    if (parseInt(jifen) > parseInt(myjifen)){
      this.Base.setMyData({ kong: true});
      return;
    }
    //return;
    var jifenapi = new JifenApi();
    jifenapi.updatekucun({ id: this.Base.options.id, inventory: inventory - 1 }, (updatekucun) => {
      this.Base.setMyData({ updatekucun })
    })

    jifenapi.updatejifen({ id: 10, integral: shengyu }, (updatejifen) => {
      this.Base.setMyData({ updatejifen, tanchuan: 2, show: false })
      this.onMyShow();
      wx.navigateTo({
        url: '/pages/yiduihuang/yiduihuang',
      })
    })
     
   
  }
  quxiao(e) {
    this.Base.setMyData({
      show: false
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.addressmanage = content.addressmanage; 
body.addnew = content.addnew; 
body.queren = content.queren; 
body.quxiao = content.quxiao; 
body.quedin = content.quedin; 

body.bindcheck = content.bindcheck; 
Page(body)