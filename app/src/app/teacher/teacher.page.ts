import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
  providers:[MemberApi]
})
export class TeacherPage  extends AppBase {

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
    this.Base.setMyData({
      vteach: []
    });
    
  }
  onMyShow(){
    var teacherapi = new TeacherApi();
    teacherapi.teachlist({
      status: "A",
      orderby: 'r_main.seq'
    }).then( (teachlist) => {
      var vteach = [];
      vteach.push(teachlist[0]);
      vteach.push(teachlist[1]);
      vteach.push(teachlist[2]);
      this.Base.setMyData({
        teachlist,
        vteach
      });
    });
  }


  onReachBottom() {
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
    
    if (count == 0) {

      wx.showToast({
        title: '已经没有了',
        icon:'none'
      });
      this.Base.setMyData({
        nomore: 1,
      });
    }else{
      setTimeout(() => {
        console.log("llll");
        this.Base.setMyData({
          vteach
        });
      }, 1000);
    }
  }

  tojgdetails(e) {
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }

  fav(e) {
    var that = this;

    var id = e.target.id;
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
      this.Base.setMyData({
        show: 1
      });
    }
    if (status == "Y") {
      this.Base.setMyData({
        show: 2
      });
    }
    var totop = this.res.totop;
    console.log(totop);
    //return;
    // wx.showToast({
    //   title: '收藏成功',
    //   icon: 'none'
    //   //image: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/tthxb/resource/766e8ff191a9ac7409e308f3c203e824_19040417026.png"
    // })
    var jigouapi = this.jigouApi;;
    jigouapi.videofav({
      video_id: id,
      status
    }).then( (ret) => {
      //this.showAlert(ret.result);

      this.Base.setMyData({
        vteach:teachlist
      });

    });


    setTimeout(() => {
      this.Base.setMyData({
        show: 0
      })
      // clearTimeout(timeoutId);
    }, 1000);


  }
  play(e) {
	  var that=this;
    var id = e.target.id;
    id=id.split("_");
    id = id[1];
    console.log("bindplay");
    console.log(id);
    var teachlist = this.vteach;
    var nowplaying_id=this.nowplaying_id;
    for (var i = 0; i < teachlist.length; i++) {
      if (id != teachlist[i].id) {
        try{
          
          var videoContext = wx.createVideoContext("v_" + teachlist[i].id);
          videoContext.pause();
        }catch(ex){

        }
      }else{
        teachlist[i].play="Y";
        this.Base.setMyData({ vteach: teachlist });
        console.log("play");
        console.log(id);
        var videoContext = wx.createVideoContext("v_" + id);
        if (nowplaying_id==id){
			
          videoContext.pause();
		  that.Base.setMyData({nowplaying_id:0});
        }else{

          videoContext.play();
		  that.Base.setMyData({nowplaying_id:id});
        }
      }
    }
  }
  onPageScroll(e) {
    console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    }
    if (e.scrollTop > 520) {
      this.setData({
        sco: 1
      });
    }
    if (e.scrollTop <= 520) {
      this.setData({
        sco: 2
      });
    }
    if (e.scrollTop <= 100) {
      this.setData({
        floorstatus: false
      });
    }
  }
}
