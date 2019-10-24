import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { HaibaoApi } from 'src/providers/haibao.api';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.page.html',
  styleUrls: ['./groupinfo.page.scss'],
  providers: [MemberApi, JigouApi,HaibaoApi]
})
export class GroupinfoPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public haibaoApi:HaibaoApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.pintuaninfo = {};
  }
  timer;
  onMyLoad(e=undefined) {
    //参数
    this.params;
    this.daojishi();
  }
  onUnload(e=undefined) {
    console.error(66666);
    clearInterval(this.timer);


  }
  onHide(e=undefined) {
    console.error(66666);
    clearInterval(this.timer);


  }
  fenxianle = false;
  pintuaninfo = null;
  daojishilist = [];
  chajia = 0;
  onMyShow(e=undefined) {
    var that = this;
    var api = this.jigouApi;
    this.fenxianle = false;
    api.pintuaninfo({ id: this.params.id }).then((pintuaninfo) => {
      if (pintuaninfo.type == 'T') {
        pintuaninfo.price = Number(Number(pintuaninfo.expeprice).toFixed(2));
        pintuaninfo.group_course_group_price = Number(Number(pintuaninfo.group_course_group_expeprice).toFixed(2));
      }
      else {
        pintuaninfo.price = Number(Number(pintuaninfo.price).toFixed(2));
        pintuaninfo.group_course_group_price = Number(Number(pintuaninfo.group_course_group_price).toFixed(2));
      }

      pintuaninfo.group_course_group_number = parseInt(pintuaninfo.group_course_group_number);
      console.error(pintuaninfo);
      var daojishilist = [];
      daojishilist[0] = pintuaninfo.jieshushijian;
      this.pintuaninfo = pintuaninfo;
      this.daojishilist = daojishilist;
      this.chajia = Number((pintuaninfo.price - pintuaninfo.group_course_group_price).toFixed(2));

    })

  }
  sjlist = [];
  daojishi(e=undefined) {
    var that = this;
    this.timer = setInterval(() => {
      var list = that.daojishilist;
      var sjlist = [];
      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        var jisuandate = new Date(list[i].replace(/-/g, '/'));
        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        if (dateDiff < 0) {
          dateDiff = 0;
        }
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000)));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000)));   //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000)));//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));
        sjlist.push(listtt);
      }
      console.log("循环");
      this.sjlist = sjlist;


    }, 1000);

  }
  yuanjiagoumai(e=undefined) {
    var leixin = this.pintuaninfo.type;
    leixin = leixin == 'T' ? '1' : '0';
    this.navigate("purchase", {
      course_id: this.pintuaninfo.group_course_course_id,
      leixin: leixin
    });
  }
  chakankechen(e=undefined) {
    this.navigate("kcdetails", {
      id: this.pintuaninfo.group_course_course_id
    });
  }
  kaigexintuan(e=undefined) {
    var leixin = this.pintuaninfo.type;
    leixin = leixin == 'T' ? '1' : '0';
    this.navigate("purchase",{
      course_id:this.pintuaninfo.group_course_course_id,
      type:0,
      leixin:leixin
    });

  }
  laren(e=undefined) {
    this.onShareAppMessage();
  }
  addgroup(e=undefined) {
    var leixin = this.pintuaninfo.type;
    leixin = leixin == 'T' ? '1' : '0';
    this.navigate("purchase",{
      course_id:this.pintuaninfo.group_course_course_id,
      type:this.params.id,
      leixin
    });
  }
  fenxian(e=undefined) {

    if (this.fenxianle) {
      return;
    }
    this.fenxianle=true;

    var tz = this.pintuaninfo.commander_id == this.MemberInfo.id ? '1' : '0';
 
    var api = this.haibaoApi;
    api.haibao2({ tz: tz, ptid: this.params.id }).then((res) => {
      console.log(res);


      if (res.code == 0) {
        this.navigate("pintuanhaibao",{
          name:res.return,
          id:this.params.id
        });
      }
    })


  }
}
