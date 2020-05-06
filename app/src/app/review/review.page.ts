import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class ReviewPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  shenhe=[];
  onMyShow(e=undefined) {
    var that = this;
    var api = this.jigouApi;;
    api.fenxiaoinfo({}).then( (res) => {
      this.shenhe=res;
    })
  }
  tuiguan(){
    // this.navigateBack({
      
    // })

    // this.navigateTo({
    //   url: '/pages/promotion/promotion',
    // })
    this.navigate('promotion');
  }
  chonxintijiao(){
  //  this.navigateTo({
  //    url: '/pages/promotion/promotion',
  //  })
   this.navigate('promotion');
  }

}
