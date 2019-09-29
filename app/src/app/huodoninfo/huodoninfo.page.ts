import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { HuodonApi } from 'src/providers/huodon.api';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-huodoninfo',
  templateUrl: './huodoninfo.page.html',
  styleUrls: ['./huodoninfo.page.scss'],
  providers: [MemberApi, HuodonApi]
})
export class HuodoninfoPage extends AppBase {

  constructor(public router: Router,
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

  onMyLoad() {
    //参数
    this.params;
  }

  guizezon = "";
  onMyShow() {
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

    })

    instapi.guize({
      type: 'G', activity_id: this.params.id
    }).then((guize) => {
      var guizezon = '';
      guize.map((item) => {
        guizezon += item.guize + '\n';
      })
      this.guize = true;
      this.guizezon = "";
    })

  }
  guizeclick() {
    this.guize = true;
  }
  closetanchuang() {
    this.guize = false;
  }
  baomin() {
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
  jiemuinfo(e) {
    var huodoninfo = this.huodoninfo;
    this.navigate("jiemuxianqin", {
      id: e.target.id,
      idd: parseInt(e.target.dataset.id + 1),
      vote_startTime_timespan: huodoninfo.vote_startTime_timespan,
      vote_endTime_timespan: huodoninfo.endTime_timespan
    });
  }
  toupiao(e) {
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
        api.toupiao({ jiemu_id: e.target.id }).then((res) => {

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

  // todo
  // jiazaiwanle() {
  //   var that = this;
  //   var query = wx.createSelectorQuery();
  //   query.select('#gdd').boundingClientRect();
  //   query.exec((res) => {
  //     //res就是 所有标签为mjltest的元素的信息 的数组
  //     console.log(res);
  //     console.log("哈哈哈哈");
  //     console.log(res[0].height);
  //     console.log(AppBase.Model);
  //     that.Base.setMyData({ gaodu: res[0].height });
  //   })
  // }
}
