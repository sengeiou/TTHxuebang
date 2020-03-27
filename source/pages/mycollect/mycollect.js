// pages/myorder/myorder.js 
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
  MemberApi
} from "../../apis/member.api.js";
import {
  TeacherApi
} from "../../apis/teacher.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "t1", mylat: 0,
      mylng: 0,
    })



  }
  onMyShow() {
    var that = this;
    var api = new MemberApi();
    var jigouapi = new JigouApi();


    api.favcourselist({}, (kclist) => {
      this.Base.setMyData({
        kclist
      });
    }); 




    api.favjigoulist({}, (jglist) => {
      this.Base.setMyData({
        jglist
      });
    });

    api.favvideolist({}, (splist) => {
      this.Base.setMyData({
        splist
      });
    }); 

    jigouapi.ketangshoucanglist({}, (ketangshoucanglist) => {
      this.Base.setMyData({
        ketangshoucanglist
      });
    });



    this.Base.getAddress((address) => {
      console.log(address);
      var mylat = address.location.lat;
      var mylng = address.location.lng;
      console.log("mylat");
      
      this.Base.setMyData({
        mylat, mylng
      });

      this.huoqukclist();
      this.huoqujigoulist();
    })

  }

  huoqukclist(){

    var api = new MemberApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID
    };

    console.log("空空空")
    console.log(mylat)
    console.log(mylng)
    console.log(opt)
    console.log("空空空")

    api.favcourselist({}, (kclist) => {

      console.log("的风格和")
      console.log(mylat)
      console.log(mylng)
      console.log(opt)
      console.log("法国和")

      for (var i = 0; i < kclist.length; i++) {

        console.log("离开的时候考虑过");
        var mile = ApiUtil.GetDistance(mylat, mylng, kclist[i].course_lat, kclist[i].course_lng);
        console.log("距离=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("千米=" + miletxt);
        kclist[i]["miletxt"] = miletxt;
        
      }



      this.Base.setMyData({
        kclist
      });

    }); 

  }

  huoqujigoulist(){
    var api = new MemberApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID
    };



    api.favjigoulist({}, (jglist) => {


      for (var i = 0; i < jglist.length; i++) {

        console.log("离开的时候考虑过");
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].jg_lat, jglist[i].jg_lng);
        console.log("距离=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("千米=" + miletxt);
        jglist[i]["miletxt"] = miletxt;

      }

      this.Base.setMyData({
        jglist
      });

    }); 
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    this.Base.setMyData({
      show: type
    })

  }
  bindtishi(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  }

  fav(e) {
    var id = e.currentTarget.id;
    var jigouapi = new JigouApi();
    jigouapi.videofav({
      video_id: id,
      status: "N"
    }, (ret) => {
      //this.Base.info(ret.result);

      var api = new MemberApi();
      api.favvideolist({}, (splist) => {
        this.Base.setMyData({
          splist
        });
      });
    });
  }
  tojgdetails(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id='+id,
    })
  }
  todetails(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/ketangdetails/ketangdetails?id=' + id,
    })
  }


  play(e) {
    var id = e.currentTarget.id;
    id = id.split("_");
    id = id[1];
    console.log("bindplay");
    console.log(id);
    var teachlist = this.Base.getMyData().splist;
    for (var i = 0; i < teachlist.length; i++) {
      if (id != teachlist[i].id) {
        try {

          var videoContext = wx.createVideoContext("v_" + teachlist[i].id);
          videoContext.pause();
        } catch (ex) {

        }
      } else {
        teachlist[i].play = "Y";
        this.Base.setMyData({ splist: teachlist });
        setTimeout(() => {
          console.log("play");
          console.log(id);
          var videoContext = wx.createVideoContext("v_" + id);
          videoContext.play();
          console.log("played");
        }, 500);
      }
    }
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow; 
body.bindtishi = content.bindtishi;
body.fav = content.fav;
body.play = content.play; 
body.huoqukclist = content.huoqukclist;
body.huoqujigoulist = content.huoqujigoulist;
body.todetails = content.todetails;
Page(body)