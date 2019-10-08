import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PurchaseApi } from 'src/providers/purchase.api';

@Component({
  selector: 'app-mymessage',
  templateUrl: './mymessage.page.html',
  styleUrls: ['./mymessage.page.scss'],
  providers: [MemberApi, InstApi, JigouApi, PurchaseApi]
})
export class MymessagePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public jigouApi: JigouApi,
    public purchaseApi: PurchaseApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  xiaoxilist=[];
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.instApi;
    var jigouapi = this.jigouApi;
    var api = this.purchaseApi;

    jigouapi.myxiaoxi({}).then((xiaoxilist) => {
      for (var i = 0; i < xiaoxilist.length; i++) {
        xiaoxilist[i].youhua = [{
          text: '取消',
          style: 'background-color: #ddd; color: #fff;padding-left:20rpx;padding-right:20rpx',
        },
        {
          text: '删除',
          id: xiaoxilist[i].id,
          style: 'background-color: #F4333C; color: #fff;padding-left:20rpx;padding-right:20rpx',
        }
        ]
      }
      this.xiaoxilist=xiaoxilist;
    })

  }


  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index == 0) {
      return
    }
    var xiaoxilist = this.xiaoxilist;
    xiaoxilist = xiaoxilist.filter((item) => {

      return item.id != e.detail.value.id

    })
    this.xiaoxilist=xiaoxilist;

    var api = this.jigouApi;
    api.shanchuxiaoxi({
      id: e.detail.value.id
    }).then((res) => {

      console.log("真的删除了啊啊");
      console.log(res);

    })


  }
  onShare(e=undefined) {
    console.log('onShare')
  }
  xianqin(e) {
    console.log(e);
    var xiaoxilist = this.xiaoxilist;
    xiaoxilist = xiaoxilist.filter((item) => {

      return item.id == e.target.dataset.id;

    })
    console.log(xiaoxilist);
    if (xiaoxilist[0].type == 'A') {
      this.navigate("jiaoyixinxi",{id:e.target.dataset.id});
    }
    if (xiaoxilist[0].type == 'C') {
      this.navigate("tuiguanxiaoxi",{id:e.target.dataset.id});
    }
    if (xiaoxilist[0].type == 'B') {


      var api = this.jigouApi;
      api.xiaoxiinfo({
        id: e.target.dataset.id
      });
      this.navigate("wuliu",{id:e.target.dataset.id});
    }
    if (xiaoxilist[0].type == 'E') {
      this.navigate("xiton",{id:e.target.dataset.id});
    }
  }
}
