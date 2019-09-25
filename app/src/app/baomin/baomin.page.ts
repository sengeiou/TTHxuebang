import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { BaomaApi } from 'src/providers/baoma.api';

@Component({
  selector: 'app-baomin',
  templateUrl: './baomin.page.html',
  styleUrls: ['./baomin.page.scss'],
  providers: [MemberApi, InstApi, BaomaApi]
})
export class BaominPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public baomaApi: BaomaApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  xuanzhon = false;
  fenmian = '';
  jgimages = [];
  saiqu = [];
  minchen = '';
  renshu = '';
  laoshi = '';
  lianxifanshi = '';
  jigou = '';
  xuanyan = '';

  guize = false;

  



  onMyShow() {
    var that = this;
    var huodonapi = new HuodonApi();
    var instapi = new InstApi();
    huodonapi.huodoninfo({ id: this.Base.options.id }, (huodoninfo) => {
      this.Base.setMyData({ huodoninfo });
    })
    instapi.saiqu({ huodon_id: this.Base.options.id }, (saiqu) => {
      this.Base.setMyData({ saiqu });

    })
    instapi.guize({
      type: 'K', activity_id: this.Base.options.id
    }, (guize) => {
      var guizezon = '';
      guize.map((item) => {

        guizezon += item.guize + '\n';

      })

      this.Base.setMyData({
        guize,
        guizezon
      })



    })

  }

  jguploadimg() {
    alert("todo");  

  }

  jguploadimg1() {
    var that = this;
    this.Base.uploadImage("jiemutupian", (ret) => {

      var jgimages = that.Base.getMyData().jgimages;
      jgimages.push(ret);
      that.Base.setMyData({
        jgimages
      });

    }, 9, undefined);


  }
  closetanchuang() {
    this.Base.setMyData({
      guize: false
    })
  }
  deleteimg(e) {

    var jgimages = this.Base.getMyData().jgimages;


    jgimages = jgimages.filter((item, idx) => {
      return idx != e.currentTarget.dataset.id;
    })

    this.Base.setMyData({ jgimages })

  }
  gou() {

    var xuanzhon = this.Base.getMyData().xuanzhon;
    this.Base.setMyData({ xuanzhon: !xuanzhon })

  }
  bindsaiquChange(e) {

    this.Base.setMyData({
      index: e.detail.value
    })
  }

  tijiao() {
    var minchen = this.Base.getMyData().minchen;
    var renshu = this.Base.getMyData().renshu;
    var laoshi = this.Base.getMyData().laoshi;
    var lianxifanshi = this.Base.getMyData().lianxifanshi;
    var index = this.Base.getMyData().index;
    var saiqu = this.Base.getMyData().saiqu;
    var jigou = this.Base.getMyData().jigou;
    var xuanyan = this.Base.getMyData().xuanyan;
    var fenmian = this.Base.getMyData().fenmian;
    var zhaopiao = this.Base.getMyData().jgimages;
    var xuanzhon = this.Base.getMyData().xuanzhon;

    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.Base.info("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.Base.info("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.Base.info("请填写联系方式");
      return
    }
    if (xuanyan == '') {
      this.Base.info("请填写参赛宣言");
      return

    }
    if (index == undefined) {
      this.Base.info("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.Base.info("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.Base.info("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.Base.info("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.Base.options.id,
      name: minchen,
      renshu: renshu,
      laoshi: laoshi,
      lianxifanshi: lianxifanshi,
      jigou: jigou,
      xuanyan: xuanyan,
      saiqu_id: saiqu[index].id,
      fenmian: fenmian,
      tupian: zhaopiao,
    }
    var huodonapi = new HuodonApi();

    huodonapi.addjiemu(json, (res) => {

      console.log(res);
      if (res.code == 0) {
        wx.showModal({
          title: '提示',
          content: '报名成功,请等待管理员审核',
          confirmText: "我知道了",
          confirmColor: '#FF6600',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({

              })
            }

          }
        })

      }



    })




  }
  yulan() {
    var minchen = this.Base.getMyData().minchen;
    var renshu = this.Base.getMyData().renshu;
    var laoshi = this.Base.getMyData().laoshi;
    var lianxifanshi = this.Base.getMyData().lianxifanshi;
    var index = this.Base.getMyData().index;
    var saiqu = this.Base.getMyData().saiqu;
    var jigou = this.Base.getMyData().jigou;
    var xuanyan = this.Base.getMyData().xuanyan;
    var fenmian = this.Base.getMyData().fenmian;
    var zhaopiao = this.Base.getMyData().jgimages;
    var xuanzhon = this.Base.getMyData().xuanzhon;

    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.Base.info("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.Base.info("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.Base.info("请填写联系方式");
      return
    }
    if (index == undefined) {
      this.Base.info("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.Base.info("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.Base.info("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.Base.info("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.Base.options.id,
      name: minchen,
      renshu: renshu,
      laoshi: laoshi,
      lianxifanshi: lianxifanshi,
      jigou: jigou,
      xuanyan: xuanyan,
      saiqu_id: saiqu[index].id,
      fenmian: fenmian,
      tupian: zhaopiao,
    }

    wx.navigateTo({
      url: '/pages/jiemuxianqin/jiemuxianqin?json=' + JSON.stringify(json),
    })

  }
  baomin() {

    this.Base.setMyData({ guize: true });

    return
    wx.navigateTo({
      url: '/pages/tiaokuan/tiaokuan',
    })

  }

}
