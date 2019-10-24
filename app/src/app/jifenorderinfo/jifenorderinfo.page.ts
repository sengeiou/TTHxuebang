import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-jifenorderinfo',
  templateUrl: './jifenorderinfo.page.html',
  styleUrls: ['./jifenorderinfo.page.scss'],
  providers: [MemberApi, JifenApi]
})
export class JifenorderinfoPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jifenApi: JifenApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.info = {};
  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  info = null;
  onMyShow(e=undefined) {
    var that = this;
    var jifenapi = this.jifenApi;
    jifenapi.jifenorderinfo({ id: this.params.id }).then((info) => {
      this.info = info;
    })
  }
  towuliu(e=undefined) {
    var id = this.info.id;
    this.navigate("wuliu", { id });
  }
  shouhuo = null;
  shouhuoclick(id) {
    var that = this;
    var jifenapi = this.jifenApi;

    this.showConfirm("确认收货？", (ret) => {
      if (ret) {
        jifenapi.shouhuo({ id: id }).then((shouhuo) => {
          that.shouhuo = shouhuo;
          that.toast("确认收货成功");
          that.onMyShow();
        })
      }
    })
  }
}
