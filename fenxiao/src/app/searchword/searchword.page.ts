import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';


@Component({
  selector: 'app-searchword',
  templateUrl: './searchword.page.html',
  styleUrls: ['./searchword.page.scss'],
})
export class SearchwordPage extends AppBase {

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
  result=[];
  hotest=[];
  history=[];
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    var memberapi = this.memberApi;
    memberapi.searchkeyword({}).then((ret) => {
      this.history=ret.history;
      this.hotest=ret.hotest;
    
    });
  }
  todetails(e) {
    var name = e;

    var memberapi = this.memberApi;
    memberapi.setsearch({ keyword: name });
   this.navigate("search",{name:name});
    
  }
}
