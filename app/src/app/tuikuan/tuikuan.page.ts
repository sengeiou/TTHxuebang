import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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

  constructor(public zone:NgZone, public router: Router, 
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
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;

  }

  show = "all";
  wclist = [];
  dflist = [];
  onMyLoad(e=undefined) {
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

  onMyShow(e=undefined) {
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

}
