// pages/kcdetails/kcdetails.js
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
      show: "kcxq"
    })
    
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    //this.Base.options.id
    jigouapi.courseinfo({ id: this.Base.options.id }, (courseinfo) => {
      this.Base.setMyData({ courseinfo });
    });

    jigouapi.checkcanbuy({course_id:this.Base.options.id},(canbuy)=>{

      this.Base.setMyData({ canbuy });
    });

  }
  bindcut(e){
   var type=e.currentTarget.dataset.type;
    console.log(type);

    if(type=="kcxq"){
     this.Base.setMyData({
       show:"kcxq"
     })
    }
    if (type == "gmxz") {
      this.Base.setMyData({
        show: "gmxz"
      })
    }

  }
  bindtopurchase(e){
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.options.id
    })
  }

  



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcut = content.bindcut;
body.bindtopurchase = content.bindtopurchase;

Page(body)