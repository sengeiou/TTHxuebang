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
    //options.course_id = 15;
    super.onLoad(options);
    this.Base.setMyData({
      usercomment: ""
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    if (this.Base.options.type != undefined) {

      jigouapi.courseinfo({
        id: this.Base.options.course_id
      }, (courseinfo) => {
        courseinfo.price = courseinfo.isgroup;


        this.Base.setMyData({
          courseinfo
        });
      });


    }
    else {

      jigouapi.courseinfo({
        id: this.Base.options.course_id
      }, (courseinfo) => {
        this.Base.setMyData({
          courseinfo
        });
      });
    }
  }




  changename(e) {
    this.Base.setMyData({
      name: e.detail.value
    });
  }
  changephone(e) {
    this.Base.setMyData({
      phone: e.detail.value
    });
  }
  phonenoCallback(mobile) {
    this.Base.setMyData({ mobile: mobile });
  }

  bindtoorder(e) {
    var api = new JigouApi();
    var that = this;
    var name = this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    if (mobile == "" || mobile == null) {
      this.Base.setMyData({ phone: this.Base.getMyData().phone });
    }
    else {
      this.Base.setMyData({ phone: this.Base.getMyData().mobile });
    }
    var phone = this.Base.getMyData().phone;

    if (name == "" || name == null) {
      this.Base.info("请填写姓名");
      return;
    }

    if (phone == "" || phone == null) {
      this.Base.info("请填写电话");
      return;
    }
    var json1 = {
      course_id: this.Base.options.course_id, phone: phone, name: name
    };
    var json2 = {
      course_id: this.Base.options.course_id, phone: phone, name: name, type: "PT", kt: this.options.type
    }

    if (this.Base.options.type != undefined) {

      if (this.Base.options.type == 0) {

        wx.showModal({
          title: '提示',
          content: '是否确认购买课程？',
          success: (e) => {
            if (e.confirm) {
              var api = new PurchaseApi();
              api.create(json2, (ret) => {
                if (ret.code == '0') {
                  if (ret.return.pstatus == 'P') {
                    wx.navigateTo({
                      url: '/pages/order/order' + ret.return.id,
                    })
                    return;
                  } else {
                    var wechatapi = new WechatApi();
                    wechatapi.prepay2({ id: ret.return.id }, (payret) => {
                      payret.complete = function (e) {


                        if (e.errMsg == "requestPayment:ok") {


                          api.purchaseinfo({ id: ret.return.id }, (res) => {

                            wx.navigateTo({
                              url: '/pages/groupinfo/groupinfo?id=' + res.spellgroup_id,
                            })

                          })

                        }
                        else {

                          wx.navigateTo({
                            url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                          })

                        }

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
      }
      else {

        api.addgroup({ group_course_id: this.options.course_id, id: this.options.type }, (res) => {
          if (res.code == "0") {
            wx.showModal({
              title: '提示',
              content: '是否确认购买课程？',
              success: (e) => {
                if (e.confirm) {
                  var api = new PurchaseApi();
                  api.create(json2, (ret) => {
                    if (ret.code == '0') {
                      if (ret.return.pstatus == 'P') {
                        wx.navigateTo({
                          url: '/pages/order/order' + ret.return.id,
                        })
                        return;
                      } else {
                        var wechatapi = new WechatApi();
                        wechatapi.prepay2({ id: ret.return.id }, (payret) => {

                          payret.complete = function (e) {
                            if (e.errMsg == "requestPayment:ok") {
                              api.purchaseinfo({ id: ret.return.id }, (res) => {

                                wx.navigateTo({
                                  url: '/pages/groupinfo/groupinfo?id=' + res.spellgroup_id,
                                })

                              })
                            }
                            else {
                              wx.navigateTo({
                                url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                              })

                            }

                          }
                          console.log(payret);
                          wx.requestPayment(payret)
                        });
                      }
                    } else {
                      console.log(ret.result);
                      this.Base.info(ret.result);
                    }
                  })
                }
              }
            })

          }
        })

      }


    }

    else {
      wx.showModal({
        title: '提示',
        content: '是否确认购买课程？',
        success: (e) => {
          if (e.confirm) {
            var api = new PurchaseApi();
            api.create(json1, (ret) => {
              if (ret.code == '0') {
                if (ret.return.pstatus == 'P') {

                  wx.navigateTo({
                    url: '/pages/order/order' + ret.return.id,
                  })
                  return;
                } else {
                  var wechatapi = new WechatApi();
                  wechatapi.prepay({ id: ret.return.id }, (payret) => {
                    payret.complete = function (e) {


                      if (e.errMsg == "requestPayment:ok") {


                        api.purchaseinfo({ id: that.Base.getMyData().id }, (res) => {

                          wx.navigateTo({
                            url: '/pages/groupinfo/groupinfo?id=' + res.spellgroup_id,
                          })

                        })

                      }
                      else {

                        wx.navigateTo({
                          url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                        })

                      }

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
    }



  }





}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindtoorder = content.bindtoorder;
body.changephone = content.changephone;
body.changename = content.changename;
Page(body)