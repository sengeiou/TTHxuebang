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
    //options.id = 326;
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
      pin:3,
       
      xuanzhong: 0,
      ketang: [],
      catchtouchmove:0,
      trunoff:false

    })


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.jginfo({
      id: this.Base.options.id
    }, (jginfo) => {

      
      var hang = jginfo.jieshao;
     var hangshu=  hang.split('\n')

      if (hangshu.length>5){
        this.Base.setMyData({ more:false})
     }
      
      console.log(hangshu);


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

        var min = courselist[0];

        for (var j = 0; j < courselist.length; j++) {
          var cur = courselist[i];
            cur < min ? min = cur : null
        }
        console.log(min,"最小值")

        var jiancha = courselist.filter((item, idx) => {
          return item.isgroup != '0.00' || item.isgroup_tiyan != '0.00'
        })

        if (jiancha.length > 0) {
          this.Base.setMyData({
            nogroup: "Y"
          })
        }
        console.log(jiancha,"裂了")

        jigouapi.courseinfo({
          id: courselist[0].id
        }, (courseinfo) => {


          this.Base.setMyData({
            courseinfo,
            gou: 1,
            buy_id: courselist[0].id
          });


        });

        this.Base.setMyData({
          courselist: courselist,
          miletxt, min 
        });
      });



      jigouapi.ketanglist({
        onlineclassroomtype_id: jginfo.classtype_id
      }, (ketanglist) => {

        var ketang = [];
        for (var j = 0; j < ketanglist.length && j < 4; j++) {
          ketang.push(ketanglist[j]);
        }

        this.Base.setMyData({
          ketanglist,
          ketang
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
  kechenxianqin(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/ketangdetails/ketangdetails?id=' + e.currentTarget.dataset.id,
    })

  }
  seemore(e) {

    wx.showLoading({
      title: '加载中...'
    })

    var ketang = this.Base.getMyData().ketang;
    var ketanglist = this.Base.getMyData().ketanglist;
    var count = 0;

    console.log(count, "裂了")

    for (var i = ketang.length; i < ketanglist.length; i++) {
      ketang.push(ketanglist[i]);
      count++;

      if (count >= 4) {
        break;
      }
    }


    if (count == 0) {
      wx.hideLoading();
      wx.showToast({
        title: '已经没有了',
        icon: 'none'
      })
    }

    if (count != 0) {
      //console.log("diaoni1");
      setTimeout(() => {
        console.log("llll");
        this.Base.setMyData({
          ketang
        });

        wx.hideLoading()
      }, 500);
    }







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
    var id = this.Base.options.id;
    var jigouapi = new JigouApi();

    jigouapi.courselist({
      jg_id: id
    }, (clist) => {

      var clist = clist.filter((item, idx) => {

        console.log(parseInt(item.isgroup) ,"发广告")  
        return item.isgroup > 0 || item.isgroup_tiyan>0
      })

      console.log(clist, "gg")

      this.Base.setMyData({
        clist,
        pin: 1,
        tanchuang: true,
        catchtouchmove:1
      });

    });

  }
  bindshowtc(e) {
    var id = this.Base.options.id;
    var jigouapi = new JigouApi();
    jigouapi.courselist({
      jg_id: id
    }, (clist) => {
      this.Base.setMyData({
        clist,
        pin: 0,
        tanchuang: true,
        catchtouchmove: 1
      });
    });

  }

  xuan(e) {
    var id = e.currentTarget.id;
    if (id == "A") {
      this.Base.setMyData({
        xuanzhong: 1
      })
    }
    if (id == "B") {
      this.Base.setMyData({
        xuanzhong: 2
      })
    }
  }

  tobuy(e) {
    var id = e.currentTarget.id;
    var ck = this.Base.getMyData().xuanzhong;
    console.log(id + "电费");
    //return;
    //this.Base.getMyData().pin == "1"  

    if (this.Base.getMyData().pin == "1") {
      console.log(id);
      console.log("aaa");
      // return;
      if (ck == 1) {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&type=0' + '&leixin=0',
        })
      }
      if (ck == 2) {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&type=0' + '&leixin=1',
        })
      }
    } else {
      console.log(id);
      console.log("ggg");
      //  return
      if (ck == 1) {
        wx.navigateTo({
          url: '/pages/purchase/purchase?course_id=' + id + '&leixin=0',
        })
      }
      if (ck == 2) {
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
      wx.showToast({
        title: '收藏成功',
      })
      this.Base.setMyData({
        tishi: 1
      });
    }
    if (status == "N") {
      wx.showToast({
        title: '取消收藏',
        icon:''
      })
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

  bindfullscreenchange(e){
    console.log("10000",e)
    if (e.detail.fullScreen==true){
      this.Base.setMyData({ trunoff: true })
    }else{
      this.Base.setMyData({ trunoff: false })
    }
    
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
body.xuan = content.xuan;

body.bindfullscreenchange = content.bindfullscreenchange;

body.seemore = content.seemore;

body.showmore = content.showmore;
body.shouqi = content.shouqi;
body.jia = content.jia;
body.jian = content.jian;
body.kechenxianqin = content.kechenxianqin
Page(body)