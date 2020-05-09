import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { BaomaApi } from 'src/providers/baoma.api';

@Component({
  selector: 'app-baoma',
  templateUrl: './baoma.page.html',
  styleUrls: ['./baoma.page.scss'],
  providers:[MemberApi,InstApi,BaomaApi]
})
export class BaomaPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public instApi:InstApi,
    public baomaApi:BaomaApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  floorstatus=false;
  baomalist=[];
  onMyShow() {

    AppBase.LASTTAB=this;
    var that = this;
    var instapi = this.instApi;
    var baomaapi = this.baomaApi;
    baomaapi.baomalist({}).then((baomalist) => {
      for(var i=0;i<baomalist.length;i++){
        baomalist[i].up_time_timespan_d = AppUtil.TimeAgo(baomalist[i].up_time_timespan);
      }
      this.baomalist=baomalist;
    });
  }

  binddetails(id){
    this.navigate("baomainfo",{id:id});

  }
}
