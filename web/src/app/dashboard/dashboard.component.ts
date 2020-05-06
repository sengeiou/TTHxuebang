import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { UserbApi } from 'src/providers/userb.api';
import { MainComponent } from '../main/main.component';

declare let Chart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [InstApi, MemberApi]
})
export class DashboardComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);
  }


  latestorder = [];
  processcount=0;
  humancount=0;
  ordercount=0;
  infomsgcount=0;
  onMyShow() {


    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("home", "");
    }

    // this.memberApi.kehudashboard({}).then((ret: any) => {
    //   if(ret==undefined){
    //     return;
    //   }


    //   this.humancount = ret.humancount;
    //   this.ordercount = ret.ordercount;
    //   this.infomsgcount = ret.infomsgcount;
    //   this.processcount = ret.processcount;


    //   this.latestorder=ret.latestorder;

    // });


  }

  

}
