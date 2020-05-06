import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { KehuApi } from 'src/providers/kehu.api';
import { HumanApi } from 'src/providers/human.api';
import { OrderApi } from 'src/providers/order.api';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [InstApi, MemberApi, KehuApi, HumanApi, OrderApi]
})
export class SearchComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public kehuApi: KehuApi,
    public humanApi: HumanApi,
    public orderApi: OrderApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }

  keyword = "";
  inputkeyword = "";
  humanlist = [];
  orderlist = [];

  onMyLoad() {
    this.params;
    if (this.params.key != undefined) {
      this.inputkeyword = this.params.key;
    }
  }

  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("search", "");
    }
    this.search();
  }
  tab = "human";
  search() {
    this.keyword = this.inputkeyword;
    if (this.keyword == "") {
      this.humanlist = [];
      this.orderlist = [];
      return;
    }
    this.humanApi.humanlist({ issearch: "Y", keyword: this.keyword, orderby: "r_main.shijian desc" }).then((humanlist: []) => {
      this.humanlist = humanlist;
    });
    this.orderApi.orderlist({ issearch: "Y", keyword: this.keyword, orderby: "r_main.shijian desc" }).then((orderlist: []) => {
      this.orderlist = orderlist;
    });
  }
}
