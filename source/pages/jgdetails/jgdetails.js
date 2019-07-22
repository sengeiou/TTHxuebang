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

class Content extends AppBase {courselist
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.id = 3;
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
    this.Base.setMyData({
      tanchuang: false,
      shuliang: 1,
      sl: 1,
      more: false

    })


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.jginfo({
      id: this.Base.options.id
    }, (jginfo) => {



      jigouapi.courselist({
        jg_id: jginfo.id,
        orderby: 'r_main.id'
      }, (courselist) => {

        console.log('13213213', courselist);

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

        jigouapi.courseinfo({
          id: courselist[0].id
        }, (courseinfo) => {
          this.Base.setMyData({
            courseinfo,
            buy_id: courselist[0].id
          });
        });

        this.Base.setMyData({
          courselist: courselist,
          miletxt
        });
      });



      jigouapi.ketanglist({
        onlineclassroomtype_id: jginfo.classtype_id
      }, (ketanglist) => {

        this.Base.setMyData({
          ketanglist
        });

      })

      jigouapi.orderstatus({
        id: this.Base.options.id
      }, (canbuy) => {

        this.Base.setMyData({
          canbuy
        });
      });

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

  showmore(e) {
    this.Base.setMyData({
      more: true
    })
  }
  shouqi(e) {
    this.Base.setMyData({
      more: false
    })
  }

  jia(e) {
    var kucun = e.currentTarget.id;
    var shuliang = this.Base.getMyData().shuliang;
    shuliang++
    if (shuliang > kucun) {
      wx.showToast({
        title: '购买数量请勿超过库存',
        icon: 'none',
      })
      return;
    }

    this.Base.setMyData({
      shuliang
    })
  }
  jian(e) {
    var shuliang = this.Base.getMyData().shuliang;
    shuliang--
    if (shuliang <= 0) {
      wx.showToast({
        title: '至少购买一个',
        icon: 'none',
      })
      return;

    }
    this.Base.setMyData({
      shuliang
    })
  }

  check(e) {
    var id = e.currentTarget.id;
    var ck = e.currentTarget.dataset.check;
    var jigouapi = new JigouApi();


    this.Base.setMyData({
      buy_id: id,
      ck: ck
    })

    jigouapi.courseinfo({
      id: id
    }, (courseinfo) => {
      this.Base.setMyData({
        courseinfo
      });
    });
  }

  bindpin(e) {
    this.Base.setMyData({
      pin: 1,
      tanchuang: true
    })
  }
  bindshowtc(e) {
    this.Base.setMyData({
      pin:0,
      tanchuang: true
    })
  }
  tobuy(e) {
    var id = e.currentTarget.id;
    var ck = this.Base.getMyData().ck;
    console.log(id + "电费");
    //return;
    //this.Base.getMyData().pin == "1"  

    if (this.Base.getMyData().pin == "1") {
      console.log(id);
      console.log("aaa");
     // return;
      if (ck == 'Y') {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&type=0'  + '&leixin=0',
        })
      }
      if (ck == 'N') {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&type=0'  + '&leixin=1',
        })
      }
    }
    else  {
      console.log(id);
      console.log("ggg");
    //  return
      if (ck == 'Y') {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&leixin=0',
        })
      }
      if (ck == 'N') {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&leixin=1',
        })
      }
    }


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


  bindclose(e) {
    this.Base.setMyData({
      tanchuang: false
    })
  }
  toindex(e) {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tokcdetails = content.tokcdetails;
body.fav = content.fav;
body.check = content.check;
body.bindpin = content.bindpin;
body.tobuy = content.tobuy;
body.toindex = content.toindex;
body.bindshowtc = content.bindshowtc;
body.bindclose = content.bindclose;

body.showmore = content.showmore;
body.shouqi = content.shouqi;
body.jia = content.jia;
body.jian = content.jian;

Page(body)