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
  selector: 'app-zaixianketan',
  templateUrl: './zaixianketan.page.html',
  styleUrls: ['./zaixianketan.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class ZaixianketanPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public jigouApi: JigouApi,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }
  fenleilist = [];
  zhon = 0;
  rad = 0;
  kechenlist=[];
  xz = 0;
  onMyShow() {
    this.rad = 375 * 1.0 / screen.width;
    var jigouapi = this.jigouApi;

    jigouapi.zaixiankechenfenlei({}).then((fenleilist) => {
      console.log(fenleilist);

      this.zhon = Math.floor(fenleilist.length / 2);
      this.fenleilist = fenleilist;

    }) 
    jigouapi.zaixiankechenlist({onlineclassroomtype_id:2}).then((zaixiankechenlist)=>{
       console.log(zaixiankechenlist);
     this.kechenlist=zaixiankechenlist ;
    })
  }
  bindclick(c)
  {
    this.xz=c;
  }
  ketaninfo(e)
  {

    this.navigate("ketangdetails",{id:e});
  }
}
