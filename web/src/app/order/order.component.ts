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
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,PurchaseApi]
})
export class OrderComponent extends AppBase {

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
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "");
    }
    this.pageList=[];
    this.search();
    
  }

  orderno='';
  name='';
  tuanno='';
  phone='';
  orderlist=[];
  seashow = false;
  search(){
    this.pageList=[];
    if(this.name.trim()!="" || this.orderno.trim()!=""|| this.phone.trim()!=""){
      this.seashow=true;
    }
    this.userbApi.orderlist({
      orderno:this.orderno,
      phone:this.phone,
    }).then((orderlist:any)=>{
      var arr=[];
      for(let item of orderlist){
        if(item.member_id_name.indexOf(this.name)>-1){
          arr.push(item);
        }
      }
      console.log(arr);
      this.orderlist=arr;
      this.pagination(this.orderlist,this.orderlist.length);
    })
  }
  reset(){
    this.name='';
    this.orderno='';
    this.phone='';
    this.seashow=false;
    this.onMyShow();
  }
  todetail(item){
    this.navigate('/orderdetail',{id:item.id})
  }
}