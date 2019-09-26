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
import { HuodonApi } from 'src/providers/huodon.api';

@Component({
  selector: 'app-baomin',
  templateUrl: './baomin.page.html',
  styleUrls: ['./baomin.page.scss'],
  providers: [MemberApi, InstApi, BaomaApi, HuodonApi]
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
    public baomaApi: BaomaApi,
    public huodonApi: HuodonApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.huodoninfo = {};
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
  guizezon = "";


  huodoninfo = null;

  onMyShow() {
    var that = this;
    var huodonapi = this.huodonApi;
    var instapi = this.instApi;
    huodonapi.huodoninfo({ id: this.params.id }).then((huodoninfo) => {
      this.huodoninfo = huodoninfo;
    })
    instapi.saiqu({ huodon_id: this.params.id }).then((saiqu) => {
      this.saiqu = saiqu;

    })
    instapi.guize({
      type: 'K', activity_id: this.params.id
    }).then((guize) => {
      var guizezon = '';
      guize.map((item) => {

        guizezon += item.guize + '\n';

      })

      this.guize = guize;
      this.guizezon = guizezon;




    })

  }

  jguploadimg() {
    alert("todo");

  }

  index = 0;

  jguploadimg1() {
    var that = this;
    //todo
    // this.uploadImage("jiemutupian").then((ret) => {

    //   var jgimages = that.jgimages;
    //   jgimages.push(ret);
    //   that.Base.setMyData({
    //     jgimages
    //   });

    // }, 9, undefined);


  }
  closetanchuang() {
    this.guize = false;
  }

  //todo
  // deleteimg(e) {

  //   var jgimages = this.jgimages;


  //   jgimages = jgimages.filter((item, idx) => {
  //     return idx != e.currentTarget.dataset.id;
  //   })

  //   this.jgimages=jgimages;

  // }
  gou() {

    var xuanzhon = this.xuanzhon;
    this.xuanzhon = !this.xuanzhon;

  }

  tijiao() {
    var minchen = this.minchen;
    var renshu = this.renshu;
    var laoshi = this.laoshi;
    var lianxifanshi = this.lianxifanshi;
    var index = this.index;
    var saiqu = this.saiqu;
    var jigou = this.jigou;
    var xuanyan = this.xuanyan;
    var fenmian = this.fenmian;
    var zhaopiao = this.jgimages;
    var xuanzhon = this.xuanzhon;

    if (minchen == '') {
      this.showAlert("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.showAlert("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.showAlert("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.showAlert("请填写联系方式");
      return
    }
    if (xuanyan == '') {
      this.showAlert("请填写参赛宣言");
      return

    }
    if (index == undefined) {
      this.showAlert("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.showAlert("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.showAlert("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.showAlert("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.showAlert("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.params.id,
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
    var huodonapi = this.huodonApi;

    huodonapi.addjiemu(json).then((res) => {

      console.log(res);
      if (res.code == 0) {
        this.showAlert("报名成功,请等待管理员审核", () => {
          this.back();
        });
      }



    })




  }
  yulan() {
    var minchen = this.minchen;
    var renshu = this.renshu;
    var laoshi = this.laoshi;
    var lianxifanshi = this.lianxifanshi;
    var index = this.index;
    var saiqu = this.saiqu;
    var jigou = this.jigou;
    var xuanyan = this.xuanyan;
    var fenmian = this.fenmian;
    var zhaopiao = this.jgimages;
    var xuanzhon = this.xuanzhon;

    if (minchen == '') {
      this.showAlert("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.showAlert("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.showAlert("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.showAlert("请填写联系方式");
      return
    }
    if (index == undefined) {
      this.showAlert("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.showAlert("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.showAlert("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.showAlert("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.showAlert("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.params.id,
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

    this.navigate("jiemuxianqin", json);


  }
  baomin() {

    this.guize = true;

  }

}
