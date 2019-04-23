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
import {
  MemberApi
} from "../../apis/member.api.js";

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
      mylat: 0,
      mylng: 0
    })

    var instapi = new InstApi();
    // console.log()
    instapi.indexbanner({ orderby: 'r_main.seq', city_id: AppBase.CITYID}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
    
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    
    this.Base.getAddress((address) => {
      console.log(address);
      var mylat = address.location.lat;
      var mylng = address.location.lng;
      var memberinfo = this.Base.getMyData().memberinfo;
      var citylist = memberinfo.citylist;

      var citycode = address.ad_info.adcode.substr(0, 4) + "00";
      console.log("citycode" + citycode);
      if (AppBase.CITYSET == false) {
        for (var i = 0; i < citylist.length; i++) {
          if (citylist[i].id == citycode) {
            AppBase.CITYID = citylist[i].id;
            AppBase.CITYNAME = citylist[i].name;
            break;
          }
        }
      }

      var memberapi = new MemberApi();
      memberapi.usecity({
        city_id: AppBase.CITYID
      });

      this.Base.setMyData({
        mylat,
        mylng,
        cityname: AppBase.CITYNAME
      });
      this.loadjg();
    }, () => {
      if (AppBase.CITYSET == false) {
        this.Base.setMyData({
          cityname: AppBase.CITYNAME
        });
      }
      memberapi.usecity({
        city_id: AppBase.CITYID
      });
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
  
  tobaoma(e){
    wx.navigateTo({
      url: '/pages/baoma/baoma',
    })
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
    });
  }
  loadjg() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    jigouapi.jglist({
      mylat,
      mylng,
      city_id: AppBase.CITYID,
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

  bannerGo(e){
    var id=e.currentTarget.id;
    var indexbanner = this.Base.getMyData().indexbanner;
    for(var i=0;i<indexbanner.length;i++){
      if(id==indexbanner[i].id){
        if(indexbanner[i].type=='KC'){
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id='+indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }
        if (indexbanner[i].type == 'SF') {
          wx.navigateTo({
            url: indexbanner[i].url
          })
        }
        return;
      }
    }
  }

  tocity(e){
    wx.navigateTo({
      url: '/pages/city/city',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

  onPageScroll(e) {
    console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    }
    if (e.scrollTop > 520) {
      this.setData({
        sco: 1
      });
    }
    if (e.scrollTop <= 520) {
      this.setData({
        sco: 2
      });
    }
    if (e.scrollTop <= 100) {
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
body.totake = content.totake;
body.swiperChange = content.swiperChange;
body.clickChange = content.clickChange; 
body.tobaoma = content.tobaoma; 
body.loadjg = content.loadjg;
body.bannerGo = content.bannerGo; 
body.tocity = content.tocity;

body.onPageScroll = content.onPageScroll;
Page(body)