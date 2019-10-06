import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-wuliu',
  templateUrl: './wuliu.page.html',
  styleUrls: ['./wuliu.page.scss'],
  providers: [MemberApi, JifenApi]
})
export class WuliuPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jifenApi: JifenApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
    this.wuliu = {};
  }
  wuliu = null;
  wllist = [];
  info = null;
  onMyShow() {
    var that = this;
    var jifenapi = this.jifenApi;;

    jifenapi.jifenorderinfo({ id: this.params.id }).then((info) => {

      jifenapi.wuliu({ type: info.wuliu_company_type, no: info.airwaybill }).then((wuliu) => {
        var wuliulist = wuliu.result.list;
        var wllist = [];

        for (var i = wuliulist.length - 1; i >= 0; i--) {
          wllist.push(wuliulist[i]);
        }
        this.wuliu = wuliu;
        this.wllist = wllist;
      })
      this.info = info;


    })


  }



}
