// pages/jifenorderinfo/jifenorderinfo.js
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
  JifenApi
} from "../../apis/jifen.api.js";
import {
  AddressApi
} from "../../apis/address.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '提交订单'
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=2;
    super.onLoad(options);
    this.Base.setMyData({
      address_id: 0,
      shuliang: 1,
      info: {
        price: 0,
        interral: 0
      }
    })
  }

  pay(e) {

    var jifenapi = new JifenApi();

    if (this.Base.getMyData().address_id == 0) {
      this.Base.info("请先选择收货人地址");
      return;
    }

    this.Base.confirm("是否确认支付?", () => {
      var info = this.Base.getMyData().info;
      var addressinfo = this.Base.getMyData().addressinfo;
      var shuliang = this.Base.getMyData().shuliang;
      jifenapi.addjifenorder({
        goods_id: this.Base.options.id,
        member_id: this.Base.getMyData().memberinfo.id,
        payamount: info.price * shuliang,
        danjia: info.price,
        img: info.imgs,
        shuliang: shuliang,
        name: info.name,
        orderstatus: "P",
        paytype: "X",
        consignee: addressinfo.name,
        mobile: addressinfo.phonenumber,
        address: addressinfo.region + addressinfo.address,
        // orderid:'1234567891011',
        status: "A"
      }, (ret) => {
        if (ret.code != 0) {
          this.Base.info(ret.return);
        } else {
          jifenapi.prepay({
            id: ret.return
          }, (payret) => {
            payret.complete = function(e) {
              //that.onMyShow();
              console.log(e);
              //{errMsg: "requestPayment:ok"}
              if (e.errMsg == "requestPayment:ok") {
                wx.redirectTo({
                  url: '/pages/jifenpaysuccess/jifenpaysuccess?paytype=X&id=' + ret.return,
                })
              }
            }
            console.log(payret);
            wx.requestPayment(payret)
          });
        }
      });


    });

  }


  onMyShow() {
    var that = this;
    if (this.Base.getMyData().address_id != 0) {

      var addressapi = new AddressApi();
      addressapi.addressinfo({
        id: this.Base.getMyData().address_id
      }, (info) => {
        this.Base.setMyData({
          addressinfo: info
        })
      })
    }


    var jifenapi = new JifenApi();
    jifenapi.commodityinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      })
    })

  }
  towuliu(e) {

  }
  shouhuo(e) {

  }

  xuanzedizhi(e) {
    wx.navigateTo({
      url: '/pages/xuanzedizhi/xuanzedizhi?selectback=Y'
    })
  }


  jia(e) {
    var shuliang = this.Base.getMyData().shuliang;
    shuliang++
    this.Base.setMyData({
      shuliang
    })
  }
  jian(e) {
    var shuliang = this.Base.getMyData().shuliang;
    if (shuliang > 1) {
      shuliang--;
    }
    this.Base.setMyData({
      shuliang
    })
  }

  duihuan() {
    if (this.Base.getMyData().address_id == 0) {
      this.Base.info("请先选择收货人地址");
      return;
    }
    this.Base.setMyData({
      showduihuanqueren: true
    });
  }
  quxiaoduihuan() {
    this.Base.setMyData({
      showduihuanqueren: false, showerror:false
    });
  }
  qurenduihuan(){
    this.Base.setMyData({
      showduihuanqueren: false, showerror: false
    });
    wx.showLoading();

    var info = this.Base.getMyData().info;
    var addressinfo = this.Base.getMyData().addressinfo;
    var shuliang = this.Base.getMyData().shuliang;

    var jifenapi = new JifenApi();
    jifenapi.addjifenorder({
      goods_id: this.Base.options.id,
      member_id: this.Base.getMyData().memberinfo.id,
      jifen: shuliang * info.interral,
      danjia: info.interral,
      img: info.imgs,
      shuliang: shuliang,
      name: info.name,
      paytype:"B",
      orderstatus: "A",
      consignee: addressinfo.name,
      mobile: addressinfo.phonenumber,
      address: addressinfo.region + addressinfo.address,
      status: "A"
    }, (ret) => {

      wx.hideLoading();
      if(ret.code==0){
        wx.redirectTo({
          url: '/pages/jifenpaysuccess/jifenpaysuccess?paytype=X&id=' + ret.return,
        })
      }else{
        this.Base.setMyData({ errorreturn: ret.return, showerror:true})
      }
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.towuliu = content.towuliu;
body.shouhuo = content.shouhuo;
body.xuanzedizhi = content.xuanzedizhi;
body.jian = content.jian;
body.jia = content.jia;
body.pay = content.pay;
body.duihuan = content.duihuan;
body.quxiaoduihuan = content.quxiaoduihuan;
body.qurenduihuan = content.qurenduihuan;
Page(body)