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
    this.shipin=this.elementRef.nativeElement.querySelector("#id");
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
      zhanjie[0].dq = true;
      // 
      this.zhanjie=zhanjie;
      if(this.danqianzhanjie.length>0){
        this.danqianzhanjie=zhanjie[0];
      }
    })


  }
  qiehuanzhanjie(id) {
    
    var mulu = this.zhanjie;
    var kecheninfo = this.kecheninfo;
    if (mulu[id].isproved_value == 'N' && kecheninfo.idd == '') {
      this.showAlert("需要付费观看,如果想观看要购买观看全集");
      return

    }
    for (var i = 0; i < mulu.length; i++) {
      if (i == id) {
        mulu[i].dq = true;
      }
      else {
        mulu[i].dq = false;
      }
    }
    this.zhanjie=mulu;
    this.danqianzhanjie=mulu[id];
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
  shipin = null;


  jindu(e) {
    var idd = this.Base.getMyData().kecheninfo.idd;
    var mianfei = this.Base.getMyData().kecheninfo.isfree_value;
    if (idd != '' || mianfei == 'Y') {
      return;
    }

    console.log("进来了1");

    // console.log(this.Base.getMyData().danqianzhanjie.proved_date);
    var a = Number(this.Base.getMyData().danqianzhanjie.proved_date);
    if (e.detail.currentTime >= a) {
      console.log("进来了2")
      console.log(this.Base.getMyData().danqianzhanjie.proved_date);


      this.Base.shipin.pause();
      if (e.detail.currentTime >= a + 1) {
        this.Base.shipin.seek(a);
      }

      if (!this.Base.getMyData().chaoshi) {

        this.Base.info("购买后观看完整版视频");

      }
    }
    else {
      if (this.Base.getMyData().chaoshi) {
        this.Base.setMyData({ chaoshi: false });
      }


    }
  }
  chakanliebiao() {
    this.Base.setMyData({ liebiao: true });
  }
  chakanquanbu() {
    this.Base.setMyData({ quanbu: true });
  }
  guanbiquanbu() {
    this.Base.setMyData({ quanbu: false });
  }
  guanbiliebiao() {
    this.Base.setMyData({ liebiao: false });
  }
  shikan() {
    this.Base.backtotop();
    this.Base.shipin.play();

  }
  goumai() {
    wx.navigateTo({
      url: '/pages/shipingoumai/shipingoumai?id=' + this.Base.getMyData().kecheninfo.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  }
  shuru(e) {
    this.Base.setMyData({ pinlun: e.detail.value })

  }
  fabiao() {
    var that = this;
    var api = new JigouApi();
    if (this.Base.getMyData().kecheninfo.idd != '' || this.Base.getMyData().kecheninfo.isfree_value == 'Y') {
      var pinlun = this.Base.getMyData().pinlun;
      if (pinlun == '') {
        this.Base.info("至少说点什么才可以发送哦");
        return
      }
      api.ketanpinlun({ onlineclassroom_id: this.Base.options.id, neiron: pinlun }, (res) => {



        api.ketanpinlunlist({ onlineclassroom_id: this.Base.options.id }, (ketanpinlunlist) => {
          that.Base.setMyData({
            ketanpinlunlist: ketanpinlunlist, pinlun: ''
          })
        })
      })


    }
    else {
      this.Base.info("购买此专栏后才能进行评论哦！");
    }
  }
  dianzan(e) {
    var ketanpinlunlist = this.Base.getMyData().ketanpinlunlist;
    var idx = e.currentTarget.dataset.idx;
    var api = new JigouApi();

    api.pinlundianzan({ zaixianpinlun_id: e.currentTarget.dataset.id }, (res) => {
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
      this.Base.setMyData({ ketanpinlunlist: ketanpinlunlist })

    })
    console.log(e);

  }
  huifudianzan(e) {
    var ketanpinlunlist = this.Base.getMyData().ketanpinlunlist;
    var idx = e.currentTarget.dataset.idx;
    var api = new JigouApi();

    api.pinlunhuifudianzan({ zaixianpinlun_id: e.currentTarget.dataset.id }, (res) => {
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
      this.Base.setMyData({ ketanpinlunlist: ketanpinlunlist })

    })
    console.log(e);

  }
}
