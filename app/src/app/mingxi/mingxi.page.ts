import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-mingxi',
  templateUrl: './mingxi.page.html',
  styleUrls: ['./mingxi.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class MingxiPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  tgjilu=[];
  shouru="0";
  onMyShow(){
    var api = this.jigouApi;
    api.tgjilu({}).then((tgjilu)=>{
        var shouru=0;
       tgjilu.map((item)=>{
         shouru += Number(item.jiner);
       })
       this.tgjilu=tgjilu;
       this.shouru=Number(shouru).toFixed(2);

    })
  }
  pnum(s){
    return Number(s);
  }
}
