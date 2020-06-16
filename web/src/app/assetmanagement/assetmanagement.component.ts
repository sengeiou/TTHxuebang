import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
import { WechatApi } from 'src/providers/wechat.api';
import { AppUtil } from '../app.util';
@Component({
  selector: 'app-assetmanagement',
  templateUrl: './assetmanagement.component.html',
  styleUrls: ['./assetmanagement.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,WechatApi]
})
export class AssetmanagementComponent extends AppBase {

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

  onMyLoad() {
    this.params;

    this.instApi.allinst({}).then((allinst:any)=>{
      this.allinst=allinst;
    })
    this.userbApi.allcurriculum({}).then((allcurriculum:any)=>{
      this.allcurriculum=allcurriculum;
    })
    if(this.params.jg_id!=undefined){
      this.mechanism_id=this.params.jg_id;
    }
  }
  allinst=[];
  allcurriculum=[];
  payurl='';
  money=0;
  isdisabled=true;
  onMyShow() {
    var date = new Date();
    var today=date.getTime();
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("asset", "asset1");
    }

    this.wechatApi.payqrcode2({jg_id:this.mechanism_id}).then((ret:any)=>{
      this.payurl=ret.return;
    });

    this.userbApi.instdeposit({}).then((instdeposit:any)=>{
      console.log(instdeposit,'instdeposit')
      var yinian = Number( instdeposit[instdeposit.length-1].op_date.slice(0,4))+ 1 + instdeposit[instdeposit.length-1].op_date.slice(4,instdeposit[instdeposit.length-1].op_date.length);
      if(today - new Date(yinian).getTime()>=0  ){
        this.isdisabled=false;
      }
    })

    this.userbApi.instdetail({id:this.mechanism_id}).then((instdetail:any)=>{
      this.instdetail=instdetail;
      this.money=-instdetail.advancepayment+1000;
    })

    var now = new Date();
    var year = now.getFullYear();
    this.today = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.datefrom = year + "-" + AppUtil.ten2(1) + "-" + AppUtil.ten2(1);
    this.dateto = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.search();
  
  }
  instdetail={
    advancepayment:0
  };
  datefrom = "";
  dateto = "";
  today = "";
  orderno="";
  deductiontype='';
  mechanism_id='';
  kecheng_id='';
  instdeposit=[];
  search(){
    this.pageList=[];
    this.userbApi.instdeposit({
      deductiontype:this.deductiontype,
      mechanism_id:this.mechanism_id,
      kecheng_id:this.kecheng_id,
      type:'C'
    }).then((instdeposit:any)=>{
      var arr=[];
      for(let item of instdeposit){
        if(this.orderno==''){
          if(new Date(item.op_date_dateformat).getTime()>=new Date(this.datefrom).getTime() && new Date(item.op_date_dateformat).getTime()<=new Date(this.dateto).getTime()){
            arr.push(item);
          }
        }else {
          if(item.purchase_orderno==this.orderno){
            // arr.push(item);
            if(new Date(item.op_date_dateformat)>=new Date(this.datefrom) && new Date(item.op_date_dateformat)<=new Date(this.dateto)){
              arr.push(item);
            }
          }
        }
       
       
      }
      this.instdeposit=arr;
      this.pagination(arr,arr.length);
    })
  }
  reset(){
    this.orderno='';
    this.deductiontype='';
    this.kecheng_id='';
    this.mechanism_id='';
    this.onMyShow();
  } 
}
