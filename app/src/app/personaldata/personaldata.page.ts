import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { MineApi } from 'src/providers/mine.api';

@Component({
  selector: 'app-personaldata',
  templateUrl: './personaldata.page.html',
  styleUrls: ['./personaldata.page.scss'],
  providers: [MemberApi, InstApi, MineApi]
})
export class PersonaldataPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public mineApi: MineApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.mydata = {};
  }
  show = 2;
  region = "";
  mydata = null;
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.instApi;
    var mineapi = this.mineApi;


    mineapi.mydata({}).then((mydata) => {
      var address = mydata.address;
      var region = [];
      if (address != '') {
        this.region = address;
        this.mydata = mydata;

      } else {

        this.mydata = mydata;
      }
    });

  }


  bindcheck(check) {
    console.log(check)
    if (check == 'M') {
      this.show = 2;
    }
    if (check == 'W') {
      this.show = 1;
    }
  }
  sex = "";
  confirm(e) {

    console.log(e);
    var that = this;
    var data = e.detail.value;
    var name = data.name;
    var show = this.show;
    var region = this.region;
    var MemberInfo = this.MemberInfo;
    //console.log(MemberInfo.id)
    console.log(data.name);
    // if (data.name == "") {
    //   this.showAlert("请填写昵称");
    //   return;
    // }
    if (data.mobile == "") {
      this.showAlert("请填写手机号");
      return;
    }
    // if (data.sex == "") {
    //   this.showAlert("请选择性别");
    //   return;
    // }
    if (region.length == 0) {
      this.showAlert("请填写地址");
      return;
    }
    data.address = region[0] + " " + region[1] + " " + region[2];
    if (data.housenum == "") {
      this.showAlert("请填写门牌号");
      return;
    }
    if (show == 1) {
      this.showAlert("请点击同意用户协议");
      return;
    }

    if (show == 2) {
      this.sex = "M";
    }
    if (show == 1) {
      this.sex = "W";
    }

    var mineapi = this.mineApi;
    var sex = this.sex;

    this.showConfirm("确认提交修改资料？", (ret) => {
      if (ret) {
        mineapi.updatemydata({
          name: data.name,
          mobile: data.mobile,
          sex: sex,
          address: data.address,
          house_num: data.housenum,
          status: "A"
        }).then((updatemydata) => {
          this.back();
        });
      }
    });


  }

}
