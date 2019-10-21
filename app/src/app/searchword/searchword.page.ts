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
  selector: 'app-searchword',
  templateUrl: './searchword.page.html',
  styleUrls: ['./searchword.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class SearchwordPage extends AppBase {

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
  show = 0;
  result = [];
  onMyLoad(e=undefined) {
    //参数
    this.params;
    var json = {
      searchrecomm: ""
    };


  }


  history = [];
  hotest = [];
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.memberApi;;
    instapi.searchkeyword({}).then((ret) => {
      this.history = ret.history;
      this.hotest = ret.hotest;
    });
  }
  keyword = "";
  skey(e) {
    this.keyword = e.detail.value;
  }

  bindconfirm(e) {
    this.tosearch();
  }
  quxiao(e) {
    this.navigateBack({
      delta: 1,
    })
  }
  value = "";
  search(e) {
    //console.log(e.detail.value);
    this.show = 1;
    // wx.showLoading({
    //   title: '加载中...',
    // })


    var data = e.detail.value;
    this.value = data;
    var json = { searchkeyword: data };

    var jigouapi = this.jigouApi;;
    jigouapi.keywordlist(json).then((result) => {
      this.result = result;
    });



  }

  tosearch(e=undefined) {
    var word = this.value;

    var instapi = this.memberApi;;
    instapi.setsearch({ keyword: word });

    if (word != null) {
      this.navigateTo({
        url: '/pages/search/search?keyword=' + word + '&tp=' + this.params.tp,
      })
    }
  }

  todetails(name) {

    var instapi = this.memberApi;;
    instapi.setsearch({ keyword: name });

    this.navigateTo({
      url: '/pages/search/search?keyword=' + name,
    })
  }
  teachlist=[];
  fav(id) {
    console.log(id);
    id = id.split("_");
    var status = id[1];
    id = id[0];
    var teachlist = this.teachlist;
    for (var i = 0; i < teachlist.length; i++) {
      if (teachlist[i].id == id) {
        teachlist[i].isfav = status;
      }
    }
    var jigouapi = this.jigouApi;;
    jigouapi.videofav({ video_id: id, status }).then((ret) => {
      //this.showAlert(ret.result);
      this.teachlist=teachlist;
    });
  }
  clearrecord(e) {
    var that = this;
    this.showConfirm("确认删除历史搜索记录？",(ret)=>{
      if(ret){
        var memberapi = this.memberApi;;
        memberapi.clearkeyword({}).then((clearkeyword) => {
          that.onMyShow();
        });
      }
    });
  }
}
