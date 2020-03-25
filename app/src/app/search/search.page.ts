import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';
import { TeacherApi } from 'src/providers/teacher.api';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [MemberApi,InstApi,TeacherApi,JigouApi]
})
export class SearchPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi:InstApi,
    public teacherApi:TeacherApi,
    public jigouApi:JigouApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;

  }
  keyword = "";
  tp = "";
  shows = "finished";
  onMyLoad(e=undefined) {
    //参数
    this.params;
    var json = {
      searchrecomm: ""
    };

    if (this.params.tp == 'undefined') {
      this.params.tp = "kc";
    }
    //this.options.keyword="%E8%8B%B1%E8%AF%AD";
    // this.params.keyword = decodeURI(this.params.keyword);
    console.log(this.params.keyword,'ppp')
    this.keyword = this.params.keyword;
    this.shows = "finished";
    this.tp = this.params.tp;


    var tp = this.tp;
    if (tp == "kc") {
      this.shows = "finished";
    }
    if (tp == "jg") {
      this.shows = "wait";
    }

    // if (options.new != undefined) {
    //   json.newphone = "N";
    // }
    // var bookapi = new BookApi();


  }

  jglist = [];
  courselist = [];
  jgvlist=[];
  coursevlist=[];

  onMyShow(e=undefined) {
    var that = this;
    var jigouapi = this.jigouApi;;
    var json=null;
    var kc=null;
    var video=null;
    json = {
      city_id: AppBase.CITYID
    };
    kc = {
      city_id: AppBase.CITYID
    };
    video = {
      city_id: AppBase.CITYID
    };
    json.searchkeyword = this.keyword;
    kc.searchkeyword = this.keyword;
    video.searchkeyword = this.keyword;
    console.log(json.searchkeyword + "电风扇");


    var mylat = that.mylat;
    var mylng = that.mylng;
    json.mylat = mylat;
    json.mylng = mylng;
    json.orderby = "distance";
    jigouapi.jglist(json).then( (jglist) => {
      console.log("jglist", jglist);
      var jgvlist = [];
      for (var i = 0; i < 7 && i < jglist.length; i++) {
        jgvlist.push(jglist[i]);
      }

      this.jglist = jglist;
      this.jgvlist=jgvlist;

    });


    kc.mylat = mylat;
    kc.mylng = mylng;
    kc.orderby = "distance";

    jigouapi.courselist(kc).then( (courselist) => {
      var coursevlist = [];
      for (var i = 0; i < 7 && i < courselist.length; i++) {


        courselist[i]["zuidijia"] = this.util.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);

        coursevlist.push(courselist[i]);

      }

      this.courselist = courselist;
      this.coursevlist=coursevlist;
    });


  }



  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.keyword=keyword;
  }



  tosearch(e) {
    this.navigateBack({

    })
  }

  bindshow(type) {
    console.log(type);
    if (type == "wc") {
      this.shows="finished";
    }
    if (type == "df") {
      this.shows="wait";
    }
    if (type == "mv") {
      this.shows="video";
    }

  }
  tojgdetails(id) {
    this.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  tokcdetails(id) {
    this.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  onReachBottom(e=undefined) {
    console.log("???kk");


    var mylat = this.mylat;
    var mylng = this.mylng;

    var jgvlist = this.jgvlist;
    var coursevlist = this.coursevlist;
    var courselist = this.courselist;
    var jglist = this.jglist;
    var count = 0;
    var cs = 0;

    if (this.shows == "finished") {
      for (var i = coursevlist.length; i < courselist.length; i++) {


        courselist[i]["zuidijia"] = this.util.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);

        coursevlist.push(courselist[i]);
        count++;
        if (count >= 7) {
          break;
        }
      }
      console.log(count + "AAA")
      if (count == 0) {
        console.log("diaoni2");
        e.target.complete();
        return;
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.coursevlist=coursevlist;
          e.target.complete();
        }, 500);
      }

    }



    if (this.shows == "wait") {
      for (var j = jgvlist.length; j < jglist.length; j++) {
        jgvlist.push(jglist[j]);
        cs++;
        if (cs >= 7) {
          break;
        }
      }
      console.log("diaoni2", cs);
      if (cs == 0) {
        e.target.complete();
        return;
      }
      if (cs != 0) {
        setTimeout(() => {
          console.log("llll");
          console.log("diaoni1");
          this.jgvlist=jgvlist;
          e.target.complete();
        }, 500);
      }
    }

    console.log("diaoni3");


  }
}
