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
  selector: 'app-jifenshouzhi',
  templateUrl: './jifenshouzhi.page.html',
  styleUrls: ['./jifenshouzhi.page.scss'],
  providers: [MemberApi, JifenApi]
})
export class JifenshouzhiPage extends AppBase {

  constructor(public router: Router,
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

  }
  show = 1;
  onMyLoad() {
    //参数
    this.params;
  }
  jilulist = [];
  shousum = 0;
  zhisum = 0;

  onMyShow() {
    var that = this;
    var jifenapi = this.jifenApi;
    var shousum = 0;
    var zhisum = 0
    jifenapi.jilulist({ member_id: this.MemberInfo.id }).then((jilulist) => {

      for (var i = 0; i < jilulist.length; i++) {
        if (jilulist[i].jifen < 0) {
          jilulist[i].type = 'A';
          jilulist[i].created_date = AppUtil.Updatetime(jilulist[i].created_date.replace(/-/g, '/'))
          zhisum += parseInt(jilulist[i].jifen);
        }
        if (jilulist[i].jifen > 0) {
          jilulist[i].type = 'B';
          jilulist[i].created_date = AppUtil.Updatetime(jilulist[i].created_date.replace(/-/g, '/'))
          shousum += parseInt(jilulist[i].jifen);
        }
      }
      this.jilulist = jilulist;
      this.shousum = shousum;
      this.zhisum = zhisum;
    })
  }
  xuanze(e) {
    var type = e.target.id;
    console.log(type);
    if (type == "shouru") {
      this.show = 1;
    }
    if (type == "zhichu") {
      this.show = 2;
    }
  }
}
