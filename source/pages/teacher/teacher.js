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
    var that = this;
    
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
    
    if (status == "N") {
      this.Base.setMyData({ show: 1 });
    }
    if (status == "Y") {
      this.Base.setMyData({ show: 2 });
    }
    var totop = this.Base.getMyData().res.totop;
    console.log(totop);
    //return;
    // wx.showToast({
    //   title: '收藏成功',
    //   icon: 'none'
    //   //image: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/tthxb/resource/766e8ff191a9ac7409e308f3c203e824_19040417026.png"
    // })
    var jigouapi = new JigouApi();
    jigouapi.videofav({ video_id: id, status }, (ret) => {
      //this.Base.info(ret.result);
      
      this.Base.setMyData({ teachlist });
      
    });


    setTimeout( ()=> {
        this.Base.setMyData({ show: 0 })
      // clearTimeout(timeoutId);
    }, 1000);


  }
  play(e){
    var id=e.currentTarget.id;
    console.log(id);
    var teachlist = this.Base.getMyData().teachlist;
    for(var i=0;i<teachlist.length;i++){
      if(id!="v_"+teachlist[i].id){
        var videoContext = wx.createVideoContext("v_" + teachlist[i].id);
        videoContext.pause();
      }
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails; 
body.fav = content.fav;
body.play = content.play;
Page(body)