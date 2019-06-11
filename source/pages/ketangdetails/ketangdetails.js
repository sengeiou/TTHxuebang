// pages/ketangdetails/ketangdetails.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

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
    var jigouapi = new JigouApi();
    jigouapi.zaixiankecheninfo({id:this.Base.options.id},(kecheninfo)=>{
    this.Base.setMyData({
      kecheninfo:kecheninfo
    })

    })


    jigouapi.kechenzhanjie({ classroom_id: this.Base.options.id }, (zhanjie) => {
      zhanjie[0].dq = true;
      this.Base.setMyData({ danqianzhanjie: zhanjie[0]});
      this.Base.setMyData({ zhanjie: zhanjie });
    })


  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
Page(body)