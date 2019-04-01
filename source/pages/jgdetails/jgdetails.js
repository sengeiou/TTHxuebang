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
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();



    jigouapi.jginfo({
      id: this.options.id
    }, (jginfo) => {

      jigouapi.jigouimg({ jigou: jginfo.id }, (jigouimg) => {
        this.Base.setMyData({
          jigouimg
        });
      });

      this.Base.getAddress((address) => {
        console.log(address);
        var mylat = address.location.lat;
        var mylng = address.location.lng;

        var mile = ApiUtil.GetDistance(mylat, mylng, jginfo.lat, jginfo.lng);
        
        var miletxt = ApiUtil.GetMileTxt(mile);
        this.Base.setMyData({
          miletxt
        });
      });

      this.Base.setMyData({
        jginfo,isfav:jginfo.isfav
      });

      jigouapi.courselist({
        jg_id: jginfo.id
      }, (courselist) => {
        this.Base.setMyData({
          courselist: courselist
        });
      });

    });

  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  fav(e) {
    var status = e.currentTarget.id;
    var jigouapi = new JigouApi();
    jigouapi.jigoufav({ jg_id: this.Base.options.id, status }, (ret) => {
      this.Base.setMyData({ isfav: status });
    });
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.tokcdetails = content.tokcdetails;
body.fav = content.fav;

Page(body)