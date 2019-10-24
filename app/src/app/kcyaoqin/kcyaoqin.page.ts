import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-kcyaoqin',
  templateUrl: './kcyaoqin.page.html',
  styleUrls: ['./kcyaoqin.page.scss'],
  providers: [MemberApi,JigouApi]
})
export class KcyaoqinPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
      this.kcinfo={};
  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  lujin="";
  erweima="";
  kcinfo=null;
  onMyShow(e=undefined) {
    var api = this.jigouApi;
    var that = this;
    if (this.params.id != undefined) {
      var yaoqinren = this.params.id;
      if (yaoqinren != this.MemberInfo.id) {
        // wx.reLaunch({
        //   url: '/pages/home/home?id=' + yaoqinren,
        // })
        this.navigate("home",{id:yaoqinren});
        return
      }

    }
    this.lujin=ApiConfig.getUploadPath() + this.options.name;
    this.erweima=ApiConfig.getApiUrl() + "inst/qrcode?inst_id=1&url=/pages/kcdetails/kcdetails?yaoqin_id=" + this.MemberInfo.id + '%26id=' + this.params.kcid;


    var kcid = this.params.kcid;
    api.courseinfo({ id: kcid }).then((kcinfo) => {
      this.kcinfo=kcinfo;
    })
  }
  baocun(e=undefined) {
    //todo
    //this.download(this.lujin);
  }
  // onShareAppMessage(e) {
  //   return {
  //     title: this.InstInfo.zhuanfatishi,
  //     desc: '分享页面的内容',
  //     path: '/pages/kcdetails/kcdetails?yaoqin_id=' + this.MemberInfo.id + '&&id=' + this.params.kcid
  //   }
  // }
}
