import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { InstApi } from 'src/providers/inst.api';

import { HaibaoApi } from 'src/providers/haibao.api';

@Component({
  selector: 'app-kchaibao',
  templateUrl: './kchaibao.page.html',
  styleUrls: ['./kchaibao.page.scss'],
  providers: [MemberApi, JigouApi, InstApi, HaibaoApi]
})
export class KchaibaoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public habaoapi: HaibaoApi,
    public sanitizer: DomSanitizer,
    public jigouapi: JigouApi,
    public instapi: InstApi,

    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }
  neiron = null;
  kcinfo = null;
  yuanwen = null;
  qrcode = '';
  onMyShow() {
    var api = this.jigouapi;
    api.courseinfo({ id: this.params.id }).then((kcinfo) => {
      console.log(kcinfo);
      console.log(kcinfo.wenan);
      this.yuanwen = kcinfo.wenan;
      kcinfo.wenan = kcinfo.wenan.replace(/\n/g, "<br>");
      kcinfo.wenan = kcinfo.wenan.replace(/<br\/>/g, "");
      console.log(kcinfo.wenan);
      this.neiron = kcinfo.wenan;
      this.kcinfo = kcinfo;

    })

    // this.instapi.qrcode1({ str: '111' }).then((rets) => {

    //   var a = 'https://tthxb.artxb.cn/users/logs/' + rets.return + '.png';
    //   this.qrcode = a;
    //   console.log(rets);
    //   console.log(a);
    //   console.log("哈哈哈哈");
    // })



    this.qrcode="https://tthxb.artxb.cn/api/inst/qrcode?inst_id=1&url=/pages/kcdetails/kcdetails?yaoqin_id=" + this.MemberInfo.id + '%26id=' + this.params.id
  


    
    this.habaoapi.fenxiaohaibao1({isdebug:'Y',kc_id:this.params.id}).then((res) => {
        
      this.haibao="https://tthxb.artxb.cn/Users/upload/tthxb/"+res.return;

    })


  }
  haibao='';
  
  ceshi() {

   this.setWechatShare1()
    this.copy(this.yuanwen);


  }
  saveimg(){
    this.copy(this.yuanwen);
     window.open(this.haibao);
     
     

  }

}
