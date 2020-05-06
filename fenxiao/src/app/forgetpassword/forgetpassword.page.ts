import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AliyunApi } from 'src/providers/aliyun.api';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class ForgetpasswordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public aliyunApi: AliyunApi,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  diyici = false;
  reminder = 0;
  shoujihao = "";
  timer = null;
  yanzhenma = "";
  onMyLoad(){
    //参数
    this.params;
    this.needlogin=true;
  }
  onMyShow(){

  }
  sendVerifyCode(){ 

 
    

     
        // this.inverify = true;
        this.aliyunApi.sendverifycode({
          mobile: this.shoujihao,
          type: "reset"
        }).then(ret => {
          console.log(ret);
          if (ret.code == 0) {
            this.reminder = 60;
           
            //this.$refs["inputc1"].focus();

            //var obj = this.ele.nativeElement.querySelector('#inputc1');
            //obj.focus();

            this.toast("验证码已发送，请注意查收");
            this.diyici = true;
            this.setInVerify();
          } else {
            this.toast("验证码发送失败，请稍后重试");
          }
        });
    

  
   
   
  }
  
  setInVerify() {
     var that=this;
  
    var k = that.timer = setInterval(() => {
      console.log(that.reminder);
      if (that.reminder >= 0) {
        that.reminder--;
      }
      if (that.reminder < 0) {
        clearInterval(k);
      }
  
    }, 1000);
  }
  zhuce(){

    var verifycode =this.yanzhenma;
  
     console.log(verifycode);
    this.aliyunApi.verifycode({
      mobile: this.shoujihao,
      verifycode,
      type: "reset"
    }).then(ret => {
      if (ret.code == 0) {
      console.log("成功");
      this.navigate("password",{id:this.shoujihao});
    } else {
     
      this.toast("验证码校验失败，请重新尝试");
    }
  });

  }
}