// pages/zaixianketang/zaixianketang.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var that = this;

    var jigouapi = new JigouApi();


    this.Base.setMyData({
      xz: -2, name: "热门课程"

    })

    jigouapi.zaixiankechenfenlei({}, (fenleilist) => {

      this.Base.setMyData({ fenleilist: fenleilist, });


    })

    jigouapi.zaixianketanlunbo({}, (zaixianlunbo) => {

      this.Base.setMyData({ lunbolist: zaixianlunbo });
    })
    jigouapi.zuixinzaixiankechen({}, (zuixin) => {
      console.log("最新的熬");
      console.log("那是真的牛批");
      this.Base.setMyData({ zuixin: zuixin });
    })

  }
  onMyShow() {

    this.getlist();

  }
  getlist() {
    var json = null;
    json = {};
    if (this.Base.getMyData().xz == -2) {
      json.ishot = 'Y';
    } else if (this.Base.getMyData().xz == -1) {
      json.isfree = 'Y';
    } else {
      json.onlineclassroomtype_id = this.Base.getMyData().xz;
    }
    var jigouapi = new JigouApi();

    jigouapi.zaixiankechenlist(json, (zaixiankechen) => {

      this.Base.setMyData({ xzlist: zaixiankechen });
    })

  }

  switchtype(e) {
    var kechenlist = this.Base.getMyData().kechenlist;

    var id = e.currentTarget.dataset.id;


    this.Base.setMyData({ xz: id, name: e.currentTarget.dataset.name })
    this.getlist();
  }
  kechenxianqin(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/ketangdetails/ketangdetails?id=' + e.currentTarget.dataset.id,
    })

  }

  bannerGo(e) {
    var id = e.currentTarget.id;
    var indexbanner = this.Base.getMyData().lunbolist;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id=' + indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }

        console.log(indexbanner[i].url, "当电灯")

        if (indexbanner[i].type == 'SF') {

          if (indexbanner[i].url == '/pages/home/home' || indexbanner[i].url == '/pages/baoma/baoma' || indexbanner[i].url == '/pages/teacher/teacher' || indexbanner[i].url == '/pages/mine/mine') {
            console.log("试试")
            wx.reLaunch({
              url: indexbanner[i].url
            })
          }
          else {
            console.log("不杀死hi")
            wx.navigateTo({
              url: indexbanner[i].url
            })
          }
        }
        return;
      }
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.switchtype = content.switchtype;
body.kechenxianqin = content.kechenxianqin;
body.bannerGo = content.bannerGo;
body.getlist = content.getlist;
Page(body)