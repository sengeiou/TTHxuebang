import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-shopmalldetail',
  templateUrl: './shopmalldetail.page.html',
  styleUrls: ['./shopmalldetail.page.scss'],
  providers: [MemberApi, JifenApi]
})
export class ShopmalldetailPage extends AppBase {

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
    this.info = {};
  }

  show = 0;
  shuliang = 1;
  sl = 1;
  info = null;
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  onMyShow(e=undefined) {
    var that = this;
    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({ id: this.params.id }).then((info) => {
      this.info = info;
    })

  }
  toshouzhi(e) {
    this.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }
  jia(e) {
    var shuliang = this.shuliang;
    shuliang++
    this.shuliang = shuliang;
  }
  jian(e) {
    var shuliang = this.shuliang;
    shuliang--
    if (shuliang <= 0) {
      this.toast("至少兑换一个");
      return;
    }
    this.shuliang = shuliang;
  }

  toduihuan(e) {
    this.show = 1;

  }
  close(e) {
    this.show = 0;
  }
  next(e) {
    var inventory = e.target.id;
    var interral = e.target.dataset.jifen;
    var shuliang = this.shuliang;
    var img = e.target.dataset.img;
    var name = e.target.dataset.name;
    console.log(inventory - 1 + "库存");
    console.log(interral + "积分");
    //return;
    if (inventory <= 0 || inventory < shuliang) {
      this.toast("库存不足，无法兑换");
      return;
    }


    this.navigateTo({
      url: '/pages/xuanzedizhi/xuanzedizhi?inventory=' + inventory + '&interral=' + interral + '&id=' + this.params.id + '&img=' + img + '&name=' + name + '&shuliang=' + shuliang
    })

  }

}
