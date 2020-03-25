import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { YiduihuangPageModule } from '../yiduihuang/yiduihuang.module';


@Component({
  selector: 'app-jgdetails',
  templateUrl: './jgdetails.page.html',
  styleUrls: ['./jgdetails.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class JgdetailsPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;
    this.courseinfo = {};
    this.canbuy = {};
  }
  shuliang = 1;
  sl = 1;
  pin = 3;
  xuanzhong = 0;
  ketang = [];
  catchtouchmove = 0;
  trunoff = false
  tanchuang = false;

  courseinfo = null;
  gou = 1;
  buy_id = 0;
  nogroup = "";
  courselist = [];
  miletxt = "";
  canbuy = null;
  jigouimg = [];
  jginfo=[];
  isfav = "";

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
    var that = this;
  }
  more = false;
  ketanglist = [];
  onMyShow(e=undefined) {
    var that = this;
    var jigouapi = this.jigouApi;

    jigouapi.jginfo({
      id: this.params.id
    }).then((jginfo) => {

      console.log(jginfo,'jginfo')
      var hang = jginfo.jieshao;
      var hangshu = hang.split('\n')

      if (hangshu.length > 5) {
        //this.Base.setMyData({ more:false})
        this.more = false;
      }

      console.log(hangshu);

      

      jigouapi.courselist({
        jg_id: jginfo.id,
        orderby: 'r_main.seq'
      }).then((courselist) => {
        console.log('13213213', courselist);

        var mylat = this.mylat;
        var mylng = this.mylng;
        for (var i = 0; i < courselist.length; i++) {
          console.log("牛逼");
          console.log(mylat);
          var mile = AppUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
          console.log("mile=" + mile);
          var miletxt = AppUtil.GetMileTxt(mile);
          courselist[i]["zuidijia"] = AppUtil.zuidijia(
            courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
          console.log("miletxt=" + miletxt);
          courselist[i]["miletxt"] = miletxt;

        }



        var jiancha = courselist.filter((item, idx) => {
          return item.isgroup != '0.00' || item.isgroup_tiyan != '0.00'
        })

        if (jiancha.length > 0) {
          this.nogroup = "Y";
        }
        console.log(jiancha, "裂了")

        jigouapi.courseinfo({
          id: courselist[0].id
        }).then((courseinfo) => {

          this.courseinfo;
          this.gou = 1;
          this.buy_id = courselist[0].id;
        });

        this.courselist = courselist;
        this.miletxt = miletxt;
      });



      jigouapi.ketanglist({
        onlineclassroomtype_id: jginfo.classtype_id
      }).then((ketanglist) => {

        var ketang = [];
        for (var j = 0; j < ketanglist.length && j < 4; j++) {
          ketang.push(ketanglist[j]);
        }

        this.ketang = ketang;
        this.ketanglist = [];


      })

      jigouapi.orderstatus({
        id: this.params.id
      }).then((canbuy) => {
        this.canbuy = canbuy;
      });

      jigouapi.jigouimg({
        jigou: jginfo.id,
        orderby: 'r_main.seq',
        status: "A"
      }).then((jigouimg) => {
        this.jigouimg = jigouimg;
      });

      console.log("???????????");
      // this.jginfo = jginfo;
      this.jginfo.push(jginfo)
      this.isfav = jginfo.isfav;
    });
  }

  seemore(e) {

    var ketang = this.ketang;
    var ketanglist = this.ketanglist;
    var count = 0;

    console.log(count, "裂了")

    for (var i = ketang.length; i < ketanglist.length; i++) {
      ketang.push(ketanglist[i]);
      count++;

      if (count >= 4) {
        break;
      }
    }


    if (count == 0) {
      this.toast("已经没有了");
    }

    if (count != 0) {
      //console.log("diaoni1");
      setTimeout(() => {
        console.log("llll");
        this.ketang = ketang;
      }, 500);
    }







  }

  showmore(e) {
    this.more = true;
  }
  shouqi(e) {
    this.more = false;
  }
  jia(id) {
    var kucun = id;
    var shuliang = this.shuliang;
    shuliang++
    if (shuliang > kucun) {
      this.toast("购买数量请勿超过库存");
      return;
    }

    this.shuliang = shuliang;
  }
  jian(e) {
    var shuliang = this.shuliang;
    shuliang--
    if (shuliang <= 0) {
      this.toast("至少购买一个");
      return;

    }
    this.shuliang = shuliang;
  }
  ck = "";
  check(id,ck) {
    var jigouapi = this.jigouApi;

    this.buy_id = id;
    this.ck = ck;

    jigouapi.courseinfo({
      id: id
    }).then((courseinfo) => {
      this.courseinfo = courseinfo;
    });
  }
  minprice = 0;
  clist = [];
  bindpin(e) {
    var id = this.params.id;
    var jigouapi = this.jigouApi;

    jigouapi.courselist({
      jg_id: id
    }).then((clist) => {


      var clist = clist.filter((item, idx) => {
        console.log(parseInt(item.isgroup), "发广告")
        return item.isgroup > 0 || item.isgroup_tiyan > 0
      })

      jigouapi.courseinfo({
        id: clist[0].id
      }).then((courseinfo) => {

        this.courseinfo = courseinfo;
      });


      var min = clist[0].expeprice;

      for (var j = 0; j < clist.length; j++) {
        var minprice = AppUtil.zuidijia(clist[j].expeprice, clist[j].price, clist[j].isgroup, clist[j].isgroup_tiyan);


        console.log(minprice, "最小值")
      }


      console.log(clist, "gg")


      this.pin = 1;
      this.minprice = minprice;
      this.tanchuang = true;
      this.catchtouchmove = 1
      this.clist = clist;

    });

  }
  bindshowtc(e) {
    var id = this.params.id;
    var jigouapi = this.jigouApi;
    jigouapi.courselist({
      jg_id: id
    }).then((clist) => {



      jigouapi.courseinfo({
        id: clist[0].id
      }).then((courseinfo) => {

        this.courseinfo = courseinfo;
      });

      var min = clist[0].expeprice;

      for (var j = 0; j < clist.length; j++) {

        var minprice = AppUtil.zuidijia(clist[j].expeprice, clist[j].price, clist[j].isgroup, clist[j].isgroup_tiyan);

      }

      this.pin = 0;
      this.minprice = minprice;
      this.tanchuang = true;
      this.catchtouchmove = 1
      this.clist = clist;
    });

    this.xuanzhong = 1;
  }

  xuan(id) {
    if (id == "A") {
      this.xuanzhong = 1;
    }
    if (id == "B") {
      this.xuanzhong = 2;
    }
  }

  tobuy(id) {
    var ck = this.xuanzhong;
    console.log(id + "电费");
    //return;
    //this.pin == "1"  

    if (this.pin == 1) {
      console.log(id);
      console.log("aaa");
      // return;
      if (ck == 1) {
        this.navigate("purchase", { course_id: id, type: 0, leixin: 0 })
      }
      if (ck == 2) {
        this.navigate("purchase", { course_id: id, type: 0, leixin: 1 })
      }
    } else {
      console.log(id);
      console.log("ggg");
      //  return
      if (ck == 1) {
        this.navigate("purchase", { course_id: id,  leixin: 0 })
      }
      if (ck == 2) {
        this.navigate("purchase", { course_id: id,  leixin: 1 })
      }
    }


  }

  tokcdetails(id) {
    this.navigate("kcdetails",{id});
  }
  tishi=0;

  fav(status) {

    if (status == "Y") {
      this.toast("收藏成功");
      this.tishi=1;
    }
    if (status == "N") {
      this.toast("取消收藏");
      this.tishi=2;
    }




    var jigouapi = this.jigouApi;
    jigouapi.jigoufav({
      jg_id: this.params.id,
      status
    }).then((ret) => {
      this.isfav=status;
    });

    setTimeout(() => {
      this.tishi=0;
      // clearTimeout(timeoutId);
    }, 1000);


  }

  bindclose(e) {
    this.tanchuang=false;
  }

  toindex(e) {
    this.backHome();
  }
  nav(){
    console.log(this.jginfo)
    this.openLocation(this.jginfo[0].lat,this.jginfo[0].lng,this.jginfo[0].jigou,this.jginfo[0].address);
  }
  bindfullscreenchange(e) {
    console.log("10000", e)
    if (e.detail.fullScreen == true) {
      this.trunoff=true;
    } else {
      this.trunoff=false;
    }

  }
}
