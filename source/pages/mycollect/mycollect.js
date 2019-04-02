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
  JigouApi
} from "../../apis/jigou.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import { TeacherApi } from "../../apis/teacher.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "t1",
    })
  }
  onMyShow() {
    var that = this;
    var api = new MemberApi();
    api.favcourselist({
    }, (kclist) => {
      this.Base.setMyData({
        kclist
      });
      });
    api.favjigoulist({
    }, (jglist) => {
      this.Base.setMyData({
        jglist
      });
    });

    api.favvideolist({
    }, (splist) => {
      this.Base.setMyData({
        splist
      });
    });

    var teacherapi = new TeacherApi();
    teacherapi.teachlist({  }, (teachlist) => {
      this.Base.setMyData({ teachlist });
    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    this.Base.setMyData({
      show: type
    })
  }

  fav(e) {
    var id = e.currentTarget.id;
    console.log(id);
    id = id.split("_");
    var status = id[1];
    id = id[0];
    var teachlist = this.Base.getMyData().teachlist;
    for (var i = 0; i < teachlist.length; i++) {
      if (teachlist[i].id == id) {
        teachlist[i].isfav = status;
      }
    }
    var jigouapi = new JigouApi();
    jigouapi.videofav({ video_id: id, status }, (ret) => {
      //this.Base.info(ret.result);
      this.Base.setMyData({ teachlist });
    });
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
body.fav = content.fav;

Page(body)