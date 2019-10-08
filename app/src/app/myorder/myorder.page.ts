import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PurchaseApi } from 'src/providers/purchase.api';
import { WechatApi } from 'src/providers/wechat.api';
import { BatchApi } from 'src/providers/batch.api';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
  providers:[MemberApi,PurchaseApi,WechatApi,BatchApi]
})
export class MyorderPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public purchaseApi:PurchaseApi,
    public wechatApi:WechatApi,
    public batchApi:BatchApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  show= "all";
  onMyLoad(){
    //参数
    this.params;

    var type = this.params.type;
    var show="all";
    if (type != undefined) {
      if (type == 'ygm') {
        show = 'wc';
      }
      if (type == 'dfk') {
        show = 'wait'
      }
      if (type == 'dsh') {
        show = 'dsh';
      }
      if (type == 'dpj') {
        show = 'dpj';
      }
      this.show=show;
    }


  }
  alllist=[];
  wclist=[];
  dflist=[];
  pjlist=[];
  dshlist=[];
  onMyShow(e=undefined) {
    var that = this;
    var api = this.purchaseApi;

    api.purchaselist({
    }).then( (alllist) => {

      this.alllist=alllist;
    });

    api.purchaselist({
      pstatus: 'P,U,R,PJ'
    }).then( (wclist) => {
      this.wclist=wclist;
    });

    api.purchaselist({
      pstatus: 'W'
    }).then( (dflist) => {
      this.dflist=dflist;
    });

    api.purchaselist({
      pstatus: 'PJ'
    }).then( (pjlist) => {
      this.pjlist=pjlist;
    });

    api.purchaselist({
      pstatus: 'DSH'
    }).then( (dshlist) => {
      this.dshlist=dshlist;
    });

  }
  courseinfo(e)
  {
    this.navigate("order",{id:e.target.dataset.id});
  
  }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "all") {
      this.show="all";
    }
    if (type == "wc") {
      this.show="wc";
    }
    if (type == "df") {
      this.show="wait";
    }
    if (type == "dsh") {
      this.show="dsh";
    }
    if (type == "dpj") {
      this.show="dpj";
    }
  }

  bindpay(e) {
    var that = this;
    var id = e.target.id;
    var wechatapi = this.wechatApi;
    var list = this.alllist.filter((item)=>{
       
       return  item.id==id;

    });
     if(list[0].type=='PT')
     {
       wechatapi.prepay2({ id: id }).then( (payret) => {
         //todo
        //  payret.complete = function (e) {
        //    that.onMyShow();
        //  }
        //  console.log(payret);
        //  wx.requestPayment(payret)
       });

     }
else{

    wechatapi.prepay({ id: id }).then((payret) => {
      // todo
      // payret.complete = function (e) {
      //   that.onMyShow();
      // }
      // console.log(payret);
      // wx.requestPayment(payret)
    });
     }
  }
  toorder(e) {
    var that = this;
    var id = e.target.id;
    this.navigate("order",{id});
  }
  colseorder(e) {
    var that = this;
    var id = e.target.id;

    this.showConfirm("确认取消订单？",(ret)=>{
      if(ret){
        var batchapi = this.batchApi;
          batchapi.closeorder({ id: id }).then( (colseorder) => {
            
            that.onMyShow();
          })
      }
    });


  }
  kantuan(e) {
    this.navigate("groupinfo",{id:e.target.dataset.pt});

  }
  pinjia(e)
  {
    this.navigate("pingjia",{id:e.target.dataset.id,order_id:e.target.id});

  }
  shanchu(e)
  {
    var that = this;
    var id = e.target.dataset.id;
    this.showConfirm("确认删除此订单？",(ret)=>{
      if(ret){
        var batchapi = this.batchApi;
          batchapi.deleteorder({ id: id }).then( (colseorder) => {
            
            that.onMyShow();
          })
      }
    });
  }
  pinjialist(e) {
    var id = e.target.dataset.id;
    this.navigate("pingjialist",{id});
  }
}
