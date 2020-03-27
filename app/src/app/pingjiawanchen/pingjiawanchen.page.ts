import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-pingjiawanchen',
  templateUrl: './pingjiawanchen.page.html',
  styleUrls: ['./pingjiawanchen.page.scss'],
  providers: [MemberApi]
})
export class PingjiawanchenPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  onMyShow(e=undefined) {
    var that = this;
  }
  pinjiagenduo(e) {

    this.navigateTo({
      url: '/pages/myorder/myorder?type=dpj',
    })

  }
}
