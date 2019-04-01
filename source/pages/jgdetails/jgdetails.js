// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({})

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var img=new array();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    
    jigouapi.jginfo({id:this.options.id}, (jginfo) => {
      

      
      //console.log(jginfo.jg_img);
      //return;
      img[0] = jginfo.jg_img;
      img[1] = jginfo.waitimg;
      //jginfo.jg_img.push(img);

      this.Base.setMyData({ img });
      jigouapi.courselist({ jg_id: jginfo.id }, (courselist) => {
        this.Base.setMyData({ courselist: courselist});
      });

     
      
      
    }); 

  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tokcdetails = content.tokcdetails;

Page(body)