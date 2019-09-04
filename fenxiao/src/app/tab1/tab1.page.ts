import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class Tab1Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }
  rad = 1;
  fenleilist = [];
  xz = -1;
  name = "在线课程";
  lunbolist = [];
  zuixin = [];
  zhon = 0;
  onMyLoad() {
    var that = this;

 






  }
  xzlist = [];
  mylat = '';
  mylng = '';
  fdistrict_id = '';
  jglist = [];
  jgvteach = [];
  vteach = [];
  courselist = [];
  huodon=[];
  loadcourse() {
    var jigouapi = this.jigouApi;
    var mylat = this.mylat;
    var mylng = this.mylng;


    var opt = {
      mylat,
      mylng,
      isfenxiao:'Y',
      orderby: "distance"
    };




    //opt.limit="100";

    jigouapi.courselist(opt).then((courselist) => {
      
     var huodon=[];
      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {

         if(i==0)
         {
          huodon.push(courselist[i]);
         } 
        
        vteach.push(courselist[i]);
      }
      console.log(vteach);
      this.courselist = courselist;
      this.huodon=huodon;
      console.log(this.huodon);
      this.vteach = vteach;

    });
  }

  onMyShow() {
    this.rad = 375 * 1.0 / screen.width;

    this.loadcourse();
    var jigouapi = this.jigouApi;
    jigouapi.coursetype({}).then((fenleilist) => {
      

      var fenlei1 = { id: 0, img: this.res.zaixian, typename: '在线课程' };
      var list = [];
      list.push(fenlei1);

      fenleilist.map((item) => {
        list.push(item);
      })
         
      console.log(list);

      this.zhon = Math.floor(list.length / 2);


      this.fenleilist = list;
      this.xz = -1;
      this.name = "在线课程";
    });
    jigouapi.zuixinzaixiankechen({}).then((qwe) => {
      this.zuixin = qwe;

    })
  }






  qiehuanzhanjie(idx) {
    console.log(idx);

    if (idx == 0) {
      this.navigate("zaixianketan")
    }
    else {


    }
   
  }
}
