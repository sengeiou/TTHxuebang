import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-mykehu',
  templateUrl: './mykehu.page.html',
  styleUrls: ['./mykehu.page.scss'],
  providers: [MemberApi]
})
export class MykehuPage extends AppBase {

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
  show = "";
  date = "";
  jintian = "";
  onMyLoad(e=undefined) {
    //参数
    this.params;
    var myDate = new Date();
    var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    this.show = "all";
    this.date = "all";
    this.jintian = jintian;
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    console.log(days);
    return [days < b, b - days];

  }
  quanbu = [];
  xiaji = [];
  onMyShow(e=undefined) {
    var that = this;
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];


    var memberapi = this.memberApi;
    memberapi.chakanxiaji({}).then((xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
        quanbu.push(xiaji[i]);
      }
      this.quanbu = quanbu;
      this.xiaji = xiaji;
    })
  }
  bindshow(e) {
    var type = e.target.dataset.type;
    this.show = type;
  }
  binddate(e, b=undefined) {
    var type = "111";
    if (b == undefined) {
      type = e.target.dataset.val;
    }


    this.date=type;
    var xiaji = this.xiaji;
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];
    if (type == '111') {
      quanbu = xiaji.filter(quanbu => quanbu.bandin_date.substring(0, 10) == b);
      this.quanbu=quanbu;
      youxiao = xiaji.filter(quanbu => quanbu.bandin_date.substring(0, 10) == b);

    }
    if (type == 'all') {
      quanbu = xiaji.filter(quanbu => quanbu);
      this.quanbu=quanbu;

    }
    if (type == "7days") {
      quanbu = xiaji.filter(quanbu => quanbu.jieshushijian > -6);
      this.quanbu=quanbu;

    }
    if (type == "yesterday") {
      quanbu = xiaji.filter(item => item.jieshushijian == 1);
      this.quanbu=quanbu;

    }


  }
  kehuinfo(e) {
    console.log(e);
    console.log(e.target.dataset.id);
    console.log("牛逼");
    this.navigate("kehuinfo",{id:e.target.dataset.id});
  }
  xssj="";
  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + '-' + shijians[1] + '-' + shijians[2]);
    this.binddate(1, xssj)
    this.xssj=xssj;
  }
}
