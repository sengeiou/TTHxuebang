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
  zhon=0;
  onMyLoad() {
    var that = this;

    var jigouapi = this.jigouApi;
    jigouapi.coursetype({}).then((fenleilist) => {
      console.log(fenleilist);

      var fenlei1 = { id: 0, img: '', typename: '在线课程' };
      var list = [];
      list.push(fenlei1);

      fenleilist.map((item) => {
        list.push(item);
      })
        
            
    this.zhon=  Math.floor(list.length/2);


      this.fenleilist = list;
      this.xz = -1;
      this.name = "在线课程";
    });
    jigouapi.zuixinzaixiankechen({}).then((qwe) => {
      this.zuixin = qwe;

    })






  }
  xzlist = [];
  mylat='';
  mylng='';
  fdistrict_id='';
  jglist=[];
  jgvteach=[];
  vteach=[];
  courselist=[];
  loadcourse() {
    var jigouapi = this.jigouApi;
    var mylat = this.mylat;
    var mylng = this.mylng;


    var opt = {
      mylat,
      mylng,
      
      orderby: "distance"
    };
    

   
   
    //opt.limit="100";

    jigouapi.courselist(opt).then((courselist) => {


      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {

       
        
        vteach.push(courselist[i]);
      }
      console.log(vteach);
      this.courselist = courselist;
      this.vteach=vteach;
    
    });
  }

  onMyShow() {
    this.rad = 375 * 1.0 / screen.width;
    this.getKechenList();
    this.loadcourse();
  }

  getKechenList() {
    var json = null;
    json = {};
    if (this.xz == -2) {
      json.ishot = 'Y';
    } else if (this.xz == -1) {
      json.isfree = 'Y';
    } else {
      json.onlineclassroomtype_id = this.xz;
    }

    var jigouapi = this.jigouApi;
    jigouapi.zaixiankechenlist(json).then((zaixiankechen) => {
      console.log(zaixiankechen);
      this.xzlist = zaixiankechen;
    })
  }


  switchtype(xz, name) {
    this.xz = xz;
    this.name = name;
    this.getKechenList();
  }
  tiaozhuan(item) {

    console.log(item);
    this.navigate("ketangdetails", { id: item.course_id })
  }
  kechenxianqin(id) {
    this.navigate("ketangdetails", { id: id })
  }

}
