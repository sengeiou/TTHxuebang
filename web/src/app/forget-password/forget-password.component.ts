import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[UserbApi,InstApi,AliyunApi]
})
export class ForgetPasswordComponent extends AppBase {
  instinfo=null;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
    public aliyunApi: AliyunApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

    this.isLoginPage = true;
  }
  

  isinvalid=false;
  invalidtext="";
  reminder=0;
  mobile='';
  yanzhenma='';
  onMyLoad() {
    this.params;
    this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
    });
  }
  onMyShow() {

  }
  error='';
 
  sendyanzhenma(){
    if (!(this.mobile[0] == "1" && this.mobile.length == 11)) {
      this.error = "请输入正确的手机号码";
      return;
    }
    this.aliyunApi.sendverifycode({
      mobile:this.mobile,
      type:"reset"
    }).then((res:any)=>{
      
        this.reminder=60;

        var k =  setInterval(() => {
            this.reminder--;
          if (this.reminder == 0) {
            clearInterval(k);
          }
          console.log(this.reminder);
        }, 1000);
    })
  }
  password='';
  password2='';
  errorpassword='';
 
  errorverifycode='';
  queding(){
    if (this.password == "" || this.password.length < 8) {
      this.errorpassword = "密码不能为空且不得小于8位数";
    } else if (this.password != this.password2) {
      this.errorpassword = "两次密码不一致";
    }
    this.aliyunApi.verifycode({ mobile: this.mobile, verifycode: this.yanzhenma, type: "reset" }).then((ret: any) => {
      if (ret.code != '0') {
        this.errorverifycode = "验证码不正确";
        return;
      }
      this.userbApi.resetpwd({
        type:'reset',
        mobile:this.mobile,
        newpassword:this.password2
      }).then((res:any)=>{
        if(res.code=='0'){
          this.succ('设置成功');
          this.navigate('/login');
        }else {
          this.error=res.result;
        }
      })
    })
    

  } 

}
