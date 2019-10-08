import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { BaomaApi } from 'src/providers/baoma.api';

@Component({
  selector: 'app-baomainfo',
  templateUrl: './baomainfo.page.html',
  styleUrls: ['./baomainfo.page.scss'],
  providers:[MemberApi,BaomaApi]
})
export class BaomainfoPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public baomaapi:BaomaApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
    this.baomainfo={};
  }

  onMyLoad(){
    //参数
    this.params;
  }
  baomainfo=null;
  onMyShow(e=undefined) {
    var that = this;
    var baomaapi = this.baomaapi;

    baomaapi.baomainfo({ id: this.params.id }).then( (baomainfo) => {
      this.baomainfo=baomainfo;
    });

  }
}
