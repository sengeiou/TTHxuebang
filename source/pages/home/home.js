// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      currentItemId: 2,
      mylat:0,
      mylng:0
    })
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
    this.Base.getAddress((address) => {
      console.log(address);
      var mylat=address.location.lat;
      var mylng = address.location.lng;

      this.Base.setMyData({
        mylat, mylng
      });
      this.loadjg();
    },()=>{

      this.loadjg();
    });
  }
  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  totake(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    if (name == "jg") {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "jg",
      })
    } else {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "kc",
      })
    }

  }

  swiperChange(e) {
    var currentItemId = e.detail.currentItemId;
    this.Base.setMyData({
      currentItemId: currentItemId
    })
  }

  clickChange(e) {
    var itemId = e.currentTarget.dataset.itemId;
    this.Base.setMyData({
      currentItemId: itemId
    })
  }
  loadjg() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    jigouapi.jglist({
      mylat,
      mylng,
      orderby: "distance"
    }, (jglist) => {
      for (var i = 0; i < jglist.length; i++) {
        console.log(jglist[i]);
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
        console.log("mile=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("miletxt=" + miletxt);
        jglist[i]["miletxt"] = miletxt;
      }
      this.Base.setMyData({
        jglist
      });
    });
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.totake = content.totake; 
body.swiperChange = content.swiperChange;
body.clickChange = content.clickChange;
body.loadjg = content.loadjg;
Page(body)