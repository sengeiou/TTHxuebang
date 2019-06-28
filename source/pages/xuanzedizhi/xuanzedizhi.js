// pages/xuanzedizhi/xuanzedizhi.js
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
      title: '选择地址',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show: false, jifen: this.Base.options.interral, tanchuan:0})
  }
  onMyShow() {
    var that = this;
  }
  addressmanage(e) {
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
      this.Base.setMyData({ tanchuan: 1});
      return;
    }
    //return;
    var jifenapi = new JifenApi();
    jifenapi.updatekucun({ id: this.Base.options.id, inventory: inventory - 1 }, (updatekucun) => {
      this.Base.setMyData({ updatekucun })
    })

    jifenapi.updatejifen({ id: 10, integral: shengyu }, (updatejifen) => {
      this.Base.setMyData({ updatejifen, tanchuan: 2 })
      this.onMyShow();
    })
    this.Base.setMyData({
      show: false
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
body.queren = content.queren; 
body.quxiao = content.quxiao; 
body.quedin = content.quedin; 
Page(body)