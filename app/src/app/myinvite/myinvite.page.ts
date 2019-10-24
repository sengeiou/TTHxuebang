import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-myinvite',
  templateUrl: './myinvite.page.html',
  styleUrls: ['./myinvite.page.scss'],
  providers:[MemberApi]
})
export class MyinvitePage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  date="all";


  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    console.log(days);
    return [days < b, b - days];

  }
  youxiao = [];
  xiaji = [];
  onMyShow(e=undefined) {
    var that = this;
    var quanbu = [];

   
    var memberapi = this.memberApi;
    memberapi.chakanxiaji({}).then((xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
        quanbu.push(xiaji[i]);
      }
      this.youxiao=quanbu;
      this.xiaji=xiaji;
    })
  }


  
  binddate(e, b=undefined) {
    var type="111";
    if (b == undefined) {
      type = e. target.dataset.val;
    }

    this.date=type;
    var xiaji = this.xiaji;

    var youxiao = [];
   
    if (type == '111') {

      youxiao = xiaji.filter(quanbu => quanbu.bandin_date.substring(0, 10) == b);
      this.youxiao=youxiao;
    }


    if (type == 'all') {
    
      youxiao = xiaji.filter(quanbu => quanbu);
      this.youxiao=youxiao;
    }
    if (type == "7days") {
  
      youxiao = xiaji.filter(quanbu => quanbu.jieshushijian > -6);
      this.youxiao=youxiao;

    }
    if (type == "yesterday") {
      youxiao = xiaji.filter(quanbu => quanbu.jieshushijian == 0);
      this.youxiao=youxiao;
    }

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
