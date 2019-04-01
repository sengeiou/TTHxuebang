// pages/purchase/purchase.js 
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
  PurchaseApi
} from "../../apis/purchase.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.course_id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      usercomment: ""
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.courseinfo({
      id: this.Base.options.course_id
    }, (courseinfo) => {
      this.Base.setMyData({
        courseinfo
      });
    });
  }
  bindtoorder(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认购买课程？',
      success:(e)=> {
        if (e.confirm) {
          var api = new PurchaseApi();
          api.create({
            course_id: this.Base.options.course_id
          }, (ret) => {
            if (ret.code == '0') {
              if (ret.return.pstatus == 'P') {
                wx.navigateTo({
                  url: '/pages/order/order' + ret.return.id,
                })
                return;
              } else {
                var wechatapi = new WechatApi();
                wechatapi.prepay({id:ret.return.id},(payret)=>{
                  payret.complete = function (e) {
                    wx.redirectTo({
                      url: '/pages/order/order?id='+ret.return.id,
                    })
                  }
                  console.log(payret);
                  wx.requestPayment(payret)
                });
              }
            } else {
              this.Base.info(ret.result);
            }
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/order/order',
    // })
  }

  changeUsercomment(e) {
    this.Base.setMyData({
      usercomment: e.detail.value
    });
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindtoorder = content.bindtoorder;
body.changeUsercomment = content.changeUsercomment;

Page(body)