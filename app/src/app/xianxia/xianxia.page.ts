import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { HuodonApi } from 'src/providers/huodon.api';

@Component({
  selector: 'app-xianxia',
  templateUrl: './xianxia.page.html',
  styleUrls: ['./xianxia.page.scss'],
  providers:[MemberApi,HuodonApi]
})
export class XianxiaPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public huodonApi:HuodonApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  huodonlist=[];
  onMyShow(e=undefined) {
    var that = this;
    var huodonapi =this.huodonApi;
    huodonapi.huodonlist({}).then( (huodonlist) => {
      this.huodonlist=huodonlist;
    })
  }

  listclick(id){
   
   this.navigateTo({
     url: '/pages/huodoninfo/huodoninfo?id=' + id,
   })
    
  }

}
