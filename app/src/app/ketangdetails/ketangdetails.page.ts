import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-ketangdetails',
  templateUrl: './ketangdetails.page.html',
  styleUrls: ['./ketangdetails.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class KetangdetailsPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi,
    public elementRef:ElementRef
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
      
  }
  liebiao=false;
  quanbu=false;
  pinlun='';
  shipin=null;
  kecheninfo=null;
  isfav="";
  pinjunjia="";
  ketanpinlunlist=[];
  danqianzhanjie=null;
  zhanjie=null;
  onMyLoad() {
    this.shipin=this.elementRef.nativeElement.querySelector("#playvideo");
  }
  onMyShow() {
    var that = this;
    var jigouapi = this.jigouApi;
    jigouapi.zaixiankecheninfo({ id: this.params.id }).then((kecheninfo) => {
      var pinjunjia = kecheninfo.price / kecheninfo.chapter_num;
      this.kecheninfo=kecheninfo;
      this.isfav=kecheninfo.isfav;
      this.pinjunjia=pinjunjia.toFixed(2);
    })
    jigouapi.ketanpinlunlist({ onlineclassroom_id: this.params.id,limit:"0,2" }).then((ketanpinlunlist) => {
      this.ketanpinlunlist=ketanpinlunlist;
    })


    jigouapi.kechenzhanjie({ classroom_id: this.params.id }).then((zhanjie) => {
      // 
      this.zhanjie=zhanjie;
      if(this.zhanjie.length>0){
        zhanjie[0].dq = true;
        this.danqianzhanjie=zhanjie[0];
        //alert(this.danqianzhanjie.video);
      }
    })


  }
  qiehuanzhanjie(idx) {
    
    var mulu = this.zhanjie;
    var kecheninfo = this.kecheninfo;
    if (mulu[idx].isproved_value == 'N' && kecheninfo.idd == '') {
      this.showAlert("需要付费观看,如果想观看要购买观看全集");
      return

    }
    for (var i = 0; i < mulu.length; i++) {
      if (i == idx) {
        mulu[i].dq = true;
      }
      else {
        mulu[i].dq = false;
      }
    }
    this.zhanjie=mulu;
    this.danqianzhanjie=mulu[idx];
    this.liebiao=false;
  }
  tishi=0;
  fav(status) {


    if (status == "Y") {
      this.tishi=1;
    }
    if (status == "N") {
      this.tishi=2;
    }



    var jigouapi = this.jigouApi;
    jigouapi.zaixiankechenshoucan({
      onlineclassroom_id: this.params.id,
      status
    }).then( (ret) => {
      console.log(ret);
      //this.Base.info(ret.result);
      this.isfav=status;
    });

    setTimeout(() => {
      this.tishi=0;
      // clearTimeout(timeoutId);
    }, 1000);




  }

  chaoshi=false;
  jindu(e) {
    console.log("vkk",e);
    var idd = this.kecheninfo.idd;
    var mianfei = this.kecheninfo.isfree_value;
    if (idd != '' || mianfei == 'Y') {
      return;
    }


    // console.log(this.Base.getMyData().danqianzhanjie.proved_date);
    var a = Number(this.danqianzhanjie.proved_date);
    console.log("进来了1",a,e.target.currentTime);
    if (e.target.currentTime >= a) {
      console.log("进来了2")
      console.log(this.danqianzhanjie.proved_date);


      this.shipin.pause();
      if (e.target.currentTime >= a + 1) {
        this.shipin.seek(a);
      }

      if (!this.chaoshi) {
        this.showAlert("购买后观看完整版视频");
        this.chaoshi=true;
      }
    }
    else {
      if (this.chaoshi) {
        this.chaoshi=false;
      }


    }
  }
  chakanliebiao() {
    this.liebiao=true;
  }
  chakanquanbu() {
    this.quanbu=true;
  }
  guanbiquanbu() {
    this.quanbu=false;
  }
  guanbiliebiao() {
    this.liebiao=false;
  }
  shikan() {
    
    this.chaoshi=false;
    this.shipin.scrollIntoView();
    this.shipin.play();

  }
  goumai() {
    // wx.navigateTo({
    //   url: '/pages/shipingoumai/shipingoumai?id=' + this.Base.getMyData().kecheninfo.id,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })

    this.navigate("shipingoumai",{id:this.kecheninfo.id});

  }
  // shuru(comment) {
  //   this.pinlun=comment;

  // }
  fabiao() {
    var that = this;
    var api = this.jigouApi;
    if (this.kecheninfo.idd != '' || this.kecheninfo.isfree_value == 'Y') {
      var pinlun = this.pinlun;
      if (pinlun == '') {
        this.showAlert("至少说点什么才可以发送哦");
        return
      }
      api.ketanpinlun({ onlineclassroom_id: this.params.id, neiron: pinlun }).then( (res) => {



        api.ketanpinlunlist({ onlineclassroom_id: this.params.id }).then((ketanpinlunlist) => {
          // that.Base.setMyData({
          //   ketanpinlunlist: ketanpinlunlist, pinlun: ''
          // })
          that.ketanpinlunlist=ketanpinlunlist;
          this.pinlun="";
        })
      })


    }
    else {
      this.showAlert("购买此专栏后才能进行评论哦！");
    }
  }
  dianzan(id,idx) {
    var ketanpinlunlist = this.ketanpinlunlist;
    var idx = idx;
    var api = this.jigouApi;

    api.pinlundianzan({ zaixianpinlun_id:id }).then((res) => {
      console.log(res);
      if (res.return == "") {
        console.log(123132132);
        ketanpinlunlist[idx].dianzanrenshu = Number(ketanpinlunlist[idx].dianzanrenshu) - 1;
        ketanpinlunlist[idx].isfav = 'N';
      }
      else {
        console.log(45645646);
        ketanpinlunlist[idx].dianzanrenshu = Number(ketanpinlunlist[idx].dianzanrenshu) + 1;
        ketanpinlunlist[idx].isfav = 'Y';

      }
      //this.Base.setMyData({ ketanpinlunlist: ketanpinlunlist })
      this.ketanpinlunlist=ketanpinlunlist;
    })

  }
  huifudianzan(e) {
    var ketanpinlunlist = this.ketanpinlunlist;
    var idx = e.currentTarget.dataset.idx;
    var api = this.jigouApi;

    api.pinlunhuifudianzan({ zaixianpinlun_id: e.currentTarget.dataset.id }).then( (res) => {
      console.log(res);
      if (res.return == "") {
        console.log(123132132);
        ketanpinlunlist[idx].huifudianzanrenshu = Number(ketanpinlunlist[idx].huifudianzanrenshu) - 1;
        ketanpinlunlist[idx].huifuisfav = 'N';
      }
      else {
        console.log(45645646);
        ketanpinlunlist[idx].huifudianzanrenshu = Number(ketanpinlunlist[idx].huifudianzanrenshu) + 1;
        ketanpinlunlist[idx].huifuisfav = 'Y';

      }
      this.ketanpinlunlist=ketanpinlunlist;

    })
    console.log(e);

  }
}
