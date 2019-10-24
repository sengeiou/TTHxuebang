import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PingjiaApi } from 'src/providers/pingjia.api';

@Component({
  selector: 'app-pingjialist',
  templateUrl: './pingjialist.page.html',
  styleUrls: ['./pingjialist.page.scss'],
  providers:[MemberApi,PingjiaApi]
})
export class PingjialistPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public pingjiaApi:PingjiaApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  check=true;
  
  arr5=[];
  arr4=[];
  arr3=[];
  arr2=[];
  arr1=[];

  onMyLoad(e=undefined) {
    this.arr5=this.getArray(5);
    this.arr4=this.getArray(4);
    this.arr3=this.getArray(3);
    this.arr2=this.getArray(2);
    this.arr1=this.getArray(1);
    //参数
    this.params;
  }
  pingjialist=[];
  onMyShow(e=undefined) {
    var that = this;
    var pingjiaapi = this.pingjiaApi;;

    var id=this.params.id;
    console.log(id+"懂得");

    pingjiaapi.pingjialist({ kecheng_id: id}).then( (pingjialist) => {
      this.pingjialist=pingjialist;
    });

  }


  dianzan(id) {
    var that = this;
   // console.log(id,"哈哈");
    var pingjiaapi = this.pingjiaApi;;
    var memberinfo = this.MemberInfo;
    var list = this.pingjialist;
     
    //return;

    //var expertsfavid = this.info.id;
    pingjiaapi.addpinjialike({ pingjia_id: list[id].id,status:'A' }).then( (ret) => {

      if (ret.return == "deleted") {
        list[id].count--;
        this.toast("取消点赞");
      } else {
        list[id].count++; 
        this.toast("点赞成功");
      }
     // this.Base.setMyData({ pingjialist: list })
     // this.onMyShow();
      pingjiaapi.pingjialist({ kecheng_id: this.params.id }).then( (pingjialist) => {
        this.pingjialist=pingjialist;
      });

    })

    console.log(list[id].count, "规格") 
  }
}
