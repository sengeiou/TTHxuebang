import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PingceApi } from 'src/providers/pingce.api';

@Component({
  selector: 'app-pingcedati',
  templateUrl: './pingcedati.page.html',
  styleUrls: ['./pingcedati.page.scss'],
  providers: [MemberApi, PingceApi]
})
export class PingcedatiPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public pingceApi: PingceApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  check = "";
  sx = 0;
  ck = 0;
  qie = 0;
  pingce = [];
  gif = false;

 
  onMyLoad() {
    //参数
    this.params;

  }
  pingcelist = [];
  onMyShow() {
    var that = this;
    //this.onLoad();

    this.gif = false;

    var pingceapi = this.pingceApi;

    pingceapi.pingcelist({
      pingceindex_id: this.params.id
    }).then((pingcelist) => {
      this.pingcelist = pingcelist;
    });

  }

  

  bindcheck(id,sx) {


    var pingcelist = this.pingcelist;

    pingcelist[sx].check = id;
    this.pingcelist = pingcelist;
    this.ck = parseInt(sx);
    if (sx < pingcelist.length - 1) {
      this.next(sx);
    }

  }

  next(sx) {
    var id = sx;
    console.log(id + "谷歌");

    var ck = this.ck;
    console.log(ck + "苹果");

    var check = this.check;

    var idx = parseInt(id) + 1;
    var pingce = this.pingce;

    pingce.push([parseInt(id) + 1, check]);


    setTimeout(() => {
      this.sx = idx;
      this.qie = parseInt(id) + 1;
    }, 300)

  }


  last() {
    var ck = this.ck;
    var qie = this.qie;

    this.ck = ck - 1;
    this.qie = qie - 1;
    console.log(this.ck + "随时");

    var id = this.sx;
    var idx = id - 1;
    this.sx = idx;

  }

  stoptouch() {
    console.log("禁止滑动")
  }


  tijiao() {
    this.gif = true;

    var pingcelist = this.pingcelist;
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    for (var i = 0; i < pingcelist.length; i++) {
      if (pingcelist[i].check == 'A') {
        a++;
      }

      if (pingcelist[i].check == 'B') {
        b++;
      }

      if (pingcelist[i].check == 'C') {
        c++;
      }

      if (pingcelist[i].check == 'D') {
        d++;
      }

      // console.log(a,b,c,d)

    }

    console.log(a, b, c, d)

    var numbers = [a, b, c, d];
    // var max = arr[i];

    var sum = a + b + c + d;
    console.log(sum + "巅峰时代" + pingcelist.length);


    if (sum != pingcelist.length) {
      this.toast("请认真填写所有问题");
      return;
    }


    var maxInNumbers = Math.max.apply(Math, numbers);

    // for (var i = 1; i < arr.length; i++) {
    //  var max = arr[i]; 
    // }
    var type = [];
    console.log(maxInNumbers);
    if (a == maxInNumbers) {
      console.log("乐观")
      var typeA = "A"
    }
    if (b == maxInNumbers) {
      console.log("悲观")
      var typeB = "B"
    }
    if (c == maxInNumbers) {
      console.log("积极")
      var typeC = "C"
    }
    if (d == maxInNumbers) {
      console.log("消极")
      var typeD = "D"
    }

    console.log(typeA, typeB, typeC, typeD, "力量")

    this.check = "";
    this.qie = 0;


    var pingceapi = this.pingceApi;

    console.log(this.params.upid, "啦啦啦")
    console.log(typeA, typeB, typeC, typeD, "智力")

    pingceapi.updatepingce({
      dati_status: "Y",
      typeA: typeA,
      typeB: typeB,
      typeC: typeC,
      typeD: typeD,
      id: this.params.upid
    }).then((updatepingce) => {

      pingceapi.addone({ id: this.params.id });


    })


    setTimeout(() => {
      this.sx = 0;
      this.pingce = [];
      this.navigate("pingcejieguo", {
        typeA: typeA,
        typeB: typeB,
        typeC: typeC,
        typeD: typeD,
        id: this.params.id
      });
    }, 1100)

  }

}
