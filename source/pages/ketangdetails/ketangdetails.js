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
    this.Base.setMyData({ liebiao: false, quanbu: false,pinlun:'' });
    this.Base.shipin = wx.createVideoContext("v_1");
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    jigouapi.zaixiankecheninfo({ id: this.Base.options.id }, (kecheninfo) => {
      var pinjunjia = kecheninfo.price / kecheninfo.chapter_num;
      this.Base.setMyData({
        kecheninfo: kecheninfo, isfav: kecheninfo.isfav, pinjunjia: pinjunjia.toFixed(2)
      })
    })
    jigouapi.ketanpinlunlist({ onlineclassroom_id: this.Base.options.id }, (ketanpinlunlist) => {
      this.Base.setMyData({

        ketanpinlunlist: ketanpinlunlist
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
    this.Base.setMyData({ zhanjie: mulu, danqianzhanjie: mulu[e.currentTarget.dataset.id], liebiao: false });
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
  shipin = null;


  jindu(e) {
    var idd = this.Base.getMyData().kecheninfo.idd;
    var mianfei = this.Base.getMyData().kecheninfo.isfree_value;
    if (idd != '' || mianfei == 'Y') {
      return;
    }

    console.log("进来了1");

    // console.log(this.Base.getMyData().danqianzhanjie.proved_date);
    var a = Number(this.Base.getMyData().danqianzhanjie.proved_date);
    if (e.detail.currentTime >= a) {
      console.log("进来了2")
      console.log(this.Base.getMyData().danqianzhanjie.proved_date);


      this.Base.shipin.pause();
      if (e.detail.currentTime >= a + 1) {
        this.Base.shipin.seek(a);
      }

      if (!this.Base.getMyData().chaoshi) {

        this.Base.setMyData({ chaoshi: true });


      }
    }
    else {
      if (this.Base.getMyData().chaoshi) {
        this.Base.setMyData({ chaoshi: false });
      }


    }
  }
  chakanliebiao() {
    this.Base.setMyData({ liebiao: true });
  }
  chakanquanbu() {
    this.Base.setMyData({ quanbu: true });
  }
  guanbiquanbu() {
    this.Base.setMyData({ quanbu: false });
  }
  guanbiliebiao() {
    this.Base.setMyData({ liebiao: false });
  }
  shikan() {
    this.Base.backtotop();
    this.Base.shipin.play();

  }
  goumai() {
    wx.navigateTo({
      url: '/pages/shipingoumai/shipingoumai?id=' + this.Base.getMyData().kecheninfo.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  }
  shuru(e)
  {
    this.Base.setMyData({ pinlun: e.detail.value})
   
  }
  fabiao(){
    var that=this;
    var api=new JigouApi();
    if (this.Base.getMyData().kecheninfo.idd != '' || this.Base.getMyData().kecheninfo.isfree_value=='Y')
    {
      var pinlun=this.Base.getMyData().pinlun;
      if(pinlun=='')
      {
        this.Base.info("至少说点什么才可以发送哦");
        return
      }
      api.ketanpinlun({ onlineclassroom_id: this.Base.options.id, neiron: pinlun},(res)=>{
       
        
         
        api.ketanpinlunlist({ onlineclassroom_id: this.Base.options.id }, (ketanpinlunlist) => {
          that.Base.setMyData({
            ketanpinlunlist: ketanpinlunlist,pinlun:''
          })
        })    
      })    
       

    }
    else{
      this.Base.info("购买此专栏后才能进行评论哦！");
    }
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
body.shikan = content.shikan;
body.chakanliebiao = content.chakanliebiao;
body.guanbiliebiao = content.guanbiliebiao;
body.chakanquanbu = content.chakanquanbu;
body.guanbiquanbu = content.guanbiquanbu;
body.goumai = content.goumai;
body.fabiao = content.fabiao;
body.shuru = content.shuru;
Page(body)