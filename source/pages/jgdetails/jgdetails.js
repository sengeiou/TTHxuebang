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

      this.Base.getAddress((address) => {
        console.log(address);
        var mylat = address.location.lat;
        var mylng = address.location.lng;
        console.log("hahah");
        console.log(mylat);
        var mile = ApiUtil.GetDistance(mylat, mylng, jginfo.lat, jginfo.lng);

        var miletxt = ApiUtil.GetMileTxt(mile);
        this.Base.setMyData({
          miletxt, mylat: mylat, mylng: mylng
        });

        jigouapi.courselist({
          jg_id: jginfo.id
        }, (courselist) => {
          var mylat = this.Base.getMyData().mylat;
          var mylng = this.Base.getMyData().mylng;
          for (var i = 0; i < courselist.length; i++) {
            console.log("牛逼");
            console.log(mylat);
            var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
            console.log("mile=" + mile);
            var miletxt = ApiUtil.GetMileTxt(mile);
            console.log("miletxt=" + miletxt);
            courselist[i]["miletxt"] = miletxt;

          }

          this.Base.setMyData({
            courselist: courselist
          });
        });


      });



      jigouapi.jigouimg({ jigou: jginfo.id }, (jigouimg) => {
        this.Base.setMyData({
          jigouimg
        });
      });
      console.log("???????????");

      this.Base.setMyData({
        jginfo, isfav: jginfo.isfav
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