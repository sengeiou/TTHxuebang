import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  mima1 = false;
  mima2 = true;
  password1 = "";
  
  password2 = "";
  onMyLoad() {
    //参数
    this.params;
    console.log(this.params);
    this.needlogin=true;
  }
  onMyShow() {

  }
  zhuce() {

    var password1 = this.password1;
    var password2 = this.password2;

    if (password1 != password2) {

      this.toast("两次输入的密码不一致");
      return

    }
    console.log(123123);
    var api = this.memberApi;
    api.register({ xiugai:1,mobile: this.params.id, password: this.password1 }).then((res) => {
 
      if(res.code==0)
      {
         
       this.navigate("login");

      }
     
        


    })

  }
}
