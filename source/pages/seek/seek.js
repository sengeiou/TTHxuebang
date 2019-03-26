// pages/seek/seek.js
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
    this.Base.setMyData({
      type: this.options.type,
      //type: "kc",
      show:"jx",
      options:"j_x",
      options_show: false
    })
  //  console.log(this.options.type);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var show=this.Base.getMyData().show;
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    if(show=='jx'){
      jigouapi.jglist({ id: 1 }, (jglist) => {
        this.Base.setMyData({ jglist });
      });
    }

    jigouapi.courselist({ }, (courselist) => {
      this.Base.setMyData({ courselist });
    });
    
  }
  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  
  bindshow(e){
    var type=e.currentTarget.dataset.type;
    console.log(type);
    if(type=="jx"){
      this.Base.setMyData({ show: "jx" })
      var jigouapi = new JigouApi();
       jigouapi.jglist({  }, (jglist) => {
         this.Base.setMyData({ jglist });
       });
    }
    if (type == "xs") {
      this.Base.setMyData({ show: "xs" })
      var jigouapi = new JigouApi();
      jigouapi.jglist({ jigou: "测试机构二" }, (jglist) => {
        this.Base.setMyData({ jglist });
      });

    }
    if (type == "hp") {
      this.Base.setMyData({ show: "hp" })
      var jigouapi = new JigouApi();
      jigouapi.jglist({ jigou: "测试机构一" }, (jglist) => {
        this.Base.setMyData({ jglist });
      });
    }

  }

  bindxuanxiang(e){
    var options = e.currentTarget.dataset.options;
    console.log(options);
    if (options == "j_x") {
      this.Base.setMyData({ options: "j_x" })
      
      
    }
    if (options == "x_s") {
      this.Base.setMyData({ options: "x_s" })
     

    }
    if (options == "bm_za") {
      this.Base.setMyData({ options: "bm_za" })


    }
    if (options == "h_p") {
      this.Base.setMyData({ options: "h_p" })
      
    }
  }

  bindScreening(e){
    var qd = e.currentTarget.dataset.qd;
    if (qd=="ok"){
      this.Base.setMyData({  options_show: false })
    }
    else{
      this.Base.setMyData({ options: "s_x", options_show: true })
    }
    
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindxuanxiang = content.bindxuanxiang;

body.bindScreening = content.bindScreening;
body.bindshow = content.bindshow;
Page(body)