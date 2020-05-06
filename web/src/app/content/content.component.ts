import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { ContentApi } from 'src/providers/content.api';
import { AppUtil } from '../app.util';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers:[ContentApi]
})
export class ContentComponent extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public contentApi:ContentApi,
    public userbApi:UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

    this.isLoginPage = true;
  }
  keycode="";
  title="";
  content="";
  onMyLoad(){
    this.keycode=this.params.keycode;
    this.contentApi.get({keycode:this.keycode}).then((content:any)=>{
      console.log(content);
      this.title=content.name;
      this.content=AppUtil.HtmlDecode( content.content);
    });
  }
  

}
