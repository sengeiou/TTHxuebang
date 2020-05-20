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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[InstApi,MemberApi,UserbApi,AliyunApi]
})
export class RegisterComponent extends AppBase {
  instinfo = null;
  loading = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public userbApi:UserbApi,
    public aliyunApi:AliyunApi
  ) {
    super(router,activeRoute,instApi,userbApi);
    this.isLoginPage=true;
   
   }
  
  
   onMyLoad(){
     this.params;
     this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
      });
    
   }
   num=1;
   name='';
   email='';
   password='';
   password2='';
   address='';
   mobile='';
   gonsi='';
   zhizhao='';
   onMyShow(){
    
   }

   errorname="";
  
   afterupload(e){
    console.log(e.file)
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if(e.type=="success"){
     this.zhizhao=e.file.response.result;
    }else if(e.type=='removed'){
      this.zhizhao='';
    }
  }
  errorgonsi="";
  errormobile="";
  errorpassword="";
  erroraddress="";
  errorzhizhao="";
  submit(){
    var iserror=false;
    if(this.gonsi.trim()==""){
      iserror=true;
      this.errorgonsi="机构信息不能为空";
    }
    if(this.name.trim()==""){
      iserror=true;
      this.errorname="姓名不能为空";
    }
    if(this.mobile.trim()==""){
      iserror=true;
      this.errormobile="电话不能为空";
    }
    if(this.password.trim()==""){
      iserror=true;
      this.errorpassword="密码不能为空";
    }else if(this.password!=this.password2){
      iserror=true;
      this.errorpassword="两次密码不一致";
    }

    if(this.address.trim()==""){
      iserror=true;
      this.erroraddress="公司地址不能为空";
    }
    if(this.zhizhao==""){
      iserror=true;
      this.errorzhizhao="营业执照不能为空";
    }
    if(iserror==true){
      return;
    }
    this.userbApi.register({
      name:this.name,
      mobile:this.mobile,
      email:this.email,
      password:this.password,
      gonsi:this.gonsi,
      address:this.address,
      zhizhao:this.zhizhao
    }).then((res:any)=>{
      if(res.code=='0'){
        console.log(11);
        var token=res.return;
        window.sessionStorage.setItem("token",token);
        window.location.href="/";
      }else {
        this.toast(res.result);
      }
    })
  }
  mobilechange(){
    this.mobileerror="";
  }
  verifycode="";
  resendreminder=0;
  mobileerror="";
  getVerifyCode(){
    if(!(this.mobile[0]=="1"&&this.mobile.length==11)){
      this.mobileerror="请输入正确的手机号码";
      return;
    }
    this.aliyunApi.sendverifycode({mobile:this.mobile,type:"register"}).then((ret:any)=>{
      this.resendreminder=60;
        var timeresend=setInterval(()=>{
          this.resendreminder--;
          if(this.resendreminder==0){
            clearInterval(timeresend);
          }
        },1000);
    });
  }
}