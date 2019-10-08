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
  selector: 'app-studentmsg',
  templateUrl: './studentmsg.page.html',
  styleUrls: ['./studentmsg.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class StudentmsgPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  xueyuanlist = [];
  onMyShow(e=undefined) {
    var that = this;
    var api = this.jigouApi;;
    var nian = new Date();
    var year = nian.getFullYear();

    api.xueyuanlist({}).then((xueyuan) => {
      xueyuan.map((item) => {
        console.log(Number(item.shengri.substring(0, 4)));
        console.log(Number(year))
        item.sui = Number(year) - Number(item.shengri.substring(0, 4)) + 1;
        item.sj0 = item.shouji.substring(0, 3);
        item.sj1 = item.shouji.substring(3, 7);
        item.sj2 = item.shouji.substring(7, 11);
      })
      this.xueyuanlist = xueyuan;
    })

  }
  studentinfo(e) {

    this.navigateTo({
      url: '/pages/studentinfo/studentinfo?id=' + e.target.dataset.id,
    })
  }
  tianjia(e=undefined) {
    this.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })

  }
}
