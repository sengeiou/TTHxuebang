import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-jigou',
  templateUrl: './jigou.component.html',
  styleUrls: ['./jigou.component.scss'],
  providers: [InstApi, MemberApi]
})
export class JigouComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }
  time='';
  name='';
  onMyLoad() {
    this.params;
  }
  allinst=[];
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("jigou", "");
    }
    this.search();
  }
  search(){
    this.instApi.allinst({
      time:this.time,
      name:this.name
    }).then((allinst:any)=>{
      this.allinst=allinst;
      this.pagination(allinst,allinst.length);
    })
  }
  reset(){
    this.time='';
    this.name='';
    this.onMyShow();
  }
}
