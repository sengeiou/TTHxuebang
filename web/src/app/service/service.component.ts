import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
import { WechatApi } from 'src/providers/wechat.api';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,WechatApi]
})
export class ServiceComponent extends AppBase {

  
  static paycheck=null;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public wechatApi: WechatApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }

  onMyLoad() {
    this.params;
    this.hidemodel();
  }
  tabtype = 'readservice';//'readservice';
  agree=false;
  payurl="";
  kk=0;
  onMyShow() {
    this.wechatApi.payqrcode({}).then((ret:any)=>{
      this.payurl=ret.return;
    });
    this.kk=(new Date()).getTime();
    ServiceComponent.paycheck=this.kk;
    this.checkifpay();
  }

  checkifpay(){
    this.userbApi.userinfo({}).then((info:any)=>{
      if(info.issign_value=='Y'){
       this.tabtype = 'paysuccess';
      }else{
        if(ServiceComponent.paycheck==this.kk){
          setTimeout(()=>{
            this.checkifpay();
          },1000);
        }
      }
    });
  }

  tongyi(){
    this.agree=!this.agree;
  }
  xiayibu(){
    if(this.agree==false){
      this.toast('勾选协议！');
      return
    }
    this.tabtype='deposit';
  }
  backstep(){
    this.tabtype='readservice';
  }
  quxiao(){
    this.navigate('addjigou',{deposit:true});
  }
  downloadAgreement(){
    window.open(this.uploadpath+"inst/"+this.InstInfo.agreementfile)
  }
}
