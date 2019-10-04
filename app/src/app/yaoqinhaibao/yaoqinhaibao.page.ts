import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-yaoqinhaibao',
  templateUrl: './yaoqinhaibao.page.html',
  styleUrls: ['./yaoqinhaibao.page.scss'],
  providers:[MemberApi]
})
export class YaoqinhaibaoPage  extends AppBase {

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
    if (this.params.id != undefined) {
      var yaoqinren = this.params.id;
      if (yaoqinren != this.MemberInfo.id) {
        wx.reLaunch({
          url: '/pages/home/home?id=' + yaoqinren,
        })
        return
      }

    }



    this.Base.setMyData({ lujin: ApiConfig.GetUploadurl() + this.options.name })
    this.Base.setMyData({ erweima: ApiConfig.GetApiUrl()+ "inst/qrcode?inst_id=1&url=/pages/home/home?id=" + this.MemberInfo.id })
  }
  baocun() {
    this.download(this.lujin);
  }
  onShareAppMessage(e) {
    return {

      title: this.InstInfo.zhuanfatishi,

      desc: '分享页面的内容',

      path: '/pages/home/home?id=' + this.MemberInfo.id

    }

  }
}
