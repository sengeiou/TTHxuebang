import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-kehuinfo',
  templateUrl: './kehuinfo.page.html',
  styleUrls: ['./kehuinfo.page.scss'],
  providers:[MemberApi]
})
export class KehuinfoPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
    this.member={};
  }

  onMyLoad(){
    //参数
    this.params;
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    console.log(days);
    return [days < b, b - days];

  }
  member=null;
  onMyShow(e=undefined) {
    var that = this;
    var shijian = this.InstInfo.xiajishijian;
     var memberapi=this.memberApi;
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];
    memberapi.chakanxiaji({}).then( (xiaji) => {
      console.log(xiaji);
      console.log("adasdsa");
      for (var i = 0; i < xiaji.length; i++) {
        xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
       
        quanbu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(quanbu);
      console.log(youxiao);
      console.log(shixiao);
      var member = quanbu.filter((item) => {
        return item.id == this.params.id;
      })
      this.member=member[0];
    })
       
 
 
  }
}
