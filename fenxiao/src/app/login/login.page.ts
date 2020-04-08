import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[MemberApi]
})
export class LoginPage extends AppBase {

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
  zhuce(){

    this.navigate("register");
  }
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){

    
  }
  shoujihao='';
  password='';
  login(){
  var shoujihao=this.shoujihao;
  var password=this.password;

   var api=this.memberApi;
     
    api.login({mobile:shoujihao,password:password}).then((res)=>{
     
       if(res.code==0)
       {
          
        window.localStorage.setItem("UserToken",res.return)

       }
 

    })


  }
  forgetpsw(){
    console.log("阿森松岛")
    this.navigate("forgetpassword");

  }
}
