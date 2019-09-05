import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-kechen',
  templateUrl: './kechen.page.html',
  styleUrls: ['./kechen.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class KechenPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public jigouApi: JigouApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    console.log(this.params);
  }
  xz=0;
  vteach=[];
  onMyShow(){
    var api=this.jigouApi;

       api.courselist({isfenxiao:'Y',type:this.params.id}).then((vteach)=>{

        this.vteach=vteach;
       })

  }
  bindclick(c)
  {
    this.xz=c;
  }
  kcinfo(id)
  {
    this.navigate("kcinfo",{id:id})
  }
}
