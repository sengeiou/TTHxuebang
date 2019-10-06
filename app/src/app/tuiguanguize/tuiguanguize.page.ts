import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-tuiguanguize',
  templateUrl: './tuiguanguize.page.html',
  styleUrls: ['./tuiguanguize.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class TuiguanguizePage extends AppBase {

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

  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  problemlist = [];
  onMyShow(e=undefined) {
    var api = this.jigouApi;;
    var that = this;

    api.problemlist({ chanjin: 'tg' }).then((problemlist) => {
      this.problemlist = problemlist;
    })



  }
  lijishenqin(e=undefined) {
    var api = this.jigouApi;;
    api.fenxiaoinfo({}).then((res) => {
      console.log(res.length);
      if (res.length == 0) {
        this.navigateBack({

        })
        return

      }
      if (res[0].status == 'A') {
        this.showAlert("正在审核中哦");
        return
      }
      if (res[0].status == 'S') {
        this.showAlert("您已经是推广员了,无需申请");
      }

    })
  }
}
