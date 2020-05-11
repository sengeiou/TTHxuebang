import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[UserbApi,InstApi]
})
export class ForgetPasswordComponent extends AppBase {
  instinfo=null;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

    this.isLoginPage = true;
  }
  
  email="";
  isinvalid=false;
  invalidtext="";

  onMyLoad() {
    this.params;
    this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
    });
  }
  onMyShow() {

  }
  sendreset(){
    this.email=this.email.trim();
    //alert(this.email);
    if(this.email==''||this.checkMailFormat(this.email)==false){
      this.isinvalid=true;
      this.invalidtext="Please enter a vaild email address";
      return;
    }
    var vk=window.location.href.split("/");
    var url=vk[0]+"//"+vk[2]+"/resetpassword";
    // this.memberApi.requestresetpassword({email:this.email,reseturl:url}).then((res:any)=>{
    //   //alert(res.code);
    //   if(res.code==0){
    //     this.navigate("resetpassword",{email:this.email});
    //   }else{
    //     this.isinvalid=true;
    //     this.invalidtext="Email address is not avaiable, please try to contact platform support";
    //   }
    // });
  }


}
