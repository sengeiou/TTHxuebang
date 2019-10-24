import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-huiyuanfuwu',
  templateUrl: './huiyuanfuwu.page.html',
  styleUrls: ['./huiyuanfuwu.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class HuiyuanfuwuPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
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
      this.info=null;
  }

  onMyLoad(){
    //参数
    this.params;
  }
  list=[];
  info=null;
  onMyShow(e=undefined) {
    var that = this;
    var jigouapi = this.jigouApi;
    jigouapi.huiyuan({}).then( (info) => {

      jigouapi.quanyilist({ fuwu_id:info.id}).then( (list) => {
        this.list=list;
      });

      this.info=info;
    });
  }

  tokaitong(e){
    this.navigate("liucheng");
  }
 
 


}
