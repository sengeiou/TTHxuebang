import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-wuliu',
  templateUrl: './wuliu.page.html',
  styleUrls: ['./wuliu.page.scss'],
  providers:[MemberApi]
})
export class WuliuPage  extends AppBase {

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
  var jifenapi = this.jifenApi;;

  jifenapi.jifenorderinfo({ id: this.params.id }).then( (info) => {

    jifenapi.wuliu({ type: info.wuliu_company_type,no:info.airwaybill}).then( (wuliu) => {
      var wuliulist = wuliu.result.list;
      var wllist = [];
      
      for (var i = wuliulist.length - 1; i >= 0; i--) {
        wllist.push(wuliulist[i]);
      }

      this.Base.setMyData({
        wuliu, wllist
      })

    })


    this.Base.setMyData({ info })


  })

  
}

onclick() {
  wx.request({
    url: '',
  })
}


}
