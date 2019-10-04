import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-xianxia',
  templateUrl: './xianxia.page.html',
  styleUrls: ['./xianxia.page.scss'],
  providers:[MemberApi]
})
export class XianxiaPage  extends AppBase {

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
 
  onMyShow() {
    var that = this;
    var huodonapi = new HuodonApi();
    huodonapi.huodonlist({}).then( (huodonlist) => {
      this.Base.setMyData({ huodonlist });

    })

    console.log("牛逼了");




  }

  listclick(e){
    console.log(e);
   
   this.navigateTo({
     url: '/pages/huodoninfo/huodoninfo?id=' + e.target.dataset.id,
   })
    
  }

}
