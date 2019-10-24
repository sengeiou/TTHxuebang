import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PingceApi } from 'src/providers/pingce.api';

@Component({
  selector: 'app-mypingce',
  templateUrl: './mypingce.page.html',
  styleUrls: ['./mypingce.page.scss'],
  providers:[MemberApi,PingceApi]
})
export class MypingcePage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public pingceApi:PingceApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    this.type=this.params.type;
  }
  type="";
  header2="";
  mypingcelist=[];
  onMyShow(e=undefined) {
    var that = this;
    if (this.type == "A") {
      this.header2="评测列表";
    } else {
      this.header2="我的评测";
    }
    var pingceapi = this.pingceApi;
    pingceapi.mypingcelist({
      member_id: this.MemberInfo.id
    }).then((mypingcelist) => {
      this.mypingcelist=mypingcelist;
    })

  }

  toceshi(item) {

    //return;
    var id = item.pingce_id;
    var pcid = item.id;
    var tA = item.typeA;
    var tB = item.typeB;
    var tC = item.typeC;
    var tD = item.typeD;
    console.log(tA, tB, tC, tD,"事随时")
   // return;
    if (tA == "" && tB == "" && tC == "" && tD == "") {
      console.log("空");
      this.navigate("pingceindex",{id,pcid})
    } else {
      this.navigate("pingceindex",{id,pcid,typeA:tA,typeB:tB,typeC:tC,typeD:tD});
    }

  }
}
