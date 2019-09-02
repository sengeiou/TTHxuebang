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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class Tab1Page  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
      
  }
  fenleilist=[];
  xz=-1;
  name="在线课程";
  lunbolist=[];
  zuixin=[];
  onMyLoad() {
    var that = this;

    var jigouapi = this.jigouApi;
    jigouapi.coursetype({}).then((fenleilist) => {
      this.fenleilist=fenleilist;
      this.xz=-1;
      this.name="在线课程";
    });
    jigouapi.zuixinzaixiankechen({}).then((qwe)=>{
   this.zuixin=qwe;

    })
    
  
  
  }
  xzlist=[];
  onMyShow() {
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
