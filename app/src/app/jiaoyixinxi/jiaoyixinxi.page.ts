import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-jiaoyixinxi',
  templateUrl: './jiaoyixinxi.page.html',
  styleUrls: ['./jiaoyixinxi.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class JiaoyixinxiPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.xiaoxi = {};
  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }

  xiaoxi = null;
  onMyShow(e=undefined) {
    var that = this;
    var api = this.jigouApi;
    api.xiaoxiinfo({ id: this.params.id }).then((xiaoxi) => {

      this.xiaoxi = xiaoxi;

    })

  }
  kecheninfo(e=undefined) {
    var xioaoxi = this.xiaoxi;

    console.log(xioaoxi);

    this.navigate("order", { id: this.xiaoxi.order_id });
  }
}
