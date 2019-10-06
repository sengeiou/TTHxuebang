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
  selector: 'app-mycollect',
  templateUrl: './mycollect.page.html',
  styleUrls: ['./mycollect.page.scss'],
  providers: [MemberApi,JigouApi]
})
export class MycollectPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  show= "t1"; 

  arr5=[];
  arr4=[];
  arr3=[];
  arr2=[];
  arr1=[];

  onMyLoad() {
    this.arr5=this.getArray(5);
    this.arr4=this.getArray(4);
    this.arr3=this.getArray(3);
    this.arr2=this.getArray(2);
    this.arr1=this.getArray(1);
    //参数
    this.params;
  }
  kclist=[];
  jglist=[];
  splist=[];
  ketangshoucanglist=[];
  onMyShow() {
    var that = this;
    var api = this.memberApi;
    var jigouapi = this.jigouApi;


    api.favcourselist({}).then((kclist) => {
      this.kclist=kclist;
    });


    api.favjigoulist({}).then( (jglist) => {
      this.jglist=jglist;
    });

    api.favvideolist({}).then((splist) => {
      this.splist=splist;
    });

    jigouapi.ketangshoucanglist({}).then( (ketangshoucanglist) => {
      this.ketangshoucanglist=ketangshoucanglist;
    });

    this.huoqukclist();
    this.huoqujigoulist();

  }

  huoqukclist() {

    var api = this.memberApi;
    var mylat = this.mylat;
    var mylng = this.mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID
    };

    console.log("空空空")
    console.log(mylat)
    console.log(mylng)
    console.log(opt)
    console.log("空空空")

    api.favcourselist({}).then((kclist) => {

      console.log("的风格和")
      console.log(mylat)
      console.log(mylng)
      console.log(opt)
      console.log("法国和")

      for (var i = 0; i < kclist.length; i++) {

        console.log("离开的时候考虑过");
        var mile = AppUtil.GetDistance(mylat, mylng, kclist[i].course_lat, kclist[i].course_lng);
        console.log("距离=" + mile);
        var miletxt = AppUtil.GetMileTxt(mile);
        console.log("千米=" + miletxt);
        kclist[i]["miletxt"] = miletxt;

      }


      this.kclist=kclist;
    });

  }

  huoqujigoulist() {
    var api = this.memberApi;
    var mylat = this.mylat;
    var mylng = this.mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID
    };



    api.favjigoulist({}).then((jglist) => {


      for (var i = 0; i < jglist.length; i++) {

        console.log("离开的时候考虑过");
        var mile = AppUtil.GetDistance(mylat, mylng, jglist[i].jg_lat, jglist[i].jg_lng);
        console.log("距离=" + mile);
        var miletxt = AppUtil.GetMileTxt(mile);
        console.log("千米=" + miletxt);
        jglist[i]["miletxt"] = miletxt;

      }

      this.jglist=jglist;
    });
  }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    this.show=type;

  }
  bindtishi(e) {
    this.toast("暂未开放");
  }

  fav(e) {
    var id = e.target.id;
    var jigouapi = this.jigouApi;
    jigouapi.videofav({
      video_id: id,
      status: "N"
    }).then( (ret) => {
      //this.Base.info(ret.result);

      var api = this.memberApi;
      api.favvideolist({}).then( (splist) => {
        this.splist=splist;
      });
    });
  }
  tojgdetails(e) {
    var id = e.target.id;
    this.navigate("jgdetails",{id:id});
  }
  todetails(e) {
    var id = e.target.id;
    this.navigate("ketangdetails",{id:id});
  }

}
