import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-studentmsg',
  templateUrl: './studentmsg.page.html',
  styleUrls: ['./studentmsg.page.scss'],
  providers:[MemberApi]
})
export class StudentmsgPage  extends AppBase {

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
  var api=this.jigouApi;;
  var nian=new Date();
    nian = nian.getFullYear();

  console.log("哈哈哈哈");
    api.xueyuanlist({}).then( (xueyuan)=>{
      xueyuan.map((item)=>{
        console.log(Number(item.shengri.substring(0, 4)));
        console.log(Number(nian))
        item.sui = Number(nian) - Number(item.shengri.substring(0,4))+1;
        item.sj0 = item.shouji.substring(0,3);
        item.sj1 = item.shouji.substring(3,7);
        item.sj2 = item.shouji.substring(7,11);
      })
      this.Base.setMyData({ xueyuanlist: xueyuan})
    })

  }
  studentinfo(e){
   
    this.navigateTo({
      url: '/pages/studentinfo/studentinfo?id=' + e.target.dataset.id,
    })
  }
  tianjia(){
    this.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })

  }
}
