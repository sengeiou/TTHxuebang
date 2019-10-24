import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides, IonInfiniteScroll } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-forcopy',
  templateUrl: './forcopy.page.html',
  styleUrls: ['./forcopy.page.scss'],
  providers:[MemberApi]
})
export class ForcopyPage  {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {

    for(var i=0;i<100;i++){
      this.list.push(i);
    }
  }
  list=[];
  loadData(e){
    alert(1);
    for(var i=0;i<100;i++){
      this.list.push(i);
    }
  }
  ionViewDidEnter(){
    alert(this.infiniteScroll.disabled);
  }
}
