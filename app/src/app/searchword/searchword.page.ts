import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-searchword',
  templateUrl: './searchword.page.html',
  styleUrls: ['./searchword.page.scss'],
  providers:[MemberApi]
})
export class SearchwordPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    var json = {
      searchrecomm: ""
    };
    this.Base.setMyData({ show: 0, result:[] });


  }

  

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "搜索",
    })
  }
  onMyShow() {
    var that = this;
    var instapi = this.memberApi;;
    instapi.searchkeyword({}).then( (ret) => {
      that.Base.setMyData({ history: ret.history, hotest: ret.hotest });
    });
  }
  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }

  bindconfirm(e){
    this.tosearch();
  }
  quxiao(e){
    this.navigateBack({
      delta: 1,
    })
  }

  search(e) {
    //console.log(e.detail.value);
    this.Base.setMyData({ show: 1 });
    // wx.showLoading({
    //   title: '加载中...',
    // })


      var json = {};
      var data = e.detail.value;
      this.Base.setMyData({ value: data });
      json.searchkeyword = data;

    var jigouapi = this.jigouApi;;
    jigouapi.keywordlist(json, (result) => {
        this.Base.setMyData({ result });
        wx.hideLoading();
      });



  }

  tosearch(e) {
    var word = this.value;
    
    var instapi = this.memberApi;;
    instapi.setsearch({keyword:word});

    if (word != null) {
      this.navigateTo({
        url: '/pages/search/search?keyword=' + word+'&tp='+this.params.tp,
      })
    }
  }

  todetails(e) {
    var name = e.target.id;

    var instapi = this.memberApi;;
    instapi.setsearch({ keyword: name });

    this.navigateTo({
      url: '/pages/search/search?keyword=' + name,
    })
  }

  fav(e) {
    var id = e.target.id;
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
    jigouapi.videofav({ video_id: id, status }).then( (ret) => {
      //this.showAlert(ret.result);
      this.Base.setMyData({ teachlist });
    });
  }
  clearrecord(e){
    var that=this;
    wx.showModal({
      title: '删除',
      content: '确认删除历史搜索记录？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var memberapi = this.memberApi;;
          memberapi.clearkeyword({}).then( (clearkeyword) => {
            that.Base.setMyData({ clearkeyword });
            that.onMyShow();
          });
        }
      }
      
    });
    
 
  }


}
