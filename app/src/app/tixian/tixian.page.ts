import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-tixian',
  templateUrl: './tixian.page.html',
  styleUrls: ['./tixian.page.scss'],
  providers:[MemberApi]
})
export class TixianPage  extends AppBase {

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
    this.Base.setMyData({ jiner: '', name: '' });
  }
  onMyShow() {
    var that = this;
    var api = this.jigouApi;;
    api.problemlist({ chanjin: 'tx' }).then( (problemlist) => {
      this.Base.setMyData({ problemlist: problemlist })

    })
    api.fenxiaoinfo({}).then( (fenixaoinfo) => {

      this.Base.setMyData({ fenixaoinfo: fenixaoinfo })

    })
  }
  mingxi() {

    this.navigateTo({
      url: '/pages/mingxi/mingxi',
    })

  }
  quanbu() {
    console.log(123132);
    this.Base.setMyData({ jiner: this.MemberInfo.tuiguanshouyi })
  }
  tixian() {
    var api = new WechatApi();
    this.Base.setMyData({ tishi1: false, tishi2: false, tishi3: false });


    var jiner = Number(this.jiner);
    var name = this.name;
    if (jiner == 0) {
      this.Base.setMyData({ tishi2: true });
      return
    }
    if (jiner < 0 || jiner > 5000) {
      this.Base.setMyData({ tishi1: true });
      return
    }
    if (jiner > this.MemberInfo.tuiguanshouyi) {
      this.Base.setMyData({ tishi3: true });
      return
    }
    api.tixianjilu({ realname: this.fenixaoinfo[0].reainame, amount: jiner }).then( (res) => {
      // this.showAlert("提现申请已发送");

      wx.showModal({
        title: '提示',
        content: '提现申请已发送',
        confirmText: "我知道了",
        confirmColor: '#FF6600',
        showCancel: false,
        success: (() => {
        
        this.navigateBack({
          
        })


        })
      })


    })

  }
  shuru(e) {

    this.Base.setMyData({ jiner: e.detail.value })

  }
  shuru1(e) {

    this.Base.setMyData({ name: e.detail.value })

  }

}
