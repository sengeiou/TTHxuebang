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
     options.id=9;
    super.onLoad(options);
    var that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res.model)

        var str = res.model
        var model = str.split("(")[0];
        console.log(model + "机型")

        that.Base.setMyData({
          model: model
        })
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }

    })
    this.Base.setMyData({ tanchuang: false, buy_id:1})


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.courseinfo({
      id: 1
    }, (courseinfo) => {
      this.Base.setMyData({
        courseinfo
      });
    });

    jigouapi.jginfo({
      id: 9
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
          miletxt,
          mylat: mylat,
          mylng: mylng
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


      },()=>{
        jigouapi.courselist({
          jg_id: jginfo.id
        }, (courselist) => {
          this.Base.setMyData({
            courselist: courselist
          });
        });
      });

      jigouapi.ketanglist({ onlineclassroomtype_id: jginfo.classtype_id }, (ketanglist) => {

        this.Base.setMyData({ ketanglist });

      })



      jigouapi.jigouimg({
        jigou: jginfo.id,
        orderby: 'r_main.seq',
        status: "A"
      }, (jigouimg) => {
        this.Base.setMyData({
          jigouimg
        });
      });
      console.log("???????????");

      this.Base.setMyData({
        jginfo,
        isfav: jginfo.isfav
      });



    });

  }
  check(e){
    var id=e.currentTarget.id;
    var jigouapi = new JigouApi();
    this.Base.setMyData({ buy_id: id})

    jigouapi.courseinfo({
      id: id
    }, (courseinfo) => {
      this.Base.setMyData({
        courseinfo
      });
    });
  }
  tobuy(e){
    var id=e.currentTarget.id;
    console.log(id+"电费");
    //return;
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + id,
    })
  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  fav(e) {
    var status = e.currentTarget.id;


    if (status == "Y") {
      this.Base.setMyData({
        tishi: 1
      });
    }
    if (status == "N") {
      this.Base.setMyData({
        tishi: 2
      });
    }




    var jigouapi = new JigouApi();
    jigouapi.jigoufav({
      jg_id: this.Base.options.id,
      status
    }, (ret) => {
      this.Base.setMyData({
        isfav: status
      });
    });

    setTimeout(() => {
      this.Base.setMyData({
        tishi: 0
      })
      // clearTimeout(timeoutId);
    }, 1000);


  }
  bindshowtc(e){
    this.Base.setMyData({ tanchuang:true})
  }
  bindclose(e){
    this.Base.setMyData({ tanchuang: false })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tokcdetails = content.tokcdetails;
body.fav = content.fav; 
body.check = content.check;
body.tobuy = content.tobuy; 
body.bindshowtc = content.bindshowtc; 
body.bindclose = content.bindclose; 
Page(body)