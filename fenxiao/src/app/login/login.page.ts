import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AliyunApi } from 'src/providers/aliyun.api';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class LoginPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public aliyunApi: AliyunApi,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  zhuce() {

    this.navigate("register");
  }
  onMyLoad() {
    //参数
    this.params;
    this.needlogin = true;
  }
  onMyShow() {


  }
  type = "Y";
  mima2 = false;
  shoujihao = '';
  password = '';
  login() {
    var shoujihao = this.shoujihao;
    var password = this.password;
    var yanzhenma = this.yanzhenma;
    var that=this;
    var api = this.memberApi;

    if (this.type == 'N') {
      api.login({ mobile: shoujihao, password: password }).then((res) => {

        if (res.code == 0) {

          window.localStorage.setItem("UserToken", res.return)

          
      

            that.navigate("/tabs/tab1");
        

        }
        else {

          this.toast(res.result);


        }


      })
    }
    else {

      this.aliyunApi.verifycode({
        mobile: this.shoujihao,
        verifycode: yanzhenma,
        type: "login"
      }).then(ret => {
        if (ret.code == 0) {
          api.login({ mobile: shoujihao,yanzhen:'Y'}).then((res) => {

            if (res.code == 0) {

              window.localStorage.setItem("UserToken", res.return)
             
 
                that.navigate("/tabs/tab1");
            
              

            }
            else {

              this.toast(res.result);


            }


          })

        } else {

          this.toast("验证码校验失败，请重新尝试");
        }
      });


    }


  }
  forgetpsw() {
    console.log("阿森松岛")
    this.navigate("forgetpassword");

  }

  diyici = false;
  reminder = 0;

  timer = null;
  yanzhenma = "";

  sendVerifyCode() {





    // this.inverify = true;
    this.aliyunApi.sendverifycode({
      mobile: this.shoujihao,
      type: "login"
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
    var that = this;

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
}
