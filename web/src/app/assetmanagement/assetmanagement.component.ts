import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
import { AppUtil } from '../app.util';
@Component({
  selector: 'app-assetmanagement',
  templateUrl: './assetmanagement.component.html',
  styleUrls: ['./assetmanagement.component.scss'],
  providers: [InstApi, MemberApi,UserbApi]
})
export class AssetmanagementComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
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
  }
  allinst=[];
  allcurriculum=[];
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("asset", "asset1");
    }
    var now = new Date();
    var year = now.getFullYear();
    this.today = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.datefrom = year + "-" + AppUtil.ten2(1) + "-" + AppUtil.ten2(1);
    this.dateto = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.search();
  }
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
