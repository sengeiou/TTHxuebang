import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { InfoboxApi } from 'src/providers/infobox.api';
import { UserbApi } from 'src/providers/userb.api';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [InstApi, MemberApi, InfoboxApi,UserbApi]
})
export class MainComponent extends AppBase {
  static Instance: MainComponent = null;
  instinfo = null;
  toggle = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public infoboxApi: InfoboxApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);
    this.instinfo = {};
    this.instApi.info({ unicode: "tthxb" }).then((instinfo) => {
      this.instinfo = instinfo;
    });
    MainComponent.Instance = this;
  }


  module = "home";
  module2 = "";


  onMyLoad() {

  }

  newhuman = 0;
  neworder = 0;

  onMyShow() {
    var today = new Date();
    var timespan = today.getTime();

    // this.memberApi.keywordquick({iskehu:"Y"}).then((list: []) => {
    //   this.searchkeyquicklist = list;
    // });

    //alert(this.memberinfo.expireddatetimespan);
    //alert(this.memberinfo.expireddatetimespan/24/3600/1000);
    //alert(timespan/24/3600/1000);
    if (this.memberinfo != null
      && this.memberinfo.issign_value!='Y') {
      this.warning("入驻提醒", "您还未入驻本学榜平台，请点击<a href='/service'>这里快速入驻</a>");
    }
  }


  setModule(module, module2) {
    this.module = module;
    this.module2 = module2;
    this.refreshSummary();
  }
  recentunreadlist = [];
  infoboxsummary = {
    unreadcount: 0
  };
  searchkey = "";

  searchkeyquicklist = [];


  refreshSummary() {
    this.searchkey="";

    this.infoboxApi.list({ receivetype: "B", "readtype": "A", "limit": "0,5" }).then((recentunreadlist: []) => {
      this.recentunreadlist = recentunreadlist;
    });
    this.infoboxApi.summary({ receivetype: "B" }).then((infoboxsummary: any) => {
      this.infoboxsummary = infoboxsummary;
    });
  }

  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;

  }
  changlan(val) {
    console.log(val, '123123')
    window.localStorage.setItem("langcode", val);
    window.location.reload();
  }
  getSearchList(key){
    var list=[];
    for(var item of this.searchkeyquicklist){
      if(item.name.indexOf(key)>-1){
        list.push(item);
        if(list.length>=7){
          return list;
        }
      }
    }
    return list;
  }
  zhan(){
    this.toast('暂未开放!');
    return
  }
}
