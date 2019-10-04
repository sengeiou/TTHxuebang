import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers:[MemberApi]
})
export class SearchPage  extends AppBase {

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

    if (this.options.tp == undefined) {
      this.options.tp = "kc";
    }
    //this.options.keyword="%E8%8B%B1%E8%AF%AD";
    this.options.keyword = decodeURI(this.options.keyword);

    this.Base.setMyData({
      keyword: this.options.keyword,
      shows: "finished",
      tp: this.options.tp
    });


    var tp = this.tp;
    if (tp == "kc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (tp == "jg") {
      this.Base.setMyData({
        shows: "wait"
      })
    }

    // if (options.new != undefined) {
    //   json.newphone = "N";
    // }
    // var bookapi = new BookApi();


  }

  jglist=[];
  courselist=[];



  onMyShow() {
    var that = this;
    var instapi = this.instApi;;
    var show = this.show;
    var teacherapi = new TeacherApi();
    var jigouapi = this.jigouApi;;

    var json = {
      city_id: AppBase.CITYID
    };
    var kc = {
      city_id: AppBase.CITYID
    };
    var video = {
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
    jigouapi.jglist(json, (jglist) => {
      console.log("jglist", jglist);
      var jgvlist = [];
      for (var i = 0; i < 7 && i < jglist.length; i++) {
        jgvlist.push(jglist[i]);
      }

      this.Base.jglist = jglist;
      this.Base.setMyData({
        jgvlist
      });
      
    });


    kc.mylat = mylat;
    kc.mylng = mylng;
    kc.orderby = "distance";

    jigouapi.courselist(kc, (courselist) => {
      var coursevlist = [];
      for (var i = 0; i < 7 && i < courselist.length; i++) {


        courselist[i]["zuidijia"] = this.util.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);

        coursevlist.push(courselist[i]);

      }

      this.Base.courselist = courselist;
      this.Base.setMyData({
        coursevlist
      });
    });


    // teacherapi.teachlist(video, (teachlist) => {
    //   this.Base.setMyData({
    //     teachlist
    //   });
    // });


  }



  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }


  //  search(e) {

  //    this.Base.setMyData({ show: 1 });
  //    wx.showLoading({
  //      title: '加载中...',
  //    })

  //      var json = {};
  //      var data = e.detail.value;

  //      this.Base.setMyData({ value: data });

  //    json.searchkeyword = data;

  //    var teacherapi = new TeacherApi();
  //    var jigouapi = this.jigouApi;;

  //    jigouapi.courselist(json, (courselist) => {
  //      this.Base.setMyData({
  //        courselist
  //      });
  //    });
  //    jigouapi.jglist(json, (jglist) => {
  //      this.Base.setMyData({
  //        jglist
  //      });
  //    });
  //    teacherapi.teachlist(json, (teachlist) => {
  //      this.Base.setMyData({ teachlist });
  //    });



  //     //  var bookapi = new BookApi();
  //     //  bookapi.keywordlist(json, (result) => {
  //     //    this.Base.setMyData({ result });
  //     //   
  //     //  });
  //    wx.hideLoading();

  //  }

  tosearch(e) {
    //  var word = this.value;
    //  if (word != null) {
    //    this.navigateTo({
    //      url: '/pages/searchbook/searchbook?keyword=' + word,
    //    })
    //  }
    this.navigateBack({

    })
  }

  // todetails(e) {
  //   var name = e.target.id;
  //   this.navigateTo({
  //     url: '/pages/searchbook/searchbook?keyword=' + name,
  //   })
  // }

  bindshow(e) {
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        shows: "wait"
      })
    }
    if (type == "mv") {
      this.Base.setMyData({
        shows: "video"
      })
    }

  }
  tojgdetails(e) {
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  tokcdetails(e) {
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })


    var mylat = this.mylat;
    var mylng = this.mylng;

    var jgvlist = this.jgvlist;
    var coursevlist = this.coursevlist;
    var courselist = this.Base.courselist;
    var jglist = this.Base.jglist;
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
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        })
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.Base.setMyData({
            coursevlist
          });
          wx.hideLoading()
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
      console.log("diaoni2",cs);
      if (cs == 0) {
        console.log("diaoni2");
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        });
      }
      if (cs != 0) {
        setTimeout(() => {
          console.log("llll");
          console.log("diaoni1");
          this.Base.setMyData({
            jgvlist
          });
          wx.hideLoading()
        }, 500);
      }
    }

    console.log("diaoni3");


  }
}
