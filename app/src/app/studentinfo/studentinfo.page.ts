import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.page.html',
  styleUrls: ['./studentinfo.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class StudentinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  jintian;
  name;
  sex;
  nianji;
  sjpiko;
  weixin;
  menpai;
  shouji;
  xssj;
  niubi;
  onMyLoad() {
    //参数
    this.params;
    var myDate = new Date();

    var id = this.params.id;
    if (id != undefined) {
      var api = this.jigouApi;;
      api.xueyuaninfo({ id: id }).then((info) => {

        var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
        this.jintian = jintian;
        this.name = info.name;
        this.sex = info.sex;
        this.nianji = info.nianji;
        this.sjpiko = info.shouji;
        this.weixin = info.weixinhao;
        this.menpai = info.menpaihao;
        this.shouji = info.shouji;
        this.xssj = info.shengri;
        this.niubi = 1;

      })

    }
    else {

      var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
      this.jintian = jintian;
      this.name = '';
      this.sex = 'nan';
      this.nianji = '';
      this.xssj = '';
      this.sjpiko = '';
      this.weixin = '';
      this.menpai = '';
      this.shouji = '';
      this.niubi = 0;
    }
  }
  region = [];
  dizhi = "";
  onMyShow() {
    var that = this;

    var address = this.address;
    if (address.ad_info != undefined) {

      console.log(address);
      var region = [address.ad_info.province, address.ad_info.city, address.ad_info.district];
      this.region = region;
      this.dizhi = region[0] + region[1] + region[2]
      console.log(region[0] + region[1] + region[2]);
    }


  }
  studentinfo() {
    this.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })
  }

  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + ' 年 ' + shijians[1] + ' 月 ' + shijians[2] + ' 日 ');
    this.xssj = xssj;
  }
  baocun() {
    var api = this.jigouApi;;


    var name = this.name;
    var shouji = this.shouji;
    var xinbie = this.sex;
    var shenri = this.xssj;
    var nianji = this.nianji;
    var weixin = this.weixin;
    var dizhi = this.dizhi;
    var menpai = this.menpai;
    var json = null;
    if (this.params.id != undefined) {

      var iddd = this.params.id;
      json = {
        primary_id: iddd,
        name: name,
        sex: xinbie,
        shengri: shenri,
        nianji: nianji,
        shouji: shouji,
        weixinhao: weixin,
        dizhi: dizhi,
        menpaihao: menpai,
        status: 'A'
      }
    }
    else {
      json = {
        name: name,
        sex: xinbie,
        shengri: shenri,
        nianji: nianji,
        shouji: shouji,
        weixinhao: weixin,
        dizhi: dizhi,
        menpaihao: menpai,
        status: 'A'
      }

    }


    if (name == '') {
      this.showAlert("请输入姓名");

      return

    }
    if (shouji == '') {
      this.showAlert("请输入手机");
      return

    }
    if (!this.util.zhenze(shouji)) {
      this.showAlert("手机号格式不正确");
      return
    }

    if (shenri == '') {
      this.showAlert("请选择生日");

      return

    }
    api.addxueyuan(json).then((res) => {
      if (res.code == '0') {
        this.navigateBack({

        })
      }

    })

  }
  shanchu() {
    var that = this;
    this.showConfirm("确认删除学员？",(ret)=>{
      if(ret){
        var api = this.jigouApi;;
        api.shanchuxueyuan({ id: that.params.id }).then((res) => {
         
          this.navigateBack({

          })
        })
      }
    });
  }
}
