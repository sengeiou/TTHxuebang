import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[InstApi,MemberApi]
})
export class ListComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public userbApi:UserbApi,
  ) {
    super(router,activeRoute,instApi,userbApi);
    
   }
  
   onMyLoad(){
     this.params;
   }
   onMyShow(){
     
   }
}
