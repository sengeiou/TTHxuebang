import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-tuikuan',
  templateUrl: './tuikuan.page.html',
  styleUrls: ['./tuikuan.page.scss'],
  providers:[MemberApi]
})
export class TuikuanPage  extends AppBase {

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
      show: "all",
      wclist: [],
      dflist: []
    })
    var type = this.params.type;
    console.log("那真的牛批" + type);
    if (type != undefined) {
      if (type == 'ygm') {
        var show = 'wc';
      }
      if (type == 'dfk') {
        var show = 'wait'
      }
      if (type == 'dsh') {
        var show = 'dsh';
      }
      if (type == 'dpj') {
        var show = 'dpj';
      }
      console.log("那真的牛批");
      this.Base.setMyData({
        show: show
      })
    }


  }
  // kechenxianqin(e) {
  //   console.log(e);
  //   this.navigateTo({
  //     url: '/pages/ketangdetails/ketangdetails?id=' + e.target.dataset.id,
  //   })

  // }

  onMyShow() {
    var that = this;
    var api = this.purchaseApi;;

    api.purchaselist({
      sppp: 1, pstatus:'R,F'
    }).then( (wclist) => {

      this.Base.setMyData({
        wclist
      });
    });

 
    api.purchaselist({
      pstatus: 'W'
    }).then( (dflist) => {
      this.Base.setMyData({
        dflist
      });
    });

  }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "all") {
      this.Base.setMyData({
        show: "all"
      })
    }
    if (type == "wc") {
      this.Base.setMyData({
        show: "wc"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        show: "wait"
      })
    }
    if (type == "dsh") {
      this.Base.setMyData({
        show: "dsh"
      })
    }
    if (type == "dpj") {
      this.Base.setMyData({
        show: "dpj"
      })
    }
  }

  bindpay(e) {
    var that = this;
    var id = e.target.id;
    var wechatapi = new WechatApi();
    wechatapi.prepay({ id: id }).then( (payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      wx.requestPayment(payret)
    });
  }
  toorder(e) {
    var that = this;
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/order/order?id=' + id,
    })
  }
  colseorder(e) {
    var that = this;
    var id = e.target.id;

    wx.showModal({
      title: '',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var batchapi = this.batchApi;;
          batchapi.closeorder({ id: id }).then( (colseorder) => {
            that.Base.setMyData({ colseorder })
            that.onMyShow();
          })
        }
      }
    });


  }
  kantuan(e) {
    this.navigateTo({
      url: '/pages/groupinfo/groupinfo?id=' + e.target.dataset.pt,
    })

  }
}
