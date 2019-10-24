import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { TeacherApi } from 'src/providers/teacher.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
  providers: [MemberApi, TeacherApi, JigouApi]
})
export class TeacherPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public teacherApi: TeacherApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  vteach = [];
  teachlist = [];
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    var teacherapi = this.teacherApi;
    teacherapi.teachlist({
      status: "A",
      orderby: 'r_main.seq'
    }).then((teachlist) => {
      console.log(teachlist,'teachlist')
      var vteach = [];
      vteach.push(teachlist[0]);
      vteach.push(teachlist[1]);
      vteach.push(teachlist[2]);
      this.teachlist = teachlist;
      this.vteach = vteach;
    });
  }
  nomore = 0;

  onReachBottom(e) {
    console.log("???kk");
    var vteach = this.vteach;
    var teachlist = this.teachlist;
    var count = 0;
    for (var i = vteach.length; i < teachlist.length; i++) {
      vteach.push(teachlist[i]);
      count++;
      if (count >= 5) {
        break;
      }
    }

    e.target.complete();
    if (count == 0) {

      this.showToast({
        title: '已经没有了',
        icon: 'none'
      });
      this.nomore = 1;
    } else {
      setTimeout(() => {
        this.vteach = vteach;
      }, 500);
    }
  }

  tojgdetails(id) {
    this.navigate(
      'jgdetails',{id:id}
    )
  }
  show = 0;
  fav(id) {
    var that = this;

    console.log(id);
    id = id.split("_");
    var status = id[1];
    id = id[0];
    var teachlist = this.vteach;
    for (var i = 0; i < teachlist.length; i++) {
      if (teachlist[i].id == id) {
        teachlist[i].isfav = status;
      }

    }

    if (status == "N") {
      this.show = 1;
    }
    if (status == "Y") {
      this.show = 2;
    }
    var totop = this.res.totop;
    console.log(totop);
    var jigouapi = this.jigouApi;;
    jigouapi.videofav({
      video_id: id,
      status
    }).then((ret) => {
      this.vteach = teachlist;
    });


    setTimeout(() => {
      this.show = 0;
      // clearTimeout(timeoutId);
    }, 1000);


  }
  nowplaying_id = 0;
  play(id) {
    console.log(id,'ididdd')
    var that = this;
    id = id.split("_");
    id = id[1];
    console.log("bindplay");
    console.log(id);
    var teachlist = this.vteach;
    var nowplaying_id = this.nowplaying_id;
    var videoContext:HTMLVideoElement = null;
    for (var i = 0; i < teachlist.length; i++) {
      if (id != teachlist[i].id) {
        try {

          videoContext = document.querySelector("#v_" + teachlist[i].id);
          videoContext.pause();
        } catch (ex) {

        }
      } else {
        teachlist[i].play = "Y";
        this.vteach = teachlist;
        videoContext = document.querySelector("#v_" + id);
        if (nowplaying_id == id) {
          videoContext.pause();
          this.nowplaying_id = 0;
        } else {

          videoContext.play();
          this.nowplaying_id = id;
          console.log("nihaoya")
        }
      }
    }
  }
}
