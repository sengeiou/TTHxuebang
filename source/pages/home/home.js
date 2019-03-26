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
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    jigouapi.jglist({}, (jglist) => {
      this.Base.setMyData({ jglist });
    }); 
  }
  tojgdetails(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
   })
  }
  totake(e){
   var name=e.currentTarget.dataset.name;
   console.log(name);
   if (name=="jg"){
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "jg",
      })
   }
   else{
     wx.navigateTo({
       url: '/pages/seek/seek?type='+"kc",
     })
   }

  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.tojgdetails = content.tojgdetails; 
body.totake = content.totake; 
Page(body)