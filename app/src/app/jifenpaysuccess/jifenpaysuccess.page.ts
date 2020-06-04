import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { TeacherApi } from 'src/providers/teacher.api';
import { JigouApi } from 'src/providers/jigou.api';
import { nextTick } from 'q';
import { JifenApi } from 'src/providers/jifen.api';
import { AddressApi } from 'src/providers/address.api';
declare let WeixinJSBridge: any; 

@Component({
  selector: 'app-jifenpaysuccess',
  templateUrl: './jifenpaysuccess.page.html',
  styleUrls: ['./jifenpaysuccess.page.scss'],
  providers: [MemberApi, JifenApi, JigouApi,AddressApi]
})
export class JifenpaysuccessPage extends AppBase {


  constructor(public zone: NgZone, public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public jifenApi: JifenApi,
    public addressApi: AddressApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute, zone);
    this.headerscroptshow = 480;
    this.info={};
  }
  info=null;
  onMyShow() {
    var that = this;
    var jifenapi = this.jifenApi;
    jifenapi.jifenorderinfo({ id: this.params.id }).then((info) => {
      this.info=info;
    })
  }
  towuliu(e) {
    var id = e.currentTarget.id;
  }
  

  submit() {

  }

  gotoOrder(){
    this.navigateTo({
      url: '/jifenorderinfo/jifenorderinfo?id='+this.params.id,
    })
  }
}
