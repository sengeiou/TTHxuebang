// pages/search/search.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  TeacherApi
} from "../../apis/teacher.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.new=1;
    super.onLoad(options);
    var json = {
      searchrecomm: ""
    };

    if (this.options.tp == undefined) {
      this.options.tp = "kc";
    }
    //this.options.keyword="%E8%8B%B1%E8%AF%AD";
    this.options.keyword = decodeURI(this.options.keyword);

    this.Base.setMyData({
      keyword: this.options.keyword,
      shows: "finished",
      tp: this.options.tp
    });


    var tp = this.Base.getMyData().tp;
    if (tp == "kc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (tp == "jg") {
      this.Base.setMyData({
        shows: "wait"
      })
    }

    // if (options.new != undefined) {
    //   json.newphone = "N";
    // }
    // var bookapi = new BookApi();


  }

  jglist=[];
  courselist=[];



  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;
    var teacherapi = new TeacherApi();
    var jigouapi = new JigouApi();

    var json = {
      city_id: AppBase.CITYID
    };
    var kc = {
      city_id: AppBase.CITYID
    };
    var video = {
      city_id: AppBase.CITYID
    };
    json.searchkeyword = this.Base.getMyData().keyword;
    kc.searchkeyword = this.Base.getMyData().keyword;
    video.searchkeyword = this.Base.getMyData().keyword;
    console.log(json.searchkeyword + "电风扇");


    var mylat = that.Base.getMyData().mylat;
    var mylng = that.Base.getMyData().mylng;
    json.mylat = mylat;
    json.mylng = mylng;
    json.orderby = "distance";
    json.limit="0,100";
    jigouapi.jglist(json, (jglist) => {
      console.log("jglist", jglist);
      var jgvlist = [];
      for (var i = 0; i < 7 && i < jglist.length; i++) {

        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
    
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log(miletxt);
        console.log("aweq");
        jglist[i]["miletxt"] = miletxt;
        jgvlist.push(jglist[i]);
      }

      this.Base.jglist = jglist;
      this.Base.setMyData({
        jgvlist
      });
      
    });


    kc.mylat = mylat;
    kc.mylng = mylng;
    kc.orderby = "distance";
    kc.limit="0,100";

    jigouapi.courselist(kc, (courselist) => {
      var coursevlist = [];
      for (var i = 0; i < 7 && i < courselist.length; i++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
       
           var miletxt = ApiUtil.GetMileTxt(mile);
           console.log(courselist[i].JG_jigou,miletxt,'mimimii',mile);
           console.log(courselist[i].JG_jigou,mile,"米");
           courselist[i]["miletxt"] = miletxt;
        courselist[i]["zuidijia"] = ApiUtil.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);

        coursevlist.push(courselist[i]);

      }

      this.Base.courselist = courselist;
      this.Base.setMyData({
        coursevlist
      });
    });


    // teacherapi.teachlist(video, (teachlist) => {
    //   this.Base.setMyData({
    //     teachlist
    //   });
    // });


  }



  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }


  //  search(e) {

  //    this.Base.setMyData({ show: 1 });
  //    wx.showLoading({
  //      title: '加载中...',
  //    })

  //      var json = {};
  //      var data = e.detail.value;

  //      this.Base.setMyData({ value: data });

  //    json.searchkeyword = data;

  //    var teacherapi = new TeacherApi();
  //    var jigouapi = new JigouApi();

  //    jigouapi.courselist(json, (courselist) => {
  //      this.Base.setMyData({
  //        courselist
  //      });
  //    });
  //    jigouapi.jglist(json, (jglist) => {
  //      this.Base.setMyData({
  //        jglist
  //      });
  //    });
  //    teacherapi.teachlist(json, (teachlist) => {
  //      this.Base.setMyData({ teachlist });
  //    });



  //     //  var bookapi = new BookApi();
  //     //  bookapi.keywordlist(json, (result) => {
  //     //    this.Base.setMyData({ result });
  //     //   
  //     //  });
  //    wx.hideLoading();

  //  }

  tosearch(e) {
    //  var word = this.Base.getMyData().value;
    //  if (word != null) {
    //    wx.navigateTo({
    //      url: '/pages/searchbook/searchbook?keyword=' + word,
    //    })
    //  }
    wx.navigateBack({

    })
  }

  // todetails(e) {
  //   var name = e.currentTarget.id;
  //   wx.navigateTo({
  //     url: '/pages/searchbook/searchbook?keyword=' + name,
  //   })
  // }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        shows: "wait"
      })
    }
    if (type == "mv") {
      this.Base.setMyData({
        shows: "video"
      })
    }

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

  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })


    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;

    var jgvlist = this.Base.getMyData().jgvlist;
    var coursevlist = this.Base.getMyData().coursevlist;
    var courselist = this.Base.courselist;
    var jglist = this.Base.jglist;
    var count = 0;
    var cs = 0;

    if (this.Base.getMyData().shows == "finished") {
      for (var i = coursevlist.length; i < courselist.length; i++) {
 
        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
       
        var miletxt = ApiUtil.GetMileTxt(mile);
        courselist[i]["miletxt"] = miletxt;
       
        courselist[i]["zuidijia"] = ApiUtil.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);

        coursevlist.push(courselist[i]);
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
            coursevlist
          });
          wx.hideLoading()
        }, 500);
      }

    }

    

    if (this.Base.getMyData().shows == "wait") {
      for (var j = jgvlist.length; j < jglist.length; j++) {
        jgvlist.push(jglist[j]);
        cs++;
        if (cs >= 7) {
          break;
        }
      }
      console.log("diaoni2",cs);
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
            jgvlist
          });
          wx.hideLoading()
        }, 500);
      }
    }

    console.log("diaoni3");


  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.skey = content.skey;
body.search = content.search;
body.tosearch = content.tosearch;
body.todetails = content.todetails;
body.tokcdetails = content.tokcdetails;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
Page(body)