import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PingceApi } from 'src/providers/pingce.api';
import { JigouApi } from 'src/providers/jigou.api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pingcejieguo',
  templateUrl: './pingcejieguo.page.html',
  styleUrls: ['./pingcejieguo.page.scss'],
  providers: [MemberApi, PingceApi, JigouApi]
})
export class PingcejieguoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public pingceApi: PingceApi,
    public jigouApi: JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  typeA = "";
  typeB = "";
  typeC = "";
  typeD = "";

  arr5 = [];
  arr4 = [];
  arr3 = [];
  arr2 = [];
  arr1 = [];

  onMyLoad(e=undefined) {
    this.arr5 = this.getArray(5);
    this.arr4 = this.getArray(4);
    this.arr3 = this.getArray(3);
    this.arr2 = this.getArray(2);
    this.arr1 = this.getArray(1);
    //参数
    this.params;

    var typeA = this.options.typeA;
    var typeB = this.options.typeB;
    var typeC = this.options.typeC;
    var typeD = this.options.typeD;
    console.log(typeA, typeB, typeC, typeD, "看看")
    if (typeA != "undefined") {
      this.typeA == "A";
    }
    if (typeB != "undefined") {
      this.typeB == "B";
    }
    if (typeC != "undefined") {
      this.typeC == "C";
    }
    if (typeD != "undefined") {
      this.typeD = "D";
    }
    console.log(this.params.pingce_id, "是是是");
  }

  pingcejieguo = null;
  info = null;
  courselist = [];
  onMyShow(e=undefined) {

    var that = this;
    var pingceapi = this.pingceApi;;
    var jigouapi = this.jigouApi;;
    var typeA = this.options.typeA;
    var typeB = this.options.typeB;
    var typeC = this.options.typeC;
    var typeD = this.options.typeD;


    pingceapi.indexinfo({
      id: this.params.id
    }).then((info) => {
      this.info = info;

    });

    console.log(typeA, typeB, typeC, typeD, "累了")

    pingceapi.pingcejieguo({
      pingceindex_id: this.params.id, options: [typeA, typeB, typeC, typeD]
    }).then((pingcejieguo) => {
      this.pingcejieguo = pingcejieguo;
      // console.log(pingcejieguo.coursetype_id+"看了房价高");

      var type = [];

      for (var a = 0; a < pingcejieguo.length; a++) {

        console.log(pingcejieguo[a].coursetype_id + "看了房价高");

        if (pingcejieguo[a].coursetype_id != "") {
          type.push(pingcejieguo[a].coursetype_id);
        }


      }


      console.log(type, "懂得");
      console.log("的客话")

      if (type.length != 0) {
        console.log("ff");
        //return;
        jigouapi.courselist({
          type: type,
          city_id: AppBase.CITYID,
          orderby: 'distance desc'
        }).then((courselist) => {
          for (var i = 0; i < courselist.length && i < 50; i++) {
            courselist[i]["zuidijia"] = this.util.zuidijia(
              courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
          }
          this.courselist = courselist;
          console.log(88888888888888);
          that.bindhuan();
        });
      }

    });

  }


  tokcdetails(id) {
    this.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  again(e) {

    if (this.params.pd == 1) {

      console.log(this.params.id);
      //return;
      this.navigateTo({
        url: '/pages/pingceindex/pingceindex?id=' + this.params.id,
      })
    } else {
      this.navigateBack({
        delta: 1
      })
    }


    console.log(555555);
  }
  xh;
  xianshilist = [];
  bindhuan(e=undefined) {
    console.log(5555555555555);
    var courselist = this.courselist;
    var xianshilist = [];
    var xh = this.xh;
    console.log(xh);
    console.log("序号");
    for (var i = 0; i < courselist.length; i++) {
      if (i == xh) {
        console.log("进来了");
        console.log(i);

        if (courselist.length == 1) {
          xianshilist.push(courselist[i]);
          // xianshilist.push(courselist[0]);
          //xianshilist.push(courselist[1]);
          xh = 2;

          this.xianshilist = xianshilist;
          this.xh = xh;
          console.log(xianshilist);
          console.log(66666666);
          return
        }
        if (courselist.length == 2) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[0]);
          //xianshilist.push(courselist[1]);
          xh = 2;
          this.xianshilist = xianshilist;
          this.xh = xh;
          console.log(xianshilist);
          console.log(66666666);
          return
        }


        if (i == courselist.length - 2) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[i + 1]);
          xianshilist.push(courselist[0]);
          xh = 1;
          this.xianshilist = xianshilist;
          this.xh = xh;
          console.log(xianshilist);
          console.log(66666666);
          return
        }
        if (i == courselist.length - 1) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[0]);
          xianshilist.push(courselist[1]);
          xh = 2;
          this.xianshilist = xianshilist;
          this.xh = xh;
          console.log(xianshilist);
          console.log(66666666);
          return
        }


        if (i == courselist.length) {
          console.log(788888888);
          xianshilist.push(courselist[0]);
          xianshilist.push(courselist[1]);
          xianshilist.push(courselist[2]);
          xh = 3;
          this.xianshilist = xianshilist;
          this.xh = xh;
          return
        }


        xianshilist.push(courselist[i]);
        xianshilist.push(courselist[i + 1]);
        xianshilist.push(courselist[i + 2]);
        xh = xh + 3;
        if (xh == courselist.length) {
          xh = 0;
        }
        console.log(xh);
        this.xianshilist = xianshilist;
        this.xh = xh;
        return
      }

    }

  }

}
