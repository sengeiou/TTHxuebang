import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-jifenorder',
  templateUrl: './jifenorder.page.html',
  styleUrls: ['./jifenorder.page.scss'],
  providers:[MemberApi,JifenApi]
})
export class JifenorderPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jifenapi:JifenApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  show="all";

  onMyLoad(){
    //参数
    this.params;
  }

  alllist=[];
  daifalist=[];
  daishoulist=[];
  wanchenlist=[];
  onMyShow() {
    var that = this;
    var jifenapi = this.jifenapi;
    jifenapi.jifenorderlist({ }).then( (alllist) => {
      this.alllist=alllist;
    })

    jifenapi.jifenorderlist({orderstatus:"A"}).then((daifalist) => {
      this.daifalist=daifalist;
    })

    jifenapi.jifenorderlist({ orderstatus: "B"}).then((daishoulist) => {
      this.daishoulist=daishoulist;
    })

    jifenapi.jifenorderlist({ orderstatus: "C"}).then((wanchenlist) => {
      this.wanchenlist=wanchenlist;
    })

  }
  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "all") {
      this.show="all";
    }
    if (type == "wc") {
      this.show="finished";
    }
    if (type == "df") {
      this.show="wait";
    }
    if (type == "ok") {
      this.show="wc";
    }
  }
  bindtodetails(e){
    var id=e.target.id;
    this.navigate("jifenorderinfo",{id});
  }
  wuliu(e){
    var id = e.target.id;
    this.navigate("wuliu",{id});
  }
  shouhuo=null;
  shouhuoclick(e){
    var that=this;
    var id=e.target.id;
    var jifenapi = this.jifenapi;

    this.showConfirm("确认收货？",(ret)=>{
      if(ret){
        jifenapi.shouhuo({ id: id }).then((shouhuo) => {
          that.shouhuo=shouhuo;
          that.toast("确认收货成功");
          that.onMyShow();
        })
      }
    });


  }
  shanchu=null;
  shanchuclick(e){
   
    var that=this;
    var id=e.target.id;
    var jifenapi = this.jifenapi;

    this.showConfirm("确认删除该订单？",(ret)=>{
      if(ret){
        jifenapi.shanchu({ id: id }).then((shanchu) => {
        that.shanchu=shanchu;

        that.toast("删除订单成功");
        that.onMyShow();
      })
      }
    });


  
  }
}
