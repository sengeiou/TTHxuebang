import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-wuliu',
  templateUrl: './wuliu.page.html',
  styleUrls: ['./wuliu.page.scss'],
  providers: [MemberApi, JifenApi]
})
export class WuliuPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jifenApi: JifenApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
    // this.wuliu = {};
  }
  wuliu = {
    result:{
      logo:'',
      expName:'',
      number:''
    }
  };
  wllist = [];
  info = null;
  onMyShow(e=undefined) {
    var that = this;
    var jifenapi = this.jifenApi;;

    jifenapi.jifenorderinfo({ id: this.params.id }).then((info) => {

      jifenapi.wuliu({ type: info.wuliu_company_type, no: info.airwaybill }).then((wuliu) => {
        var wuliulist = wuliu.result.list;
        var wllist = [];

        for (var i = wuliulist.length - 1; i >= 0; i--) {
          wllist.push(wuliulist[i]);
        }
        this.wuliu = wuliu;
        this.wllist = wllist;
      })
      this.info = info;


    })


  }



}
