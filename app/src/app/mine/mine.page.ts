import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { InstApi } from 'src/providers/inst.api';
import { PurchaseApi } from 'src/providers/purchase.api';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
  providers:[MemberApi,JigouApi,InstApi,PurchaseApi]
})
export class MinePage  extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi,
    public instApi:InstApi,
    public purchaseApi:PurchaseApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  mobile="";
  onMyLoad(){
    //参数
    this.params;
  }
  xiaoxi=0;
  reminderpay=0;
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.instApi;
    var jigouapi = this.jigouApi;
   
    
    console.log(AppBase.jump, '快快快')
    if (AppBase.jump == false) {
      this.navigate("auth");
    }
   

    jigouapi.myxiaoxi({ isread:'N'}).then((xiaoxi)=>{
         this.xiaoxi=xiaoxi.length;
    })



    var mobile=this.MemberInfo.mobile;
    
    var phone1=  mobile.substr(0, 3);
    var phone2 = mobile.substr(3, 4);
    var phone3 = mobile.substr(7, 4);
    this.mobile=phone1 + ' ' + phone2 + ' ' + phone3;
    

    var api = this.purchaseApi;


    api.purchaselist({
      pstatus: 'W'
    }).then((wclist) => {
      this.reminderpay=wclist.length;
    });
  }
  startscan(e=undefined) {
    var that = this;
    //todo
    // wx.scanCode({
    //   scanType: ['qrCode'],
    //   success(res) {
    //     var result = res.result;
    //     if (result == "" || result.length != 8) {
    //       that.Base.info("扫码内容不正确~" + result);
    //       return;
    //     }
    //     this.navigateTo({
    //       url: '/pages/hexiao/hexiao?usecode=' + result,
    //     })
    //   }
    // })
  }

  shua(e){
    this.onMyShow();
  }

  todetails(name) {
    // if (name == "cj") {
    //   this.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if (name == "jfsc") {
      this.navigate("shopmall");
    }
    // if (name == "yhq") {
    //   this.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if (name == "kf") {
      this.navigate("lianxikefu");
    }
    if (name == "dizhi") {
      this.navigate("xuanzedizhi",{type:"Y"});
    }
    if (name == "pc") {
      this.navigate("mypingce");
    }
    if (name == "dd") {
      this.navigate("myorder");
    }
    if (name == "dz") {
      this.navigate("address");
    }
    if (name == "xx") {
      this.navigate("mymessage");
    }
    if (name == "wt") {
      this.navigate("problem");
    }
    if (name == "sc") {
      this.navigate("mycollect");
    }
    if (name == "wm") {
      this.navigate("aboutus");
    }
    if (name == "jg") {
      this.navigate("addmechanism");
    }
    if (name == "tg") {
      this.navigate("promotion");
    }
    if (name == "ketan") {
      this.navigate("ketan");
    }



  }
  gotohaizi(e=undefined) {
    this.navigate("studentmsg");
  }
  showtoast(e) {
    this.toast('暂未开放，敬请期待');
  }

  orderlist(type) {

    this.navigate("myorder",{type});

  }
  pintuan(e) {
    this.navigate("pintuan");
  }

  tuikuan(e) {
    this.showAlert("暂未开放");
  }


  //todo
  // phonenoCallback(phoneno, e) {
  //   console.log(phoneno);


  //   var memberapi = this.memberApi;
  //   memberapi.updatemobile({
  //     mobile: phoneno,
  //     member_id: this.MemberInfo.id
  //   })
    
  //   this.Base.setMyData({
  //     mobile: phoneno
  //   });
  //   this.onMyShow();

  // }

  
  update(e=undefined) {
    var data = this;
    

  }


  
}
