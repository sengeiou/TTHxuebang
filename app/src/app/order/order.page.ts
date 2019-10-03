import { Component, ViewChild } from '@angular/core';
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
import { BatchApi } from 'src/providers/batch.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  providers: [MemberApi, InstApi, JigouApi, PurchaseApi, WechatApi, BatchApi]
})
export class OrderPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public jigouApi: JigouApi,
    public purchaseApi: PurchaseApi,
    public wechatApi: WechatApi,
    public batchApi: BatchApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  show = "finished";
  codeimg = "";
  reminderpay = 0;
  timerid;
  code = "";
  mMinute = "";
  mSecond = "";

  onMyLoad() {
    //参数
    this.params;

    var timerid = setInterval(() => {
      var reminderpay = this.reminderpay;
      if (reminderpay > 0) {
        reminderpay--;
        console.log(reminderpay);

        var mMinute = (reminderpay) / 60;
        var mSecond = (reminderpay) % 60;
        mMinute = AppUtil.ten2(mMinute);
        mSecond = AppUtil.ten2(mSecond);
        this.mMinute = mMinute.toString();
        this.mSecond = mSecond.toString();
        this.reminderpay = reminderpay;

        if (reminderpay <= 0) {
          this.onMyShow();
        }
      }
    }, 1000);
    this.timerid = timerid;
    this.info = {};
    this.courseinfo = {};
  }
  onUnload() {
    var timerid = this.timerid;
    clearInterval(timerid);
  }
  info = null;
  courseinfo = null;
  onMyShow() {
    var that = this;
    var instapi = this.instApi;
    var jigouapi = this.jigouApi;
    var purchaseapi = this.purchaseApi;


    purchaseapi.purchaseinfo({
      id: this.params.id
    }).then((info) => {
      info.jifen = Math.round(info.amount);
      this.info = info;

      var codeimg = ApiConfig.getApiUrl() + 'jigou/qrcode?id=' + info.id + '&a.jpg';
      this.codeimg = codeimg;
      console.log(codeimg + "图片链接");

      //return;
      if (info.pstatus == 'W') {
        var reminderpay = parseInt(info.reminderpay);
        this.reminderpay = reminderpay;
      }


      jigouapi.courseinfo({
        id: info.course_id
      }).then((courseinfo) => {
        this.courseinfo = courseinfo;
      })




    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.show = "finished";
    }
    if (type == "df") {
      this.show = "wait";
    }
  }
  bindback(e) {
    this.back();
  }

  bindpay() {
    var that = this;
    var wechatapi = this.wechatApi;

    var info = this.info;

    if (info.type == 'PT') {
      wechatapi.prepay2({ id: this.params.id }).then((payret) => {
        // payret.complete = function (e) {
        //   that.onMyShow();
        // }
        // console.log(payret);
        // wx.requestPayment(payret)
      });
    }
    else {

      wechatapi.prepay({ id: this.params.id }).then((payret) => {
        // payret.complete = function (e) {
        //   that.onMyShow();
        // }
        // console.log(payret);
        // wx.requestPayment(payret)
      });

    }
  }
  colseorder(e) {
    var that = this;
    var id = e.currentTarget.id;

    this.showConfirm("确认取消订单？", (ret) => {
      if (ret) {
        var batchapi = this.batchApi;
        batchapi.closeorder({ id: id }).then((colseorder) => {

          that.backHome();
        })
      }
    });



  }


  todetails(e) {
    this.navigate("kcdetails", { id: this.courseinfo.id });
  }


  previewImage(e) {
    //todo
    // wx.previewImage({
    //   urls: this.codeimg.split(',')
    //   // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    // })
  }
  erweima=false;
  type="";
  hexiaoma() {
    this.erweima=true;
    this.type='hexiao';
  }
  kefu() {
    this.erweima=true;
    this.type='kefu';
  }
  hideModal() {
    this.erweima=false;
  }
  xiazai() {
    var type = this.type;
    if (type == 'kefu') {
      window.open(this.uploadpath + 'inst/' + this.InstInfo.kefuerweima)
    }
    else {
      window.open(ApiConfig.getApiUrl() + 'jigou/qrcode?id=' + this.info.id + '&a.jpg');
    }



  }
  tohome() {
   this.backHome();


  }
  pinjiagenduo() {
    this.navigate("myorder",{type:"dpj"});
  }
}
