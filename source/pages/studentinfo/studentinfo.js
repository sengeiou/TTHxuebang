// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '学员管理',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    var myDate = new Date();

    var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    this.Base.setMyData({
      jintian: jintian,name:'',sex:'nan',nianji:'',sjpiko:'',weixin:'',menpai:''
    })
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  studentinfo() {
    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })
  }
  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + ' 年 ' + shijians[1] + ' 月 ' + shijians[2] + ' 日 ');

    this.Base.setMyData({
      xssj: xssj
    })
  }
  name(e)
  {
    this.Base.setMyData({ name: e.detail.value})
  }
  sex(e){
 
    this.Base.setMyData({sex:e.currentTarget.dataset.id})
  }
  nianji(e)
  {
    this.Base.setMyData({ nianji: e.detail.value})
  }
  shouji(e) {
    this.Base.setMyData({ shouji: e.detail.value })
  }
  weixin(e)
  {
    this.Base.setMyData({ weixin: e.detail.value })
  }
  menpai(e) {
    this.Base.setMyData({ menpai: e.detail.value })
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.studentinfo = content.studentinfo;
body.bindDateChange = content.bindDateChange;
body.name=content.name;
body.nianji = content.nianji;
body.sex = content.sex;
body.shouji = content.shouji;
body.weixin = content.weixin;
body.menpai=content.menpai;
Page(body)