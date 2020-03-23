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
  selector: 'app-zaixianketang',
  templateUrl: './zaixianketang.page.html',
  styleUrls: ['./zaixianketang.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class ZaixianketangPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
      
  }
  fenleilist=[];
  xz=-2;
  name="热门课程";
  lunbolist=[];
  zuixin=[];
  onMyLoad(e=undefined) {
    var that = this;

    var jigouapi = this.jigouApi;
    jigouapi.zaixiankechenfenlei({}).then((fenleilist) => {
      this.fenleilist=fenleilist;
      this.xz=-2;
      this.name="热门课程";
    });
    jigouapi.zuixinzaixiankechen({}).then((qwe)=>{
   this.zuixin=qwe;

    })
    
    jigouapi.zaixianketanlunbo({}).then((zaixianlunbo) => {
      this.lunbolist=zaixianlunbo;
    })
  
  }
  xzlist=[];
  onMyShow(e=undefined) {
    this.getKechenList();
  }

  getKechenList(){
    var json=null;
    json={};
    if(this.xz==-2){
      json.ishot='Y';
    }else if(this.xz==-1){
      json.isfree='Y';
    }else{
      json.onlineclassroomtype_id=this.xz;
    }

    var jigouapi =this.jigouApi;
    jigouapi.zaixiankechenlist(json).then((zaixiankechen) => {
      console.log(zaixiankechen);
      this.xzlist=zaixiankechen;
    })
  }


  switchtype(xz,name){
   this.xz=xz;
   this.name=name;
   this.getKechenList();
  }
  tiaozhuan(item)
  {

    console.log(item);
    this.navigate("ketangdetails",{id:item.course_id})
  }
  kechenxianqin(id)
  {
    this.navigate("ketangdetails",{id:id})
  }

}
