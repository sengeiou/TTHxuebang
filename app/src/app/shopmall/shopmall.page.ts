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
  selector: 'app-shopmall',
  templateUrl: './shopmall.page.html',
  styleUrls: ['./shopmall.page.scss'],
  providers: [MemberApi,JifenApi]
})
export class ShopmallPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jifenApi:JifenApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  kf = 0;
  list=[];
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  onMyShow(e=undefined) {
    var that = this;
    var jifenapi = this.jifenApi;;
    jifenapi.commoditylist({ orderby: 'r_main.seq' }).then((list) => {
      this.list=list;
    })

  }
  ss(e) {
    this.kf=1;
  }
  onUnload(e=undefined) {
    console.log("1321")
  }
  toshouzhi(e) {
    this.onUnload();
    console.log("看来大家");
    this.navigateTo({
      url: '/jifenshouzhi/jifenshouzhi'
    })
  }
  todetails(id) {
    // this.navigateTo({
    //   url: '/shopmalldetail/shopmalldetail?id=' + id,
    // })

    this.router.navigate(['shopmalldetail'],{
      queryParams: {
        id: id
      }
    })
  }

  toorder(e) {
    this.navigateTo({
      url: '/jifenorder/jifenorder'
    })
  }
  showtoset(e) {
    this.toast("暂未开放，敬请期待");
  }
}
