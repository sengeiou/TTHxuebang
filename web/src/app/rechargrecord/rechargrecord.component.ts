import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';


@Component({
  selector: 'app-rechargrecord',
  templateUrl: './rechargrecord.component.html',
  styleUrls: ['./rechargrecord.component.scss'],
  providers: [InstApi, MemberApi,UserbApi]
})
export class RechargrecordComponent extends AppBase {

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
  }
  instrecharge=[];
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("asset", "asset1");
    }
    this.userbApi.instdeposit({
      type:'A'
    }).then((instrecharge:any)=>{
      var arr=[];
      for(let item of instrecharge){
        if(item.mechanism_id==0){
          arr.push(item);
        }else if(item.mechanism_id==this.params.jg_id){
          arr.push(item);
        }else {}
      }
      this.instrecharge=arr;
      this.pagination(arr,arr.length);
    })
  }
}
