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
    this.Base.setMyData({ liebiao:false});
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    jigouapi.zaixiankecheninfo({ id: this.Base.options.id }, (kecheninfo) => {
      this.Base.setMyData({
        kecheninfo: kecheninfo, isfav: kecheninfo.isfav
      })

    })


    jigouapi.kechenzhanjie({ classroom_id: this.Base.options.id }, (zhanjie) => {
      zhanjie[0].dq = true;
      this.Base.setMyData({ danqianzhanjie: zhanjie[0] });
      this.Base.setMyData({ zhanjie: zhanjie });
    })


  }
  qiehuanzhanjie(e) {
    var mulu = this.Base.getMyData().zhanjie;
    for (var i = 0; i < mulu.length; i++) {
      if (i == e.currentTarget.dataset.id) {
        mulu[i].dq = true;
      }
      else {
        mulu[i].dq = false;

      }
    }
    this.Base.setMyData({ zhanjie: mulu, danqianzhanjie: mulu[e.currentTarget.dataset.id],liebiao:false });
    console.log(e);
  }
  fav(e) {

    var status = e.currentTarget.id;



    if (status == "Y") {
      this.Base.setMyData({ tishi: 1 });
    }
    if (status == "N") {
      this.Base.setMyData({ tishi: 2 });
    }



    var jigouapi = new JigouApi();
    jigouapi.zaixiankechenshoucan({
      onlineclassroom_id: this.Base.options.id,
      status
    }, (ret) => {
      console.log(ret);
      //this.Base.info(ret.result);
      this.Base.setMyData({
        isfav: status
      });
    });

    setTimeout(() => {
      this.Base.setMyData({ tishi: 0 })
      // clearTimeout(timeoutId);
    }, 1000);




  }
  jindu(e)
  {
    console.log("监控");
    console.log(e);
    if (e.detail.currentTime >= this.Base.getMyData().danqianzhanjie.proved_date)
    {
      console.log(this.Base.getMyData().danqianzhanjie.proved_date);
      var shipin = wx.createVideoContext("v_1");
      
      shipin.seek(this.Base.getMyData().danqianzhanjie.proved_date);
      this.Base.setMyData({chaoshi:true});
      shipin.pause();
    }
    else
    {
      if (this.Base.getMyData().chaoshi)
      {
        this.Base.setMyData({ chaoshi: false });
      }


    }
  }
  chakanliebiao()
  {
    this.Base.setMyData({liebiao:true});
  }
  guanbiliebiao(){
    this.Base.setMyData({liebiao:false});
  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qiehuanzhanjie = content.qiehuanzhanjie;
body.bindcheck = content.bindcheck;
body.fav = content.fav;
body.jindu = content.jindu;
body.chakanliebiao = content.chakanliebiao;
body.guanbiliebiao = content.guanbiliebiao;
Page(body)