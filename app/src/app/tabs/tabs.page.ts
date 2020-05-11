import { Component } from '@angular/core';
import { AppBase } from '../AppBase';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  static Instance:TabsPage=null;
  currentpage="tab1";
  constructor() {
  }
  ionViewDidEnter() {

    
    TabsPage.Instance=this;
    console.log(TabsPage.Instance,'歷史')
    if (AppBase.LASTTAB != null) {
      AppBase.LASTTAB.ionViewDidEnter();
    }

  }

}
