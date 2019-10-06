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
  selector: 'app-tuiguanxiaoxi',
  templateUrl: './tuiguanxiaoxi.page.html',
  styleUrls: ['./tuiguanxiaoxi.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class TuiguanxiaoxiPage extends AppBase {

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

  onMyLoad() {
    //参数
    this.params;
  }
  myxiaoxi = [];
  onMyShow() {
    var that = this;
    var api = this.jigouApi;;

    api.xiaoxiinfo({ id: this.params.id }).then((xiaoxi) => {



    })

    api.myxiaoxi({ type: 'C' }).then((myxiaoxi) => {
      for (var i = 0; i < myxiaoxi.length; i++) {
        if (myxiaoxi[i].content.substr(0, 2) == '恭喜') {
          console.log(myxiaoxi[0]);
          console.log("牛逼了1");
          myxiaoxi[i].zhuantai = "成功";
        }
        else {
          myxiaoxi[i].zhuantai = "失败";
        }

      }
      this.myxiaoxi = myxiaoxi;
      console.log("123132");
    })
  }
  zhuqnaian() {
    this.navigateTo({
      url: '/pages/review/review',
    })

  }
  chakanxianqin() {
    this.navigateTo({
      url: '/pages/review/review',
    })

  }
}
