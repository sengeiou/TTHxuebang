import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.page.html',
  styleUrls: ['./studentinfo.page.scss'],
  providers:[MemberApi]
})
export class StudentinfoPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    var myDate = new Date();

    var id = this.params.id;
    if (id != undefined) {
      var api = this.jigouApi;;
      api.xueyuaninfo({ id: id }).then( (info) => {
        console.log(123132132);
        console.log(info);
        var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
        this.Base.setMyData({
          jintian: jintian, name: info.name, sex: info.sex, nianji: info.nianji, sjpiko: info.shouji, weixin: info.weixinhao, menpai: info.menpaihao, shouji: info.shouji, xssj: info.shengri, niubi: 1
        })

      })

    }
    else {

      var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
      this.Base.setMyData({
        jintian: jintian, name: '', sex: 'nan', nianji: '', xssj:'', sjpiko: '', weixin: '', menpai: '', shouji: '', niubi: 0
      })
    }
  }
  onMyShow() {
    var that = this;
   
      var address=this.address;
    if (address.address_component!=undefined){

      console.log(address);
      var region = [address.address_component.province, address.address_component.city, address.address_component.district];
      this.Base.setMyData({
        region, dizhi: region[0] + region[1] + region[2]
      });
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

    this.Base.setMyData({
      xssj: xssj
    })
  }
  name(e) {
    this.Base.setMyData({ name: e.detail.value })
  }
  sex(e) {

    this.Base.setMyData({ sex: e.target.dataset.id })
  }
  nianji(e) {
    this.Base.setMyData({ nianji: e.detail.value })
  }
  shouji(e) {
    this.Base.setMyData({ shouji: e.detail.value })
  }
  weixin(e) {
    this.Base.setMyData({ weixin: e.detail.value })
  }
  menpai(e) {
    this.Base.setMyData({ menpai: e.detail.value })
  }
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value, dizhi: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
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

    if (this.params.id != undefined) {

      var iddd = this.params.id;
      var json = {
        primary_id: iddd, name: name, sex: xinbie, shengri: shenri, nianji: nianji, shouji: shouji, weixinhao: weixin, dizhi: dizhi, menpaihao: menpai, status: 'A'
      }
    }
    else {
      var json = {
        name: name, sex: xinbie, shengri: shenri, nianji: nianji, shouji: shouji, weixinhao: weixin, dizhi: dizhi, menpaihao: menpai, status: 'A'
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
    api.addxueyuan(json, (res) => {
      if (res.code == '0') {
        this.navigateBack({

        })
      }

    })

  }
  shanchu() {
    var that = this;
    wx.showModal({
      title: '',
      content: '确认删除学员？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var api = this.jigouApi;;
          api.shanchuxueyuan({ id: that.params.id }).then( (res) => {
            that.Base.setMyData({ res })
            this.navigateBack({

            })
          })


        }
      }
    });



  }
}
