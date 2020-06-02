import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-yaoqinhaibao',
  templateUrl: './yaoqinhaibao.page.html',
  styleUrls: ['./yaoqinhaibao.page.scss'],
  providers: [MemberApi]
})
export class YaoqinhaibaoPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  lujin = "";
  erweima = "";
  onMyShow(e=undefined) {
    var that = this;
    if (this.params.id != undefined) {
      var yaoqinren = this.params.id;
      if (yaoqinren != this.MemberInfo.id) {
        return
      }

    }

    
    this.lujin = "https://tthxb2.artxb.cn/Users/upload/tthxb/" + this.params.name;

    console.log(this.lujin);
    this.erweima = ApiConfig.getApiUrl() + "inst/qrcode?inst_id=1&url=/pages/home/home?id=" + this.MemberInfo.id;
  }
  baocun(e=undefined) {
    
  }
  // onShareAppMessage(e) {
  //   return {

  //     title: this.InstInfo.zhuanfatishi,

  //     desc: '分享页面的内容',

  //     path: '/pages/home/home?id=' + this.MemberInfo.id

  //   }

  // }
}
