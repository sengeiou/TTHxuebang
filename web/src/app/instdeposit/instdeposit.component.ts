import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';


@Component({
  selector: 'app-instdeposit',
  templateUrl: './instdeposit.component.html',
  styleUrls: ['./instdeposit.component.scss'],
  providers: [InstApi, MemberApi,UserbApi]
})
export class InstdepositComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
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
}
