import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { WechatApi } from 'src/providers/wechat.api';

@Component({
  selector: 'app-tixian',
  templateUrl: './tixian.page.html',
  styleUrls: ['./tixian.page.scss'],
  providers: [MemberApi, JigouApi, WechatApi]
})
export class TixianPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public wechatApi: WechatApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
    this.fenixaoinfo = {};
  }
  jiner = 0;
  name = '';
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  problemlist = [];
  fenixaoinfo = null;
  onMyShow(e=undefined) {
    var that = this;
    var api = this.jigouApi;;
    api.problemlist({ chanjin: 'tx' }).then((problemlist) => {
      this.problemlist = problemlist;

    })
    api.fenxiaoinfo({}).then((fenixaoinfo) => {
      this.fenixaoinfo = fenixaoinfo;
    })

    console.log(this.MemberInfo.tuiguanshouyi);
  }
  mingxi(e=undefined) {
        
    this.navigate("mingxi")

  }
  quanbu(e=undefined) {
    console.log(123132);
    this.jiner = this.MemberInfo.tuiguanshouyi;
  }
  tishi1 = false;
  tishi2 = false;
  tishi3 = false;
  tixian(e=undefined) {
    var api = this.wechatApi;
    this.tishi1 = false;
    this.tishi2 = false;
    this.tishi3 = false;


    var jiner = Number(this.jiner);
    var name = this.name;
    if (jiner == 0) {
      this.tishi2=true;
      return
    }
    if (jiner < 0 || jiner > 5000) {
      this.tishi1=true;
      return
    }
    if (jiner > this.MemberInfo.tuiguanshouyi) {
      this.tishi3=true;
      return
    }
    api.tixianjilu({ realname: this.fenixaoinfo[0].reainame, amount: jiner }).then((res) => {
      // this.showAlert("提现申请已发送");
      this.showAlert("提现申请已发送")
    })

  }
  shuru(e) {
    this.jiner=parseInt(e.detail.value);
  }
  shuru1(e) {
    this.name=(e.detail.value);
  }

}
