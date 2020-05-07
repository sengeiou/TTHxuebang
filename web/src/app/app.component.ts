import { Component } from '@angular/core';
import { InstApi } from 'src/providers/inst.api';
import { AppBase } from './AppBase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[InstApi]
})
export class AppComponent {
  title = 'tthxb';
  toggle=false;
  instinfo=null;
  
  constructor(public instApi:InstApi){
    this.instinfo={};
    this.instApi.info({unicode:"tthxb"}).then((instinfo)=>{
      this.instinfo=instinfo;
    });
  }
  toggleSidebar(){
    this.toggle=!this.toggle;
  }
}
