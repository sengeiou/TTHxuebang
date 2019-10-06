import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PurchaseApi } from 'src/providers/purchase.api';
import { WechatApi } from 'src/providers/wechat.api';
import { BatchApi } from 'src/providers/batch.api';

@Component({
  selector: 'app-tuikuan',
  templateUrl: './tuikuan.page.html',
  styleUrls: ['./tuikuan.page.scss'],
  providers: [MemberApi, PurchaseApi, WechatApi, BatchApi]
})
export class TuikuanPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public purchaseApi: PurchaseApi,
    public wechatApi: WechatApi,
    public batchApi: BatchApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  show = "all";
  wclist = [];
  dflist = [];
  onMyLoad() {
    //参数
    this.params;
    var type = this.params.type;
    console.log("那真的牛批" + type);
    if (type != undefined) {
      var show = "";
      if (type == 'ygm') {
        show = 'wc';
      }
      if (type == 'dfk') {
        show = 'wait'
      }
      if (type == 'dsh') {
        show = 'dsh';
      }
      if (type == 'dpj') {
        show = 'dpj';
      }
      console.log("那真的牛批");
      this.show = show;
    }
  }

  onMyShow() {
    var that = this;
    var api = this.purchaseApi;;

    api.purchaselist({
      sppp: 1, pstatus: 'R,F'
    }).then((wclist) => {
      this.wclist = wclist;
    });


    api.purchaselist({
      pstatus: 'W'
    }).then((dflist) => {
      this.dflist = dflist;
    });

  }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "all") {
      this.show = "all";
    }
    if (type == "wc") {
      this.show = "wc";
    }
    if (type == "df") {
      this.show = "wait";
    }
    if (type == "dsh") {
      this.show = "dsh";
    }
    if (type == "dpj") {
      this.show = "dpj";
    }
  }

  bindpay(e) {
    var that = this;
    var id = e.target.id;
    var wechatapi = this.wechatApi;
    wechatapi.prepay({ id: id }).then((payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      //todo
      //wx.requestPayment(payret)
    });
  }
  toorder(e) {
    var that = this;
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/order/order?id=' + id,
    })
  }
  colseorder(e) {
    var that = this;
    var id = e.target.id;

    this.showConfirm("",(ret)=>{
      if(ret){
        var batchapi = this.batchApi;;
        batchapi.closeorder({ id: id }).then((colseorder) => {
          that.onMyShow();
        })
      }
    })


  }
  kantuan(e) {
    this.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.target.dataset.pt,
    })

  }
}
