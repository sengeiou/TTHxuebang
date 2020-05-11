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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class Tab3Page extends AppBase {

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
  showModal1=false;
  tuiguandindan=[];
  tuiguaninfo=[];
  ycmobile='';
  onMyLoad() {

    
  }
  ycmobile1(str) {
    return str.substr(0, 3) + "****" + str.substr(7);
  }
  dianle=false;

  onMyShow() {
    
    var that = this;
   
    var mobile = this.MemberInfo.mobile;
    if (mobile != '') {
      this.ycmobile=this.ycmobile1(mobile)
    }
    var api = this.jigouApi;
    api.fenxiaoinfo({}).then((res)=>{
      console.log(res);
      console.log(1231313);
          console.log(res.length);
          this.tuiguaninfo=res 
          if (res.length == 0 ) {
            this.showModal1=true;
          }
          else{
            this.showModal1=true;
          }

    })
  
    var leijikehu = [];
    var xiajituiguan = [];
    var shijian = this.InstInfo.xiajishijian;
    this.memberApi.chakanxiaji({}).then((xiaji)=>{
      for (var i = 0; i < xiaji.length; i++) {

        leijikehu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(leijikehu);
      console.log(xiajituiguan);
      this.leijikehu=leijikehu.length;
      this.xiajituiguan=leijikehu.length;
      this.tuiguandindan=this.zhuandindan(leijikehu);
     

     
    })
    
  }
  leijikehu=0;
    xiajituiguan=0;
    zhuandindan(quanbu) {
      var dindan = [];
  
      quanbu.map((item) => {
  
        item.dindan.map((item1) => {
          dindan.push(item1)
        })
  
      })
      console.log("嚯嚯嚯");
      console.log(dindan);
      return dindan;
  
    }
  tuiguanguize(){

     this.navigate("tuiguanguize");

  }
  todetails(name){
    var pagename="";
    if (name == "jfsc") {
      pagename="shopmall";
    }
    // if (name == "yhq") {
    //   wx.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if(name=="dd"){
      pagename="myorder";
    }
    if (name == "dz") {
      pagename="address";
    }
    if (name == "xx") {
      pagename="mymessage";
    }
    if (name == "wt") {
      pagename="problem";
    }
    if (name == "sc") {
      pagename="mycollect";
    }
    if (name == "wm") {
      pagename="aboutus";
    }
    if (name == "jg") {
      pagename="addmechanism";
    }
    if (name == "tg") {
      pagename="promotion";
    }

    this.navigate(pagename);
  
  }

  mykehu(e=undefined) {

    if (this.leijikehu == 0) {
      this.showAlert("暂无邀请的好友，快去邀请好友吧")
      return
    }
    // this.navigateTo({
    //   url: '/pages/mykehu/mykehu',
    // })
    this.navigate('mykehu')
  }
  tuiguandindan1(tuiguandindan) {
    if (tuiguandindan == 0) {
      this.showAlert("暂无推广订单")
      return
    }
    // this.navigateTo({
    //   url: '/pages/tuiguandindan/tuiguandindan',
    // })
    this.navigate('tuiguandindan')
  }

  lijitixian(e=undefined) {

    // this.navigateTo({
    //   url: '/pages/tixian/tixian',
    // })
    this.navigate('tixian')
  }
  myshoucan(){
   console.log("21111");
    this.navigate("mycollect");

  }
}
