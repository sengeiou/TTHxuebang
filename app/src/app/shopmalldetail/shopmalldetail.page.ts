import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-shopmalldetail',
  templateUrl: './shopmalldetail.page.html',
  styleUrls: ['./shopmalldetail.page.scss'],
  providers:[MemberApi]
})
export class ShopmalldetailPage  extends AppBase {

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
      show: 0,shuliang:1,sl:1
    });
  }
  onMyShow() {
    var that = this;
    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({id:this.params.id}).then( (info) => {
      this.Base.setMyData({ info })
    })

  }
  toshouzhi(e) {
    this.navigateTo({
      url: '/pages/jifenshouzhi/jifenshouzhi'
    })
  }

jia(e){
  var shuliang=this.shuliang;
  shuliang++
  this.Base.setMyData({ shuliang})
}
jian(e){
  var shuliang = this.shuliang;
  shuliang--
  if (shuliang<=0){
    wx.showToast({
      title: '至少兑换一个',
      icon: 'none',
    })
    return;

  }
  this.Base.setMyData({ shuliang })
}

  toduihuan(e) {
    
    this.Base.setMyData({
      show: 1
    })
    //return;
    

  }
  close(e) {
    this.Base.setMyData({
      show: 0
    })
  }
  next(e){
    var inventory = e.target.id;
    var interral = e.target.dataset.jifen;
    var shuliang = this.shuliang;
    var img = e.target.dataset.img;
    var name = e.target.dataset.name;
    console.log(inventory - 1 + "库存");
    console.log(interral + "积分");
    //return;
    if (inventory <= 0 || inventory < shuliang){
      wx.showToast({
        title: '库存不足，无法兑换',
        icon:'none'
      })
      return;
    }


    this.navigateTo({
      url: '/pages/xuanzedizhi/xuanzedizhi?inventory=' + inventory + '&interral=' + interral + '&id=' + this.params.id + '&img=' + img + '&name=' + name + '&shuliang=' + shuliang
    })

  }

}
