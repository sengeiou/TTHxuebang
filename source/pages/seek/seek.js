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
      filtercoursetype: [],
      ftype_id: "0",
      ttype_id: "0",
      filtercourseage: [],
      fage_id: "0",
      tage_id: "0",
      filterdistrict: [],
      fdistrict_id: "0",
      tdistrict_id: "0",
      options_show: false
    })
    //  console.log(this.options.type);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;


    var jigouapi = new JigouApi();

    jigouapi.activedistrictlist({}, (filterdistrict) => {
      this.Base.setMyData({
        filterdistrict
      });
    });
    jigouapi.coursetype({}, (filtercoursetype) => {
      this.Base.setMyData({
        filtercoursetype
      });
    });
    jigouapi.courseage({}, (filtercourseage) => {
      this.Base.setMyData({
        filtercourseage
      });
    });


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
      if (show == "jx") {

        this.loadjg();
      }
      this.loadcourse();
    }, () => {

      if (show == "jx") {

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
    this.loadcourse();
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
    var opt = {
      mylat,
      mylng,
      orderby: "distance"
    };

    var data = this.Base.getMyData();
    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    if (data.ftype_id != "0") {
      opt.type = data.ftype_id;
    }
    if (data.fage_id != "0") {
      opt.age = data.fage_id;
    }
    if (data.options =="j_x"){
      opt.orderby="jxrate,distance";
    }
    if (data.options == "x_s") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.options == "bm_za") {
      opt.orderby = "zarate,distance";
    }
    if (data.options == "h_p") {
      opt.orderby = "scoring desc,distance";
    }
    jigouapi.courselist(opt, (courselist) => {
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
  hideFilter() {
    var data = this.Base.getMyData();
    var tdistrict_id = data.fdistrict_id;
    var ttype_id = data.ftype_id;
    var tage_id = data.fage_id;
    this.Base.setMyData({
      options_show: false,
      tdistrict_id,
      ttype_id,
      tage_id
    });
  }


  bindScreening(e) {
    var data = this.Base.getMyData();
    var qd = e.currentTarget.dataset.qd;
    if (qd == "ok") {
      var fdistrict_id = data.tdistrict_id;
      var ftype_id = data.ttype_id;
      var fage_id = data.tage_id;
      this.Base.setMyData({
        options_show: false,
        fdistrict_id,
        ftype_id,
        fage_id
      });
      this.loadcourse();
    } else {

      var tdistrict_id = data.fdistrict_id;
      var ttype_id = data.ftype_id;
      var tage_id = data.fage_id;
      this.Base.setMyData({
        options: "s_x",
        options_show: true,
        tdistrict_id,
        ttype_id,
        tage_id
      })
    }

  }
  
  setTDistrict(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      tdistrict_id: id
    });
  }
  setTType(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      ttype_id: id
    });
  } 
  setTAge(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      tage_id: id
    });
  }
  resetFilter() {

    this.Base.setMyData({
      options_show: false,
      fdistrict_id: "0",
      ftype_id: "0",
      fage_id: "0"
    });
    this.loadcourse();
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
body.resetFilter = content.resetFilter;
body.setTDistrict = content.setTDistrict;
body.setTType = content.setTType;
body.setTAge = content.setTAge;
Page(body)