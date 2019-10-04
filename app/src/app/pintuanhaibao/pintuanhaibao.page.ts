import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-pintuanhaibao',
  templateUrl: './pintuanhaibao.page.html',
  styleUrls: ['./pintuanhaibao.page.scss'],
  providers: [MemberApi]
})
export class PintuanhaibaoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  lujin = "";
  bg = "";
  erweima = "";
  onMyLoad() {
    //参数
    this.params;
    this.lujin = ApiConfig.getUploadPath() + this.params.name;
    this.lujin = ApiConfig.getUploadPath() + "resource/613db08f9d08ea17b8c68db38314ecee_19070419047_1556147856.png";

    this.erweima = ApiConfig.getApiUrl() + "inst/qrcode?inst_id=1&url=/pages/groupinfo/groupinfo?%26id=" + this.params.id
  }
  onMyShow() {
    var that = this;
  }
  baocun(e) {
    if (e.target.dataset.id == 'erweima') {
      window.open(this.erweima + '.png');
    }
    else {
      window.open(this.lujin);
    }
  }
}
