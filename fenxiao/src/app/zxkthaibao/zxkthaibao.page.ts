import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { InstApi } from 'src/providers/inst.api';
import { HaibaoApi } from 'src/providers/haibao.api';
@Component({
  selector: 'app-zxkthaibao',
  templateUrl: './zxkthaibao.page.html',
  styleUrls: ['./zxkthaibao.page.scss'],
  providers: [MemberApi, JigouApi,InstApi,HaibaoApi]
})
export class ZxkthaibaoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public habaoapi: HaibaoApi,
    public jigouapi:JigouApi,
    public sanitizer: DomSanitizer,
    public instapi:InstApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  neiron=null;
  kcinfo=null;
  yuanwen=null;
  qrcode='';
  onMyShow(){
    
    var api=this.jigouapi;
    api.zaixiankecheninfo({id:this.params.id}).then((kcinfo)=>{
    console.log(kcinfo);
    console.log( kcinfo.wenan);
    this.yuanwen=kcinfo.wenan;
    kcinfo.wenan= kcinfo.wenan.replace(/\n/g,"<br>");
    kcinfo.wenan= kcinfo.wenan.replace(/<br\/>/g, "");
    console.log( kcinfo.wenan);
     this.neiron=kcinfo.wenan;
     this.kcinfo=kcinfo;
     
    })
    this.habaoapi.fenxiaohaibao2({isdebug:'Y',kc_id:this.params.id}).then((res) => {
        
      this.haibao="https://tthxb.artxb.cn/Users/upload/tthxb/"+res.return;

    })

 

  }
  haibao='';
  ceshi(){

    
  }
}
