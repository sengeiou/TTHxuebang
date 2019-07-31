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
      usercomment: "", xuanzexueyuan: '',zhifuzhon:false
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
        if (this.Base.options.leixin == 0) {
          courseinfo.price = courseinfo.isgroup;
        }
        else {
          courseinfo.price = courseinfo.isgroup_tiyan ;
        }

        this.Base.setMyData({
          courseinfo
        });
      });


    }
    else {

      jigouapi.courseinfo({
        id: this.Base.options.course_id
      }, (courseinfo) => {
        if (this.Base.options.leixin == 0) {
          console.log("里")
          
        }
        else {
          console.log("发")
          courseinfo.price = courseinfo.expeprice;
        }
        this.Base.setMyData({
          courseinfo
        });
      });
    }
    var nian = new Date();
    nian = nian.getFullYear();
    jigouapi.xueyuanlist({}, (xueyuan) => {
      xueyuan.map((item) => {
        console.log(Number(item.shengri.substring(0, 4)));
        console.log(Number(nian))
        item.sui = Number(nian) - Number(item.shengri.substring(0, 4)) + 1;

      })
      this.Base.setMyData({ xueyuanlist: xueyuan })
    })
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
    var xueyuan = this.Base.getMyData().xuanzexueyuan;
    
      if(this.Base.getMyData().zhifuzhon)
      {
   
       return

      }

    if (xueyuan == "") {
      this.Base.info("请选择学员");
      return;
    }
     this.Base.setMyData({zhifuzhon:true})

    var name = xueyuan.name;
    var phone = xueyuan.shouji;
    var  diqu=xueyuan.dizhi;
    var age = xueyuan.sui;
    var json1 = {
      course_id: this.Base.options.course_id, phone: phone, name: name, jiage: this.Base.getMyData().courseinfo.price, isexperience: this.Base.options.leixin == 1 ? 'Y' : 'N',diqu:diqu,age:age,
    };
    var json2 = {
      course_id: this.Base.options.course_id, phone: phone, name: name, type: "PT", kt: this.options.type, jiage: this.Base.getMyData().courseinfo.price, isexperience: this.Base.options.leixin == 1 ? 'Y' : 'N', diqu: diqu, age: age,
    }

    if (this.Base.options.type != undefined) {
   console.log(123123);
 
      if (this.Base.options.type == 0) {



        var api = new PurchaseApi();
        api.create(json2, (ret) => {
          if (ret.code == '0') {
            if (ret.return.pstatus == 'P') {
       
       wx.reLaunch({
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
            console.log(3);
            this.Base.info(ret.result);
            this.Base.setMyData({zhifuzhon:false})
          }
        })
      }



      else {

        api.addgroup({ group_course_id: this.options.course_id, id: this.options.type }, (res) => {
          console.log("哈哈哈");
          console.log(res);
          if (res.code == "0") {



            var api = new PurchaseApi();
            api.create(json2, (ret) => {
              if (ret.code == '0') {
                if (ret.return.pstatus == 'P') {
                  wx.reLaunch({
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
                console.log(1);
                this.Base.info(ret.result);
                this.Base.setMyData({ zhifuzhon: false })
              }
            })




          }
        })

      }


    }

    else {

      console.log(456456);
     

      var api = new PurchaseApi();
      api.create(json1, (ret) => {
        if (ret.code == '0') {
          if (ret.return.pstatus == 'P') {

            wx.reLaunch({
              url: '/pages/order/order' + ret.return.id,
            })
            return;
          } else {
            var wechatapi = new WechatApi();
            wechatapi.prepay({ id: ret.return.id }, (payret) => {
              payret.complete = function (e) {


                if (e.errMsg == "requestPayment:ok") {


                  api.purchaseinfo({ id: that.Base.getMyData().id }, (res) => {
     
                    wx.reLaunch({
                      url: '/pages/order/order?id=' + ret.return.id,
                    })

                  })

                }
                else {

                  wx.reLaunch({
                    url: '/pages/order/order?id=' + ret.return.id,
                  })

                }

              }
              console.log(payret);
              wx.requestPayment(payret)
            });
          }
        } else {
          console.log(2);
          console.log(ret);
          this.Base.info(ret.result);
          this.Base.setMyData({ zhifuzhon: false })
        }
      })


    }



  }
  xueyuan() {
    this.Base.setMyData({ isxueyuan: true })
  }
  hideModal() {
    this.Base.setMyData({ isxueyuan: false })
  }
  xuanze(e) {
    var xueyuanlist = this.Base.getMyData().xueyuanlist;

    this.Base.setMyData({ xuanzexueyuan: xueyuanlist[e.currentTarget.dataset.idx] })
    console.log(xueyuanlist[e.currentTarget.dataset.idx]);
    this.hideModal();
  }
  xianqin(e) {

    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo?id=' + e.currentTarget.dataset.id,
    })
  }
  tianjia() {
    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })

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
body.xueyuan = content.xueyuan;
body.hideModal = content.hideModal;
body.xuanze = content.xuanze;
body.tianjia = content.tianjia;
body.xianqin = content.xianqin;
Page(body)