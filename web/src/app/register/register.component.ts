import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[InstApi,MemberApi,UserbApi]
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
  submit(){
    if(this.name.trim()==""){
      this.toast('请输入姓名');
      return
    }
    if(this.email.trim()==""){
      this.toast('请输入邮箱');
      return
    }
    if(this.mobile.trim()==""){
      this.toast('请输入电话');
      return
    }
    if(this.password.trim()==""){
      this.toast('请输入密码');
      return
    }
    if(this.password!=this.password2){
      this.toast('密码不一致');
      return
    }
    if(this.gonsi.trim()==""){
      this.toast('请输入公司名称');
      return
    }
    if(this.address.trim()==""){
      this.toast('请输入公司地址');
      return
    }
    if(this.zhizhao==""){
      this.toast('请输入营业执照');
      return
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
        // window.location.href="/";
        this.navigate('/jigou');
      }else {
        this.toast(res.result);
      }
    })
  }
}