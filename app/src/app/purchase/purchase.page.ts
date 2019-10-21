import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PurchaseApi } from 'src/providers/purchase.api';
import { WechatApi } from 'src/providers/wechat.api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
  providers: [MemberApi,InstApi,JigouApi,PurchaseApi,WechatApi]
})
export class PurchasePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi:InstApi,
    public jigouApi:JigouApi,
    public purchaseApi:PurchaseApi,
    public wechatApi:WechatApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  usercomment = "";
  xuanzexueyuan = '';
  zhifuzhon = false;
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  courseinfo=null;
  xueyuanlist=[];
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.instApi;
    var jigouapi = this.jigouApi;
    console.log(this.params)
    if (this.params.type != undefined) {
      this.courseinfo=[]

      jigouapi.courseinfo({
        id: this.params.course_id
      }).then((courseinfo) => {
        console.log(courseinfo,'kkkkk')
        if (this.params.leixin == 0) {
          courseinfo.price = courseinfo.isgroup;
        }
        else {
          courseinfo.price = courseinfo.isgroup_tiyan;
        }

        this.courseinfo.push(courseinfo);
      });


    }
    else {
      this.courseinfo=[]

      jigouapi.courseinfo({
        id: this.params.course_id
      }).then((courseinfo) => {
        console.log(courseinfo,'啊啊啊啊啊')

        if (this.params.leixin == 0) {
          console.log("里")

        }
        else {
          console.log("发")
          courseinfo.price = courseinfo.expeprice;
        }

        this.courseinfo.push(courseinfo);
    console.log(this.courseinfo,'pppppp')

      });

    }
    var nian = new Date();
    var year = nian.getFullYear();
    jigouapi.xueyuanlist({}).then((xueyuan) => {
      xueyuan.map((item) => {
        console.log(Number(item.shengri.substring(0, 4)));
        console.log(Number(year))
        item.sui = Number(year) - Number(item.shengri.substring(0, 4)) + 1;

      })
      this.xueyuanlist=xueyuan;
    })
  }
  bindtoorder(e) {
    var that = this;
    var xueyuan = this.xuanzexueyuan;

    if (this.zhifuzhon) {

      return

    }

    if (xueyuan == "") {
      this.showAlert("请选择学员");
      return;
    }
    this.zhifuzhon=true;

    var name = xueyuan.name;
    var phone = xueyuan.shouji;
    var diqu = xueyuan.dizhi;
    var age = xueyuan.sui;
    var sex = xueyuan.sex == 'sex' ? '男' : '女';
    var json1 = {
      course_id: this.params.course_id, phone: phone, name: name, jiage: this.courseinfo.price, isexperience: this.params.leixin == 1 ? 'Y' : 'N', diqu: diqu, age: age, sex: sex
    };
    var json2 = {
      course_id: this.params.course_id, phone: phone, name: name, type: "PT", kt: this.options.type, jiage: this.courseinfo.price, isexperience: this.params.leixin == 1 ? 'Y' : 'N', diqu: diqu, age: age, sex: sex
    }

    if (this.params.type != undefined) {
      console.log(123123);

      if (this.params.type == 0) {



        var api = this.purchaseApi;
        api.create(json2).then( (ret) => {
          if (ret.code == '0') {
            if (ret.return.pstatus == 'P') {

              this.navigateTo({
                url: '/pages/order/order' + ret.return.id,
              })


              return;
            } else {
              var wechatapi = this.wechatApi;
              wechatapi.prepay2({ id: ret.return.id }).then((payret) => {
                payret.complete = function (e) {


                  if (e.errMsg == "requestPayment:ok") {


                    api.purchaseinfo({ id: ret.return.id }).then((res) => {

                      this.navigateTo({
                        url: '/pages/groupinfo/groupinfo?id=' + res.spellgroup_id,
                      })

                    })

                  }
                  else {

                    this.navigateTo({
                      url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                    })

                  }

                }
                console.log(payret);
                //todo
                //wx.requestPayment(payret)
              });
            }
          } else {
            console.log(3);
            this.showAlert(ret.result);
            this.zhifuzhon=false;
          }
        })
      }



      else {

        var api2 = this.jigouApi;
        api2.addgroup({ group_course_id: this.options.course_id, id: this.options.type }).then((res) => {
          console.log("哈哈哈");
          console.log(res);
          if (res.code == "0") {



            var api3 = this.purchaseApi;;
            api3.create(json2).then( (ret) => {
              if (ret.code == '0') {
                if (ret.return.pstatus == 'P') {
                  this.navigateTo({
                    url: '/pages/order/order' + ret.return.id,
                  })
                  return;
                } else {
                  var wechatapi = this.wechatApi;
                  wechatapi.prepay2({ id: ret.return.id }).then((payret) => {

                    payret.complete = function (e) {
                      if (e.errMsg == "requestPayment:ok") {
                        api.purchaseinfo({ id: ret.return.id }).then((res) => {

                          this.navigateTo({
                            url: '/pages/groupinfo/groupinfo?id=' + res.spellgroup_id,
                          })

                        })
                      }
                      else {
                        this.navigateTo({
                          url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                        })

                      }

                    }
                    console.log(payret);
                    //todo
                    //wx.requestPayment(payret)
                  });
                }
              } else {
                console.log(ret.result);
                console.log(1);
                this.showAlert(ret.result);
                this.zhifuzhon=false;
              }
            })




          }
        })

      }


    }

    else {

      console.log(456456);


      var api4 = this.purchaseApi;;
      api4.create(json1).then((ret) => {
        if (ret.code == '0') {
          if (ret.return.pstatus == 'P') {

            this.navigateTo({
              url: '/pages/order/order' + ret.return.id,
            })
            return;
          } else {
            var wechatapi = this.wechatApi;
            wechatapi.prepay({ id: ret.return.id }).then((payret) => {
              payret.complete = function (e) {


                if (e.errMsg == "requestPayment:ok") {

                  //迷that.id
                  api.purchaseinfo({ id: 0 }).then((res) => {

                    this.navigateTo({
                      url: '/pages/order/order?id=' + ret.return.id,
                    })

                  })

                }
                else {

                  this.navigateTo({
                    url: '/pages/order/order?id=' + ret.return.id,
                  })

                }

              }
              console.log(payret);
              //todo
              //wx.requestPayment(payret)
            });
          }
        } else {
          console.log(2);
          console.log(ret);
          this.showAlert(ret.result);
          this.zhifuzhon=false;
        }
      })


    }



  }
  isxueyuan;
  xueyuan(e=undefined) {
    this.isxueyuan=true;
  }
  hideModal(e=undefined) {
    this.isxueyuan=false;
  }
  xuanze(idx) {
    var xueyuanlist = this.xueyuanlist;
    this.xuanzexueyuan=xueyuanlist[idx];
    this.hideModal();
  }
  xianqin(id) {

    this.navigateTo({
      url: '/studentinfo/studentinfo?id=' + id,
    })
  }
  tianjia(e=undefined) {
    this.navigateTo({
      url: '/studentinfo/studentinfo',
    })

  }
}
