import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-kechen',
  templateUrl: './kechen.component.html',
  styleUrls: ['./kechen.component.scss'],
  providers: [InstApi, MemberApi]
})
export class KechenComponent extends AppBase {

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
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("kechen", "");
    }
  }
}
