// pages/kcdetails/kcdetails.js
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
      show: "kcxq"
    })
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();


    //this.Base.options.id
    jigouapi.courseinfo({
      id: this.Base.options.id
    }, (courseinfo) => {
      //courseinfo.xx=parseInt();

      jigouapi.kechenlunbo({
        name: courseinfo.id
      }, (kechenlunbo) => {
        this.Base.setMyData({
          kechenlunbo
        });
      });

      this.Base.getAddress((address) => {
        console.log(address);
        var mylat = address.location.lat;
        var mylng = address.location.lng;

        var mile = ApiUtil.GetDistance(mylat, mylng, courseinfo.JG_lat, courseinfo.JG_lng);

        var miletxt = ApiUtil.GetMileTxt(mile);
        this.Base.setMyData({
          miletxt,
          scoring: parseInt(courseinfo.scoring)
        });
        var scoring = this.Base.getMyData().scoring;
        console.log("啊啊啊" + scoring)
      });

      this.Base.setMyData({
        courseinfo,
        isfav: courseinfo.isfav
      });
    });

    jigouapi.checkcanbuy({
      course_id: this.Base.options.id
    }, (canbuy) => {

      this.Base.setMyData({
        canbuy
      });
    });

  }
  bindcut(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);

    if (type == "kcxq") {
      this.Base.setMyData({
        show: "kcxq"
      })
    }
    if (type == "gmxz") {
      this.Base.setMyData({
        show: "gmxz"
      })
    }

  }
  bindtopurchase(e) {
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id
    })
  }

  fav(e) {
    var status = e.currentTarget.id;
    var jigouapi = new JigouApi();
    jigouapi.coursefav({
      course_id: this.Base.options.id,
      status
    }, (ret) => {
      //this.Base.info(ret.result);
      this.Base.setMyData({
        isfav: status
      });
    });
  }
  todetails(e) {
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + this.Base.getMyData().courseinfo.jg_id,
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
    if (e.scrollTop > 520){
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
body.bindcut = content.bindcut;
body.bindtopurchase = content.bindtopurchase;
body.fav = content.fav;
body.todetails = content.todetails;
body.onPageScroll = content.onPageScroll;
Page(body)