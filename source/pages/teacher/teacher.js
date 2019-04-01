import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { TeacherApi } from "../../apis/teacher.api.js";

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
    var teacherapi = new TeacherApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    teacherapi.teachlist({orderby:'r_main.id'}, (teachlist) => {
      this.Base.setMyData({ teachlist });
    });
  }
  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }

  fav(e) {
    var id = e.currentTarget.id;
    console.log(id);
    id=id.split("_");
    var status=id[1];
    id=id[0];
    var teachlist = this.Base.getMyData().teachlist;
    for(var i=0;i<teachlist.length;i++){
      if(teachlist[i].id==id){
        teachlist[i].isfav=status;
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
body.fav = content.fav;
Page(body)