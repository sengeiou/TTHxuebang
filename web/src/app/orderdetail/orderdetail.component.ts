import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
import { PurchaseApi } from 'src/providers/purchase.api';


@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,PurchaseApi]
})
export class OrderdetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
    public purchaseApi: PurchaseApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }

  onMyLoad() {
    this.params;
  }
  purchaseinfo:any={};
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "");
    }

    this.purchaseApi.purchaseinfo({id:this.params.id}).then((purchaseinfo:any)=>{
      this.purchaseinfo=purchaseinfo;
      console.log(this.purchaseinfo)
    })
  }
}
