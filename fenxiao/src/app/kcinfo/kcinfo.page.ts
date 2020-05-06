import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PingjiaApi } from 'src/providers/pingjia.api';

@Component({
  selector: 'app-kcinfo',
  templateUrl: './kcinfo.page.html',
  styleUrls: ['./kcinfo.page.scss'],
  providers: [MemberApi, JigouApi, InstApi, PingjiaApi]
})
export class KcinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public InstApi: InstApi,
    
    public JigouApi: JigouApi,
    public PinjiaApi: PingjiaApi,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  show = 'kcxq';
  shulian = 0;

  onMyLoad() {
    //参数
    this.params;

  }
  fenxiaoinfo = [];
  pingjialist = [];
  miletxt = '';
  kechenlunbo = [];
  pintuanrenshu = 0;
  courseinfo = null;
  isfav = '';
  sco = 0;
  canbuy = '';
  onMyShow() {
    var instapi = this.InstApi;
    var jigouapi = this.JigouApi;
    var pingjiaapi = this.PinjiaApi;


    var that = this;
    //this.Base.params.id
    jigouapi.courseinfo({ id: this.params.id }).then((courseinfo) => {
      console.log(courseinfo);
      jigouapi.fenxiaoinfo({}).then((fenxiaoinfo) => {
        console.log(fenxiaoinfo);
        console.log(1111111111);
        this.fenxiaoinfo = fenxiaoinfo;
      }
      )
      pingjiaapi.pingjialist({ kecheng_id: this.params.id }).then((pingjialist) => {

        this.pingjialist = pingjialist;
      })
      jigouapi.kechenlunbo({
        name: courseinfo.id,
        orderby: 'r_main.seq', 
        status: "A"
      }).then((kechenlunbo) => {

        this.kechenlunbo = kechenlunbo;

      });



      courseinfo.wenan = courseinfo.wenan.replace(/\n/g, "<br>");
      courseinfo.wenan = courseinfo.wenan.replace(/<br\/>/g, "");

      this.courseinfo = courseinfo;
      this.isfav = courseinfo.isfav;
      jigouapi.orderstatus({
        id: this.params.id
      }).then((canbuy) => {


        this.canbuy = canbuy

      });
    })






  }
  fav(status) {



    if (status == "Y") {
      this.toast("收藏成功");
    }
    if (status == "N") {
      this.toast("取消收藏");
    }



    var jigouapi = this.JigouApi;
    jigouapi.coursefav({
      course_id: this.params.id,
      status
    }).then((ret) => {
      //this.showAlert(ret.result);
      this.isfav=status;
    });

    setTimeout(() => {
      this.tishi=0;
      // clearTimeout(timeoutId);
    }, 3000);




  }
  tishi=0;
  tokcdetails() {
    console.log("123213123");
    this.navigate("kchaibao", { id: this.params.id });

  }
}
