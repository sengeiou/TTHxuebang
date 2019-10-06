import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-yiduihuang',
  templateUrl: './yiduihuang.page.html',
  styleUrls: ['./yiduihuang.page.scss'],
  providers:[MemberApi,JifenApi]
})
export class YiduihuangPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jifenApi:JifenApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  info;
  onMyShow() {
    var that = this;
    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({ id: this.params.shopid }).then( (info) => {
      this.info=info;
    })
  }
  order(e){
    this.navigateTo({
      url: '/pages/jifenorderinfo/jifenorderinfo?id='+this.params.id,
    })
  }
}
