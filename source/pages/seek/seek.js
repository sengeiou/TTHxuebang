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
    super.onLoad(options);
    this.options.type="jg";
    this.Base.setMyData({
      type: this.options.type,
      xiala: "yc",
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
      options_show: false,
      courselist: [],
      jglist: [],
      buyshow: []
    });
    //  console.log(this.options.type);

    var timerStart = setInterval(() => {
      var jgapi = new JigouApi();
      jgapi.latestbuy((buyshow) => {
        this.Base.setMyData({
          buyshow
        });
      });
    }, 15000);

    this.Base.setMyData({
      timerStart
    });
  }

  onUnload() {
    var timerStart = this.Base.getMyData().timerStart;
    clearInterval(timerStart);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;

    var jigouapi = new JigouApi();

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
      this.loadcourse();


      jigouapi.activedistrictlist({
        city_id: AppBase.CITYID
      }, (filterdistrict) => {
        this.Base.setMyData({
          filterdistrict
        });
        if (this.Base.options.type == 'jg') {

          var adcode = address.ad_info.adcode;
          for (var i = 0; i < filterdistrict.length; i++) {
            if (adcode == filterdistrict[i].id) {
              var fdistrict_id = filterdistrict[i].id;
              this.Base.setMyData({
                fdistrict_id
              });
            }
          }
        }

        this.loadjg();
      });

    }, () => {
      this.loadjg();
      this.loadcourse();


      jigouapi.activedistrictlist({
        city_id: AppBase.CITYID}, (filterdistrict) => {
        this.Base.setMyData({
          filterdistrict
        });
      });
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
    }
    if (type == "xs") {
      this.Base.setMyData({
        show: "xs"
      })
    }
    if (type == "hp") {
      this.Base.setMyData({
        show: "hp"
      })
    }
    this.loadjg();

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

    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };
    var data = this.Base.getMyData();

    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    if (data.show == "jx") {
      opt.orderby = "jxrate,distance";
    }
    if (data.show == "xs") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.show == "hp") {
      opt.orderby = "scoring desc,distance";
    }


    jigouapi.jglist(opt, (jglist) => {
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
    if (data.options == "j_x") {
      opt.orderby = "jxrate,distance";
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
  changeDistrict(e) {
    console.log(e);
    var seq = parseInt(e.currentTarget.id);
    var filterdistrict = this.Base.getMyData().filterdistrict;
    this.Base.setMyData({
      fdistrict_id: filterdistrict[seq].id, xiala: "yc"
    });
    this.loadjg();
    
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


  bindxiala(e){
    var xiala=this.Base.getMyData().xiala;

    this.Base.setMyData({ xiala: xiala=="xs"?"yc":"xs"})

  }
  yingcang(){
    this.Base.setMyData({ xiala: "yc" })
  }



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.tokcdetails = content.tokcdetails;
body.bindxuanxiang = content.bindxuanxiang; 
body.bindxiala = content.bindxiala;
body.yingcang = content.yingcang;

body.bindScreening = content.bindScreening;
body.bindshow = content.bindshow;
body.loadjg = content.loadjg;
body.loadcourse = content.loadcourse;
body.hideFilter = content.hideFilter;
body.resetFilter = content.resetFilter;
body.setTDistrict = content.setTDistrict;
body.setTType = content.setTType;
body.setTAge = content.setTAge;
body.changeDistrict = content.changeDistrict;
Page(body)