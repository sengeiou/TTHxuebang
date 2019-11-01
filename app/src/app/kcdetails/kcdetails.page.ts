import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PingjiaApi } from 'src/providers/pingjia.api';
import { HaibaoApi } from 'src/providers/haibao.api';

@Component({
  selector: 'app-kcdetails',
  templateUrl: './kcdetails.page.html',
  styleUrls: ['./kcdetails.page.scss'],
  providers: [MemberApi, JigouApi, PingjiaApi,HaibaoApi]
})
export class KcdetailsPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public pingjiaApi: PingjiaApi,
    public haibaoApi:HaibaoApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
    this.fenxiaoinfo = {};
    this.courseinfo = {};
    this.canbuy = {};
  }
  show = "kcxq";
  shulian = 0;
  daojishilistdd = [];
  canbuy = null;

  arr5=[];
  arr4=[];
  arr3=[];
  arr2=[];
  arr1=[];

  onMyLoad(e=undefined) {
    this.arr5=this.getArray(5);
    this.arr4=this.getArray(4);
    this.arr3=this.getArray(3);
    this.arr2=this.getArray(2);
    this.arr1=this.getArray(1);
    //参数
    this.params;

    this.daojishi();
  }
  timer;
  sjlist = [];
  pingjialist = [];
  daojishi(e=undefined) {
    var that = this;


    this.timer = setInterval(() => {

      var list = that.daojishilistdd;
      console.log(list);

      console.log(52);
      var sjlist = [];

      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        console.log(danqiandate);
        var jisuandate = new Date(list[i].jieshushijian.replace(/-/g, '/'));


        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000))); //计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000))); //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000))); //计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));


        sjlist.push(listtt);

      }
      console.log("循环");
      that.sjlist = sjlist;



    }, 1000)





  }
  onHide(e=undefined) {
    console.error(66666);
    clearInterval(this.timer);


  }

  onUnload(e=undefined) {
    console.error(66666);
    clearInterval(this.timer);
  }
  fenxiaoinfo = null;
  pintuanrenshu = 0;
  daojishilist = [];
  pintuanlist = [];
  kechenlunbo = [];
  miletxt = "";
  scoring = 0;
  courseinfo = null;
  isfav = "";
  onMyShow(e=undefined) {
    var jigouapi = this.jigouApi;

    if (this.params.yaoqin_id != undefined && this.MemberInfo.id != undefined) {
      if (this.params.yaoqin_id != this.MemberInfo.id) {

        jigouapi.yaoqin({
          yaoqinren: this.params.yaoqin_id
        }).then((res) => {

          console.log(res);
          console.log("asdasdasdasdasdas");

        })

      }

    }


    var pingjiaapi = this.pingjiaApi;

    var that = this;
    //this.params.id
    jigouapi.courseinfo({
      id: this.params.id
    }).then((courseinfo) => {

      jigouapi.fenxiaoinfo({}).then((fenxiaoinfo) => {

        this.fenxiaoinfo = fenxiaoinfo;
      })

      pingjiaapi.pingjialist({
        kecheng_id: this.params.id
      }).then((pingjialist) => {
        this.pingjialist = pingjialist;
      });


      console.log("哈哈哈");
      console.log(courseinfo);
      if (courseinfo.isgroup != 0 || courseinfo.isgroup_tiyan != 0) {
        jigouapi.pintuanlist({
          group_course_course_id: courseinfo.id
        }).then((pintuanlist) => {
          console.log(pintuanlist);
          var pintuanrenshu = 0;
          var daojishilist = [];
          var daojishilistdd = [];
          for (var i = 0; i < pintuanlist.length; i++) {
            pintuanrenshu += pintuanlist[i].tuanlist.length;
            pintuanlist[i].commander_id_name = AppUtil.masaike(pintuanlist[i].commander_id_name);
            pintuanlist[i].xunhuandate = AppUtil.shijianjisuan(pintuanlist[i].jieshushijian);

            if (daojishilist.length < 2) {

              if (pintuanlist[i].status == 'A') {
                daojishilist.push(pintuanlist[i]);
              }
            }
            if (pintuanlist[i].status == 'A') {
              daojishilistdd.push(pintuanlist[i]);
            }
          }


          this.pintuanrenshu = pintuanrenshu;
          this.daojishilist = daojishilist;
          this.daojishilistdd = daojishilistdd;
          this.pintuanlist = pintuanlist;
        })
      }

      jigouapi.kechenlunbo({
        name: courseinfo.id,
        orderby: 'r_main.seq',
        status: "A"
      }).then((kechenlunbo) => {
        this.kechenlunbo = kechenlunbo;
      });



      var mylat = this.mylat;
      var mylng = this.mylng;

      var mile = AppUtil.GetDistance(mylat, mylng, courseinfo.JG_lat, courseinfo.JG_lng);

      var miletxt = AppUtil.GetMileTxt(mile);
      this.scoring = parseInt(courseinfo.scoring)
      this.miletxt = miletxt;
      var scoring = this.scoring;
      console.log("啊啊啊" + scoring)

      this.courseinfo = courseinfo;
      this.isfav = courseinfo.isfav;


    });


    jigouapi.orderstatus({
      id: this.params.id
    }).then((canbuy) => {
      this.canbuy = canbuy;
    });

  }
  //todo
  gotoBottom(e) {
    this.show="gmxz";
    // wx.pageScrollTo({
    //   scrollTop: 100000,
    //   duration: 300
    // })
  }
  bindcut(e) {
    this.show="kcxq";
    // wx.pageScrollTo({
    //   scrollTop: 521,
    //   duration: 300
    // })
  }
  ppp=0;
  pppp=0;
  tanchuang=true;
  bindtopurchase(e) {

    var price = this.courseinfo.price;
    if (price <= 0) {
      this.ppp= 0;
      this.pppp= 1;
      this.tanchuang= true;
    }
    else {
      this.ppp= 0;
      this.pppp= 0;
      this.tanchuang= true;
    }

  }

  opengroup(e=undefined) {
    var expeprice = this.courseinfo.expeprice;
    if (expeprice <= 0) {
      this.ppp= 1;
      this.pppp= 0;
      this.tanchuang= true;
    }
    else {
      this.ppp= 1;
      this.pppp= 1;
      this.tanchuang= true;
    }

  }



  tishi=0;

  fav(status) {



    if (status == "Y") {
      this.toast("收藏成功");
    }
    if (status == "N") {
      this.toast("取消收藏");
    }



    var jigouapi = this.jigouApi;
    jigouapi.coursefav({
      course_id: this.params.id,
      status
    }).then((ret) => {
      //this.showAlert(ret.result);
      this.isfav=status;
    });

    setTimeout(() => {
      this.tishi=0;
      // clearTimeout(timeoutId);
    }, 3000);




  }
  todetails(e) {
    this.navigate("jgdetails",{id:this.courseinfo.id});
  }

  onReachBottom(e) {
    this.show="gmxz";

    e.target.complete();
  }

  qupinban(id) {
    this.navigate("groupinfo",{id:id});

  }


  bindtolist(id) {
    this.navigate("pingjialist",{id:id});
  }
  jian(e=undefined) {
    var shulian = this.shulian;
    if (shulian == 0) {
      return
    }
    this.shulian=shulian-1;
  }
  jia(e=undefined) {
    var shulian = this.shulian;

    this.shulian=shulian+1;
  }
  bindclose(e=undefined) {
    this.tanchuang=false;

  }
  yaoqin(e=undefined) {
    var api = this.haibaoApi;
    api.haibao1({
      kcid: this.params.id, isdebug: 'Y'
    }).then((res) => {
      console.log(res);
      if (res.code == 0) {
        this.navigate("kcyaoqin",{
          name:res.return,
          kcid:this.params.id
        });
      }
    })

  }

  tobuy(e=undefined) {
    this.tanchuang=false;

    var ppp = this.ppp;
    if (ppp == 1) {
      this.navigate("purchase",{
        course_id:this.params.id,
        type:0,
        leixin:this.pppp
      });

    } else {
      this.navigate("purchase",{
        course_id:this.params.id,
        leixin:this.pppp
      });
    }

  }
  shouye(e=undefined) {
    this.backHome();
  }
  gotojigou(e=undefined) {
    this.navigate("jgdetails",{
      id:this.courseinfo.jg_id
    });
  }
  lifk(e=undefined) {
    this.navigate("myorder");
  }
  check(id) {
    this.pppp=id;
  }
  ispintuan=false;
  chakangenduo(e=undefined) {
    this.ispintuan=true;
  }
  closetanchuang(e=undefined) {
    this.ispintuan=false;
  }
  chakantuan(e=undefined) {
    this.navigate("groupinfo",{id:this.canbuy.pt});
  }
}
