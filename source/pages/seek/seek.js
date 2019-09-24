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
//
class Content extends AppBase {
  constructor() {
    super();
  }

  courselist = [];
  jglist = [];


  onLoad(options) {
    this.Base.Page = this;
    if (options.keyword != undefined) {
      options.keyword = decodeURI(options.keyword);
    }
    super.onLoad(options);
    //this.options.type="jg";
 
    if (options.type == undefined) {
      options.type = 'kc';
    }


    if (options.ftype_id == undefined) {
      options.ftype_id = "0";
    }

    if (options.fage_id == undefined) {
      options.fage_id = "0";
    }

    if (options.fdistrict_id == undefined) {
      options.fdistrict_id = "0";
    }

    this.Base.setMyData({
      type: options.type,
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
      //type: "kc",
      show: "jx",
      ageid:-1,
      options: "j_x",
      mylat: 0,
      mylng: 0,
      filtercoursetype: [],
      ftype_id: options.ftype_id,
      ttype_id: "0",
      filtercourseage: [],
      fage_id: options.fage_id,
      tage_id: "0",
      filterdistrict: [],
      fdistrict_id: options.fdistrict_id,
      tdistrict_id: "0",
      options_show: false,
      buyshow: [],
      vteach: []
    });

    //  console.log(this.options.type);

    this.setPageTitle(options);

    var jigouapi = new JigouApi();
    jigouapi.gongaolist({
      orderby: " rand() "
    }, (gongaolist) => {

      this.Base.setMyData({
        gongaolist
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
    jigouapi.buyshow({
      limit: '20'
    }, (buyshow) => {

      var lunbolist = [];

      this.Base.setMyData({
        buyshow: buyshow
      });
    });

  }

  setPageTitle(options) {

    console.log(options,"来来来")
     
    var typename = options.typename;
    
    if (options.type == 'kc') {

      //console.log("啦啦啦啦")
      
      var title = typename;
    } 
    if (options.type == 'jg'){
      console.log("换个哈哈哈")
      var  title='找机构 ';
    }

    wx.setNavigationBarTitle({
      title: title
    });
  }


  onUnload() {
    var timerStart = this.Base.getMyData().timerStart;
    clearInterval(timerStart);
  }
  onMyShow() {
    var that = this;

    var jigouapi = new JigouApi();
    var isload = this.Base.getMyData().isload;
    if (isload == true) {
      return;
    }
    this.Base.setMyData({
      isload: true
    });
    wx.showLoading({
      title: '加载中...'
    });

    var type = this.Base.getMyData().type;

    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;


    console.log(show);



    jigouapi.activedistrictlist({
      city_id: AppBase.CITYID
    }, (filterdistrict) => {

      this.Base.setMyData({
        filterdistrict
      });
      //默认搜索罗湖区算了

      // if ((1 == 1 || this.Base.options.type == 'jg') && this.Base.getMyData().fdistrict_id == 0) {
      //   console.log(this.Base.getMyData());
      //   var address = this.Base.getMyData().address;
      //   var adcode = address.ad_info.adcode;
      //   for (var i = 0; i < filterdistrict.length; i++) {
      //     if (adcode == filterdistrict[i].id) {
      //       var fdistrict_id = filterdistrict[i].id;
      //       this.Base.setMyData({
      //         fdistrict_id
      //       });
      //     }
      //   }
      // }
      if (type == "kc") {
        this.loadcourse();
      } else {
        this.loadjg();
      }
    });

    setTimeout(() => {
      wx.hideLoading()
    }, 1000);


  }
  tojgdetails(e) {
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
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
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
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
    //opt.limit="100";

    jigouapi.jglist(opt, (jglist) => {


      var jgvteach = [];
      for (var j = 0; j < jglist.length && j < 5; j++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
        var miletxt = ApiUtil.GetMileTxt(mile);
        jglist[j]["miletxt"] = miletxt;
        jgvteach.push(jglist[j]);
      }
      this.Base.jglist = jglist;
      this.Base.setMyData({
        jgvteach
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
      city_id: AppBase.CITYID,
      orderby: "distance"
    };

    var data = this.Base.getMyData();
    console.log("loadcourse", data);
    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    
    if (data.typeid != "0") {
      opt.type = this.Base.options.typeid;
       
    }
    if (this.Base.options.keyword!=undefined){
      opt.searchkeyword = this.Base.options.keyword;
    }
    

    if (data.ages == 1) {
      opt.ages = data.ages;
      opt.minage = data.minage;
      opt.maxage = data.maxage;
    }

    //opt.type = 1;
    // }
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
      opt.orderby = "people_num desc,distance";
    }
    if (data.options == "h_p") {
      opt.orderby = "scoring desc,distance";
    }

    // opt.limit="100";

    jigouapi.courselist(opt, (courselist) => {
      console.log("提交了哈哈啊");
      console.log(opt);

      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {

        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        var miletxt = ApiUtil.GetMileTxt(mile);
        courselist[i]["miletxt"] = miletxt;
        courselist[i]["zuidijia"] = ApiUtil.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
        vteach.push(courselist[i]);
      }
      this.Base.courselist = courselist;
      this.Base.setMyData({
        vteach
      });

    });
  }



  // onReachBottom() {
  //   console.log("???kk");
  //   var vteach = this.Base.getMyData().vteach;
  //   var courselist = this.Base.getMyData().courselist;

  //   var count = 0;
  //   for (var i = vteach.length; i < courselist.length; i++) {
  //     vteach.push(courselist[i]);
  //     count++;
  //     if (count >= 3) {
  //       break;
  //     }
  //   }

  //   if (count == 0) {
  //     wx.showToast({
  //       title: '已经没有了',
  //       nomore: 1,
  //       icon: 'none'
  //     })
  //   }
  //   else {
  //     setTimeout(() => {
  //       console.log("llll");
  //       this.Base.setMyData({
  //         vteach
  //       });
  //     }, 100);
  //   }
  // }

  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })


    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;

    var jgvteach = this.Base.getMyData().jgvteach;
    var vteach = this.Base.getMyData().vteach;
    var courselist = this.Base.courselist;
    var jglist = this.Base.jglist;
    var count = 0;
    var cs = 0;

    if (this.Base.options.type == "kc") {
      for (var i = vteach.length; i < courselist.length; i++) {

        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        var miletxt = ApiUtil.GetMileTxt(mile);
        courselist[i]["miletxt"] = miletxt;
        courselist[i]["zuidijia"] = ApiUtil.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
        vteach.push(courselist[i]);
        count++;
        if (count >= 7) {
          break;
        }
      }
      console.log(count + "AAA")
      if (count == 0) {
        console.log("diaoni2");
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        })
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.Base.setMyData({
            vteach
          });
          wx.hideLoading()
        }, 500);
      }

    }



    if (this.Base.options.type == "jg") {
      for (var j = jgvteach.length; j < jglist.length; j++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
        var miletxt = ApiUtil.GetMileTxt(mile);
        jglist[j]["miletxt"] = miletxt;
        jgvteach.push(jglist[j]);
        cs++;
        if (cs >= 4) {
          break;
        }
      }
      if (cs == 0) {
        console.log("diaoni2");
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        });
      }
      if (cs != 0) {
        setTimeout(() => {
          console.log("llll");
          console.log("diaoni1");
          this.Base.setMyData({
            jgvteach
          });
          wx.hideLoading()
        }, 500);
      }
    }

    console.log("diaoni3");


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
        // options: "s_x",
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
    if (seq == -1) {
      this.Base.setMyData({
        fdistrict_id: 0,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    } else {

      var filterdistrict = this.Base.getMyData().filterdistrict;
      this.Base.setMyData({
        fdistrict_id: filterdistrict[seq].id,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    }

    this.backtotop();
    this.loadjg();
    this.loadcourse();

  }


  changeage(e) {
    var seq = parseInt(e.currentTarget.id);

    console.log(seq,"各个")

    var minage=e.currentTarget.dataset.minage;
    var maxage = e.currentTarget.dataset.maxage;

    console.log('最小值' + minage)
    console.log('最大值' + maxage)
    if (seq == -1) {
      this.Base.setMyData({
        ages: 0,
        ageid: seq,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    } else {
 
      this.Base.setMyData({
        ages: 1,
        ageid: seq,
        minage: minage,
        maxage: maxage,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    }

    this.backtotop(); 
    this.loadcourse();

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
    console.log("555555555");
    var id = e.currentTarget.id;
    this.Base.setMyData({
      tage_id: id
    });
  }
  resetFilter() {
    var that = this;



    // var that=this;
    wx.showModal({
      title: '确定',
      content: '确认重置？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {


          var tdistrict_id = that.Base.getMyData().fdistrict_id;
          var ttype_id = that.Base.getMyData().ftype_id;
          var tage_id = that.Base.getMyData().fage_id;

          that.Base.setMyData({
            tdistrict_id: 0,
            ttype_id: 0,
            tage_id: 0
          });



          // // wx.showToast({
          // //   title: '保存成功',
          // //   icon: '',
          // // })
        }
      }
    });




  }


  bindxiala(e) {
    var xiala = this.Base.getMyData().xiala;

    this.Base.setMyData({
      xiala: xiala == "xs" ? "yc" : "xs"
    })

  }

  bindxialakc(e) {
    // var xialakc = this.Base.getMyData().xialakc;

    // this.Base.setMyData({
    //   xialakc: xialakc == "xs" ? "yc" : "xs"
    // })
    var data = this.Base.getMyData();

    var fdistrict_id = e.currentTarget.id;
    


    this.Base.setMyData({
      options_show: false,
      fdistrict_id
    });
    this.loadcourse();
 

  }

  bindxialaage(e) {
    var xialaage = this.Base.getMyData().xialaage;

    this.Base.setMyData({
      xialaage: xialaage == "xs" ? "yc" : "xs"
    })
  }

  yingcang(e) {
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
  }

  catchTouchMove() {
    return false;
  }


  onShareAppMessage() {
    var data = this.Base.getMyData();
    console.log("/pages/seek/seek?type=" + data.type +
      "&ftype_id=" + data.type_id +
      "&fage_id=" + data.fage_id +
      "&fdistrict_id=" + data.fdistrict_id);
    console.log('haha');
    var url = "/pages/seek/seek?type=" + this.Base.options.type +
      "&fage_id=" + data.fage_id +
      "&fdistrict_id=" + data.fdistrict_id +'&typename='+this.Base.options.typename;
    //"&keyword=" + this.Base.options.keyword +
    
    if (this.Base.options.keyword!=undefined){
      url += "&keyword=" + this.Base.options.keyword;
    }
    return {
      path: url
    };
  }





}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onMyLoad = content.onMyLoad;
body.tojgdetails = content.tojgdetails;
body.tokcdetails = content.tokcdetails;
body.bindxuanxiang = content.bindxuanxiang;
body.bindxiala = content.bindxiala;
body.bindxialakc = content.bindxialakc;
body.bindxialaage = content.bindxialaage;
body.yingcang = content.yingcang; 

body.changeage = content.changeage; 

body.bindScreening = content.bindScreening;
body.bindshow = content.bindshow;
body.loadjg = content.loadjg;
body.loadcourse = content.loadcourse;
body.hideFilter = content.hideFilter;
body.resetFilter = content.resetFilter;
body.setTDistrict = content.setTDistrict;
body.setTType = content.setTType;
body.setTAge = content.setTAge; 

body.setPageTitle = content.setPageTitle;

body.changeDistrict = content.changeDistrict;
body.catchTouchMove = content.catchTouchMove;
Page(body)