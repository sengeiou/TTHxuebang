// pages/pingcejieguo/pingcejieguo.js 
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
  PingceApi
} from "../../apis/pingce.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      check: true
    });
    var typeA = this.options.typeA;
    var typeB = this.options.typeB;
    var typeC = this.options.typeC;
    var typeD = this.options.typeD;
    console.log(typeA, typeB, typeC, typeD)
    if (typeA!="undefined"){
      this.Base.setMyData({ typeA:"A"})
    }
    if (typeB != "undefined") {
      this.Base.setMyData({ typeB: "B" })
    }
    if (typeC != "undefined") {
      this.Base.setMyData({ typeC: "C" })
    }
    if (typeD != "undefined") {
      this.Base.setMyData({ typeD: "D" })
    }
  }
  onMyShow() {
     
    var that = this;
    var pingceapi = new PingceApi();

    pingceapi.pingcejieguo({}, (pingcejieguo) => {
      this.Base.setMyData({
        pingcejieguo
      });
    });

  }

  check(e) {
    var ck = e.currentTarget.dataset.ck;
    console.log(ck);
    if (ck == "nm") {
      this.Base.setMyData({
        check: false
      })
    } else {
      this.Base.setMyData({
        check: true
      })
    }
  }
  again(e){
    
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
Page(body)