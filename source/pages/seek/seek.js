// pages/seek/seek.js
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
      type: this.options.type,
      //type: "kc",
      show: "jx",
      options: "j_x",
      mylat: 0,
      mylng: 0,
      options_show: false
    })
    //  console.log(this.options.type);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;



    console.log(show);

    
      this.Base.getAddress((address) => {
        console.log(address);
        var mylat = address.location.lat;
        var mylng = address.location.lng;
        console.log("mylat");
        this.Base.setMyData({
          mylat,
          mylng
        });
        if(show=="jx"){

          this.loadjg();
        }
        this.loadcourse();
      });


  }
  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "jx") {
      this.Base.setMyData({
        show: "jx"
      })
      var jigouapi = new JigouApi();
      jigouapi.jglist({}, (jglist) => {
        this.Base.setMyData({
          jglist
        });
      });
    }
    if (type == "xs") {
      this.Base.setMyData({
        show: "xs"
      })
      var jigouapi = new JigouApi();
      jigouapi.jglist({
        jigou: "测试机构二"
      }, (jglist) => {
        this.Base.setMyData({
          jglist
        });
      });

    }
    if (type == "hp") {
      this.Base.setMyData({
        show: "hp"
      })
      var jigouapi = new JigouApi();
      jigouapi.jglist({
        jigou: "测试机构一"
      }, (jglist) => {
        this.Base.setMyData({
          jglist
        });
      });
    }

  }

  bindxuanxiang(e) {
    var options = e.currentTarget.dataset.options;
    console.log(options);
    if (options == "j_x") {
      this.Base.setMyData({
        options: "j_x"
      })


    }
    if (options == "x_s") {
      this.Base.setMyData({
        options: "x_s"
      })


    }
    if (options == "bm_za") {
      this.Base.setMyData({
        options: "bm_za"
      })


    }
    if (options == "h_p") {
      this.Base.setMyData({
        options: "h_p"
      })

    }
  }

  bindScreening(e) {
    var qd = e.currentTarget.dataset.qd;
    if (qd == "ok") {
      this.Base.setMyData({
        options_show: false
      })
    } else {
      this.Base.setMyData({
        options: "s_x",
        options_show: true
      })
    }

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
  loadcourse() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    jigouapi.courselist({
      mylat,
      mylng,
      orderby: "distance"
    }, (courselist) => {
      for (var i = 0; i < courselist.length; i++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        console.log("mile=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("miletxt=" + miletxt);
        courselist[i]["miletxt"] = miletxt;
      }
      this.Base.setMyData({
        courselist
      });
    });
  }
  hideFilter(){
    this.Base.setMyData({ options_show:false});
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.tokcdetails = content.tokcdetails;
body.bindxuanxiang = content.bindxuanxiang;

body.bindScreening = content.bindScreening;
body.bindshow = content.bindshow;
body.loadjg = content.loadjg; 
body.loadcourse = content.loadcourse;
body.hideFilter = content.hideFilter;
Page(body)