import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-shopmall',
  templateUrl: './shopmall.page.html',
  styleUrls: ['./shopmall.page.scss'],
  providers:[MemberApi]
})
export class ShopmallPage  extends AppBase {

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
    this.Base.setMyData({
      kf:0
  });
}
onMyShow() {
  var that = this;
  var jifenapi = this.jifenApi;;
  jifenapi.commoditylist({orderby:'r_main.seq'}).then( (list)=>{
    this.Base.setMyData({ list })
  })

}
ss(e){
 this.Base.setMyData({kf:1})
}
onUnload(){
  console.log("1321")
}
toshouzhi(e){
  this.onUnload();
  console.log("看来大家");
  this.navigateTo({
    url: '/pages/jifenshouzhi/jifenshouzhi'
  })
}
todetails(e){
  var id=e.target.id;
  this.navigateTo({
    url: '/pages/shopmalldetail/shopmalldetail?id='+id
  })
}

toorder(e){
  this.navigateTo({
    url: '/pages/jifenorder/jifenorder'
  })
}
showtoset(e){
 wx.showToast({
   title: '暂未开放，敬请期待',
   icon:'none'
 })
}
}
