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
  selector: 'app-jiemuxianqin',
  templateUrl: './jiemuxianqin.page.html',
  styleUrls: ['./jiemuxianqin.page.scss'],
  providers: [MemberApi, HuodonApi, InstApi]
})
export class JiemuxianqinPage extends AppBase {

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

  }
  toupiao = false;
  yulan = 0;
  onMyLoad() {
    //参数
    this.params;

    this.yulan = this.params.id;
  }
  jiemuinfo = null;
  paimin = "";
  onMyShow() {
    var that = this;
    var huodonapi = this.huodonApi;
    var instapi = this.instApi;
    var yulan = this.yulan;
    if (yulan != undefined) {
      huodonapi.jiemuinfo({
        id: this.params.id
      }).then((jiemuinfo) => {

        console.log(jiemuinfo);
        this.jiemuinfo = jiemuinfo;
        this.paimin = that.params.idd;

      })
    } else {

      let json = JSON.parse(this.options.json);
      var jiemuinfo = null;
      jiemuinfo = {};

      instapi.saiquinfo({ id: json.saiqu_id }).then((res) => {


        jiemuinfo.fenmian = json.fenmian;
        jiemuinfo.saiqu_id_name = res.name;
        jiemuinfo.piaoshu = '暂无';
        jiemuinfo.name = json.name;
        jiemuinfo.renshu = json.renshu;
        jiemuinfo.xuanyan = json.xuanyan;

        jiemuinfo.tupian = json.tupian;

        this.paimin = "暂无";
        this.jiemuinfo = jiemuinfo;


      })


    }


  }
  toupiaoclick() {
    var that = this;
    var api = this.instApi;
    var date = (new Date().getTime()) / 1000;

    if (date < this.params.vote_startTime_timespan) {
      this.toast("投票暂未开放");
      return
    }

    if (date > this.params.vote_endTime_timespan + 86400) {
      this.toast("投票已结束");
      return
    }

    api.jianchatoupiao({}).then((zige) => {

      if (zige.length == 0) {
        api.toupiao({
          jiemu_id: that.params.id
        }).then((res) => {

          if (res.code == 0) {
            this.toast("投票成功");
            that.onMyShow();
          }
          else {
            that.showAlert(res.result);
          }
        })
      } else {
        this.toast("今日投票次数已达上限，明天再来吧~");
      }


    })




  }
  tijiao() {
    var that = this;
    var json = JSON.parse(this.params.json);
    var huodonapi = this.huodonApi;
    console.log(json);

    huodonapi.addjiemu(json).then((res) => {

      console.log(res);


      if (res.code == 0) {
        that.showAlert("报名成功", () => {
          this.back();
        })
      }
      else {
        that.showAlert(res.result);
      }



    })

  }
  fanhui() {

    this.back();

  }
}
