import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
  providers: [MemberApi, InstApi, JigouApi]
})
export class CityPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public jigouApi: JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }

  CurrentName = "";
  locationCityCode = "";
  usecitylist=[];

  onMyShow(e=undefined) {
    var that = this;
    var memberapi = this.memberApi;

    this.CurrentName = AppBase.CITYNAME;
    this.CurrentName = AppBase.CITYNAME;
    var address = this.address;
    // var citycode = address.ad_info.adcode.substr(0, 4) + "00";
    // this.locationCityCode = citycode;
    memberapi.usecitylist({}).then((usecitylist) => {
      this.usecitylist = usecitylist;
    });
  }
  setCity(id) {
    var MemberInfo = this.MemberInfo;
    var citylist = MemberInfo.citylist;
    for (var i = 0; i < citylist.length; i++) {
      if (id == citylist[i].id) {
        AppBase.CITYID = citylist[i].id;
        AppBase.CITYNAME = citylist[i].name;
        AppBase.CITYSET = true;
        var memberapi = this.memberApi;
        memberapi.usecity({
          city_id: AppBase.CITYID
        });
      }
    }

    this.back();
  }
}
