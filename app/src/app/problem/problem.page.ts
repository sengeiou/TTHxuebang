import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.page.html',
  styleUrls: ['./problem.page.scss'],
  providers:[MemberApi,InstApi,JigouApi]
})
export class ProblemPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
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
    this.headerscroptshow = 480;
      
  }
  problemlist=[];
  aboutus=null;
  show=""
  onMyShow(e=undefined) {
    var that = this;
    var jigouapi = this.jigouApi;
 
    
    jigouapi.problemlist({chanjin:'wd'}).then((problemlist) => {
      console.log(problemlist);
      this.problemlist=problemlist;
    }) 

  }

  bindshow(e){
    
    var id=e;
    var show =this.show;
    if(show==""){
     this.show=id;
    }
    if (show != id) {
      this.show=id;
    }
    if(show==id){
      this.show="";
    }



  }
}