import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-tuiguandindan',
  templateUrl: './tuiguandindan.page.html',
  styleUrls: ['./tuiguandindan.page.scss'],
  providers:[MemberApi]
})
export class TuiguandindanPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
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
  date="all";
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
  quanbu=[];
  xiaji=[];
  onMyShow(e=undefined) {
    var that = this;
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];

  
    var memberapi = this.memberApi;;
    memberapi.chakanxiaji({}).then( (xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        // xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
      
      
        quanbu.push(xiaji[i]);
      }
      quanbu = this.zhuandindan(quanbu);
      for(let i=0;i<quanbu.length;i++)
      {
        quanbu[i].jieshushijian = this.jisuanchaoshi(quanbu[i].pay_time, 0)[1];
      }
      this.quanbu=quanbu;
      this.xiaji=quanbu;
    })
  }
  zhuandindan(quanbu){
     var dindan=[];
     quanbu.map((item)=>{
     item.dindan.map((item1)=>{
       console.log(46546546);
       console.log(item1);
       item1.yonjin = Number(item1.amount * item1.ddfenxiaobili).toFixed(2);
       dindan.push(item1)
       })  

     })
    return dindan;

  }
  binddate(e,b=undefined) {
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
      quanbu = xiaji.filter(quanbu => quanbu.pay_time.substring(0, 10) == b);
      this.quanbu=quanbu;
    }


    if (type == 'all') {
      console.log(quanbu);
      quanbu = xiaji.filter(quanbu => quanbu);
      this.quanbu=quanbu;
    }
    if (type == "7days") {
      quanbu = xiaji.filter(quanbu => quanbu.jieshushijian >-6);
      this.quanbu=quanbu;
     
    }
    if (type == "yesterday") {
      quanbu = xiaji.filter(item => item.jieshushijian ==1);
      this.quanbu=quanbu;
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
