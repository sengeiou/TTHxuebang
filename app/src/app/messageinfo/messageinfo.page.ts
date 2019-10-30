import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PurchaseApi } from 'src/providers/purchase.api';

@Component({
  selector: 'app-messageinfo',
  templateUrl: './messageinfo.page.html',
  styleUrls: ['./messageinfo.page.scss'],
  providers: [MemberApi, JigouApi, PurchaseApi]
})
export class MessageinfoPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouapi: JigouApi,
    public purchaseapi: PurchaseApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
    this.courseinfo = {};
    this.info = {};
  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  info = null;
  courseinfo = null;
  kclist = [];
  onMyShow(e=undefined) {
    var that = this;
    var api = this.memberApi;
    var jigouapi = this.jigouapi;
    var purchaseapi = this.purchaseapi;
    api.favcourselist({}).then((kclist) => {
      this.kclist = kclist;
    });


    purchaseapi.purchaseinfo({
      id: this.params.id
    }).then((info) => {
      this.info = info;

      jigouapi.courseinfo({
        id: info.course_id
      }).then((courseinfo) => {
        this.courseinfo = courseinfo;
      })

    });

  }
  todetails(e) {
    this.navigate("kcdetails", { id: this.courseinfo.id });
  }


}
