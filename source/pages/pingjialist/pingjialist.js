// pages/pingjialist/pingjialist.js 
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
    options.id=11;
    super.onLoad(options);
    this.Base.setMyData({
      check: true
    });
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '评论',
    });
  }
  onMyShow() {
    var that = this;
    var pingjiaapi = new PingjiaApi();

    var id=this.Base.options.id;
    console.log(id+"懂得");

    pingjiaapi.pingjialist({ kecheng_id: id}, (pingjialist) => {
      this.Base.setMyData({
        pingjialist
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

  dianzan(e) {
    var that = this;
    var id=e.currentTarget.id;
   // console.log(id,"哈哈");
    var pingjiaapi = new PingjiaApi();
    var memberinfo = this.Base.getMyData().memberinfo;
    var list = this.Base.getMyData().pingjialist;
     
    //return;

    //var expertsfavid = this.Base.getMyData().info.id;
    pingjiaapi.addpinjialike({ pingjia_id: list[id].id,status:'A' }, (ret) => {

      if (ret.return == "deleted") {
        list[id].count--;
        wx.showToast({
          title: '取消点赞',
          icon:'none'
        })
      } else {
        list[id].count++; 
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        })
      }
     // this.Base.setMyData({ pingjialist: list })
     // this.onMyShow();
      pingjiaapi.pingjialist({ kecheng_id: this.Base.options.id }, (pingjialist) => {
        this.Base.setMyData({
          pingjialist
        });
      });

    })

    console.log(list[id].count, "规格") 
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check; 
body.dianzan = content.dianzan; 
Page(body)