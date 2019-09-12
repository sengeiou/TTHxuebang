import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';


@Component({
  selector: 'app-kchaibao',
  templateUrl: './kchaibao.page.html',
  styleUrls: ['./kchaibao.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class KchaibaoPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
     public jigouapi:JigouApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  neiron="";
  onMyShow(){
    var api=this.jigouapi;
    api.courseinfo({id:this.params.id}).then((kcinfo)=>{
    console.log(kcinfo);
    console.log( kcinfo.wenan);

    kcinfo.wenan= kcinfo.wenan.replace(/\n/g,"<br>");
    kcinfo.wenan= kcinfo.wenan.replace(/<br\/>/g, "");
   
    console.log( kcinfo.wenan);
     this.neiron=kcinfo.wenan;
     
    })

  }
}
