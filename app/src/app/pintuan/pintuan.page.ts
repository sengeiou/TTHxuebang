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
  selector: 'app-pintuan',
  templateUrl: './pintuan.page.html',
  styleUrls: ['./pintuan.page.scss'],
  providers: [MemberApi,PurchaseApi,WechatApi,BatchApi]
})
export class PintuanPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public purchaseApi: PurchaseApi,
    public batchApi: BatchApi,
    public wechatApi: WechatApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  show="all";
  wclist= [];
  dflist= [];
  onMyLoad() {
    //参数
    this.params;
    var type = this.params.type;
    console.log("那真的牛批" + type);
    if (type != undefined) {
      if (type == 'ygm') {
        var show = 'wc';
      }
      if (type == 'dfk') {
        var show = 'wait'
      }
      if (type == 'dsh') {
        var show = 'dsh';
      }
      if (type == 'dpj') {
        var show = 'dpj';
      }
      console.log("那真的牛批");
      this.show=show;
    }


  }
  kechenxianqin(e) {

    this.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.target.dataset.id,
    })

  }
  alllist=[];
  onMyShow() {
    var that = this;
    var api = this.purchaseApi;;

    api.purchaselist({
      sppp: 1
    }).then((alllist) => {
      this.alllist=alllist;
    });

    api.purchaselist({
      pstatus: 'PT', sppp: 1
    }).then((wclist) => {
      this.wclist=wclist;
    });

    api.purchaselist({
      pstatus: 'W'
    }).then((dflist) => {
      this.dflist=dflist;
    });

  }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    this.show=type;
  }

  bindpay(e) {
    var that = this;
    var id = e.target.id;
    var wechatapi = this.wechatApi;
    wechatapi.prepay({ id: id }).then((payret) => {
      //todo
      // payret.complete = function (e) {
      //   that.onMyShow();
      // }
      // console.log(payret);
      // wx.requestPayment(payret)
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

    this.showConfirm("确认取消订单？",(ret)=>{
      if(ret){
        var batchapi = this.batchApi;;
        batchapi.closeorder({ id: id }).then((colseorder) => {
          that.onMyShow();
        })
      }
    });



  }
  kantuan(e) {
    this.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.target.dataset.pt,
    })

  }
}
