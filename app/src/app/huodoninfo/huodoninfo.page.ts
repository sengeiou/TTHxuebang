import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { HuodonApi } from 'src/providers/huodon.api';
import { InstApi } from 'src/providers/inst.api';
import { nextTick } from 'q';

@Component({
  selector: 'app-huodoninfo',
  templateUrl: './huodoninfo.page.html',
  styleUrls: ['./huodoninfo.page.scss'],
  providers: [MemberApi, HuodonApi]
})
export class HuodoninfoPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public huodonApi: HuodonApi,
    public instApi: InstApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.huodoninfo = {};
  }
  guize = false;
  yiguoqi = true;
  huodoninfo = null;

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }

  guizezon = "";
  onMyShow(e=undefined) {
    var that = this;
    var huodonapi = this.huodonApi;
    var instapi = this.instApi;
    huodonapi.huodoninfo({
      id: this.params.id
    }).then((huodoninfo) => {


      var date = (new Date().getTime()) / 1000;

      console.log(date);
      console.log(parseInt(huodoninfo.apply_endTime_timespan) + 86400);
      if (date > parseInt(huodoninfo.apply_endTime_timespan) + 86400) {
        this.yiguoqi = true;
      }

      this.huodoninfo = huodoninfo;
        nextTick(()=>{
       
        
        });
    })

    instapi.guize({
      type: 'G', activity_id: this.params.id
    }).then((guize) => {
      var guizezon = '';
      guize.map((item) => {
        guizezon += item.guize + '\n';
      })
      this.guize = false;
      this.guizezon = "";
    })

  }
  guizeclick(e=undefined) {
    this.guize = true;
  }
  closetanchuang(e=undefined) {
    this.guize = false;
  }
  baomin(e=undefined) {
    var that = this;
    var date = (new Date().getTime()) / 1000;
    var huodoninfo = this.huodoninfo;
    console.log(date);
    console.log(parseInt(huodoninfo.apply_endTime_timespan) + 86400);
    if (date < huodoninfo.apply_startTime_timespan) {
      this.showAlert('报名未开始');
      return
    }


    if (date > parseInt(huodoninfo.apply_endTime_timespan) + 86400) {
      this.showAlert('报名已结束');
      return
    }

    this.navigate("baomin", { id: this.params.id });

  }
  jiemuinfo(id,idx) {
    var huodoninfo = this.huodoninfo;
    this.navigate("jiemuxianqin", {
      id: id,
      idd: parseInt(idx + 1),
      vote_startTime_timespan: huodoninfo.vote_startTime_timespan,
      vote_endTime_timespan: huodoninfo.endTime_timespan
    });
  }
  toupiao(id) {
    var that = this;
    var api = this.instApi;
    var date = (new Date().getTime()) / 1000;
    var huodoninfo = this.huodoninfo;
    if (date < huodoninfo.vote_startTime_timespan) {
      this.showAlert("投票暂未开放");
      return
    }

    if (date > parseInt(huodoninfo.vote_endTime_timespan) + 86400) {
      this.showAlert("投票投票已结束暂未开放");
      return
    }

    api.jianchatoupiao({}).then((zige) => {

      if (zige.length == 0) {
        api.toupiao({ jiemu_id: id }).then((res) => {

          if (res.code == 0) {
            this.showAlert("投票成功");
            that.onMyShow();
          }
        })
      }
      else {
        this.showAlert("今日投票次数已达上限，明天再来吧");
      }


    })




  }
  gaodu=0;
   
   jiazaiwanle() {
    var obb=null;
    obb=document.querySelector("#gdd");
      this.gaodu=obb.offsetHeight;
     console.log("加载完了");

  }
}
