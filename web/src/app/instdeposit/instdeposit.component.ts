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
  selector: 'app-instdeposit',
  templateUrl: './instdeposit.component.html',
  styleUrls: ['./instdeposit.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,WechatApi]
})
export class InstdepositComponent extends AppBase {
  static paycheck=null;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
    public wechatApi: WechatApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }
  allinst=[];
  allcurriculum=[];
  isdisabled=true;
  onMyLoad() {
    this.params;
    
    var date = new Date();
    var today=date.getTime();
    this.userbApi.allcurriculum({}).then((allcurriculum:any)=>{
      this.allcurriculum=allcurriculum;
    })
    this.userbApi.instdeposit({}).then((instdeposit:any)=>{
      console.log(instdeposit);
      if(instdeposit.length>0){
        var yinian = Number( instdeposit[0].op_date.slice(0,4))+ 1 + instdeposit[0].op_date.slice(4,instdeposit[0].op_date.length);

        if(today - new Date(yinian).getTime()>=0  ){
          this.isdisabled=false;
        }
      }
    })
  }
  payurl='';
  money=0;
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("asset", "asset1");
    }
    this.instApi.allinst({}).then((allinst:any)=>{
      this.allinst=allinst;
      this.pagination(allinst,allinst);
    })
  }
  tixian(item){

  }
  koujilu(item){
    this.navigate('/assetmanagement',{jg_id:item.id});
  }
  chojilu(item){
    this.navigate('/rechargrecord',{jg_id:item.id});
  }
  kk=0;
  jg_id='';
  xuanze(item){
    this.money=-item.advancepayment+1000;
    this.wechatApi.payqrcode2({jg_id:item.id}).then((ret:any)=>{
      this.payurl=ret.return;
      
    });
    this.jg_id=item.id;
    this.kk=(new Date()).getTime();
    InstdepositComponent.paycheck=this.kk;
    this.checkifpay();
  }
  checkifpay(){

    this.userbApi.instdetail({id:this.jg_id}).then((instdetail:any)=>{
      if(instdetail.advancepayment>0){
        this.onMyShow();
        this.hidemodel();
      }else {
        if(InstdepositComponent.paycheck==this.kk){
          setTimeout(()=>{
            this.checkifpay();
          },1000);
        }
      }
    })
  }
}
