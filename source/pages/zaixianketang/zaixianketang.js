// pages/zaixianketang/zaixianketang.js 
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
    var that = this;

    var jigouapi = new JigouApi();


    jigouapi.zaixiankechenfenlei({}, (fenleilist) => {

      this.Base.setMyData({ fenleilist: fenleilist, xz: -2, name: "热门课程" });

    })
    jigouapi.zaixianketanlunbo({}, (zaixianlunbo) => {

      this.Base.setMyData({ lunbolist: zaixianlunbo });
    })
    jigouapi.zaixiankechenlist({}, (zaixiankechen) => {
      var remenkechen = zaixiankechen.filter(item => item.ishot_value == 'Y');
      var mianfeikechen = zaixiankechen.filter(item => item.isfree_value == 'Y');
      console.log(remenkechen);
      this.Base.setMyData({ kechenlist: zaixiankechen, remenkechen, mianfeikechen });
    })
  }
  onMyShow() {
  

  }
  switchtype(e){
    var kechenlist = this.Base.getMyData().kechenlist;
   
    var id = e.currentTarget.dataset.id;
       
    this.Base.setMyData({ xzlist: kechenlist.filter(item => item.onlineclassroomtype_id==id)})
    
    this.Base.setMyData({ xz:id, name:e.currentTarget.dataset.name})
  }
  kechenxianqin(e)
  {
  console.log(e);
       wx.navigateTo({
         url: '/pages/ketangdetails/ketangdetails?id='+e.currentTarget.dataset.id,
       })

  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.switchtype = content.switchtype;
body.kechenxianqin = content.kechenxianqin;
Page(body)