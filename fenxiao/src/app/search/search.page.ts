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
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class SearchPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public jigouApi: JigouApi,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  courselist=[];
  coursevlist=[];
  onMyShow(){
   console.log("哈哈哈哈");
    var jigouapi = this.jigouApi;
    jigouapi.courselist({searchkeyword:this.params.name,limit:'100'}).then((courselist) => {
      console.log(courselist);
      var coursevlist = [];
    

      this.courselist = courselist;
      this.coursevlist=coursevlist;
        
      });
    };
    ckhb(id)
    {
      console.log(id);
      this.navigate("kchaibao",{id:id});
    }
    tokcdetails(id) {
      this.navigate("kcinfo", { id: id });
  
    }
}
