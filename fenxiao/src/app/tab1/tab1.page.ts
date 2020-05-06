import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [MemberApi, JigouApi, InstApi]
})
export class Tab1Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public instApi: InstApi,
    public jigouApi: JigouApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }
  rad = 1;
  fenleilist = [];
  xz = 0;
  name = "在线课程";
  lunbolist = [];
  zuixin = [];
  zhon = 0;
  genduo = false;
  onMyLoad() {
    var that = this;

  }
  xzlist = [];
  
  fdistrict_id = '';
  jglist = [];
  jgvteach = [];
  vteach = [];
  courselist = [];
  huodon = [];
  loadcourse() {
    var jigouapi = this.jigouApi;
    var mylat = this.mylat;
    var mylng = this.mylng;


    var opt = {
      mylat,
      mylng,
      isfenxiao: 'Y',
      limit: "0,100",
      orderby: "distance"
    };




    //opt.limit="100";

    jigouapi.courselist(opt).then((courselist) => {

      var huodon = [];
      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {
        if (i == 0) {
          huodon.push(courselist[i]);
        }
        vteach.push(courselist[i]);
      }
      console.log(vteach);
      this.courselist = courselist;
      this.huodon = huodon;
      console.log(this.huodon);
      this.vteach = vteach;

    });
  }
  fuli = [];
  fuli0 = [];
  onMyShow() {
    this.rad = 375 * 1.0 / screen.width;

    this.loadcourse();
    var jigouapi = this.jigouApi;
    var instapi = this.instApi;
    jigouapi.coursetype({}).then((fenleilist) => {


      var fenlei1 = { id: 0, img: this.res.zaixian, typename: '在线课程' };
      var list = [];
      list.push(fenlei1);

      fenleilist.map((item) => {
        list.push(item);
      })

      console.log(list);

      this.zhon = Math.floor(list.length / 2)+1;


      this.fenleilist = list;

      this.name = "在线课程";
    });
    jigouapi.zuixinzaixiankechen({}).then((qwe) => {
      this.zuixin = qwe;

    })
    instapi.xianshifuli({ id: 0 }).then((fuli) => {
      console.log("第一次1");
      console.log(fuli);
      this.fuli0=[];
         var fulilist = fuli.kc;
      this.fuli0.push(fuli.kc[0]);
      this.fuli = fulilist.filter((item, idx) => {
        return idx != 0;

      });
     
      // var date=new date();
        


    })
  }






  qiehuanzhanjie(idx) {
    console.log(idx);
    var id = 0;
    id = this.fenleilist[idx].id;
    if (idx == 0) {
      this.navigate("zaixianketan")
    }
    else {

      this.navigate("kechen", { id: id })
    }

  }
  tokcdetails(id) {
    this.navigate("kcinfo", { id: id });

  }
  ckhb(id)
  {
    console.log(id);
    this.navigate("kchaibao",{id:id});
  }
  sousuo() {
    console.log("adads");
    this.navigate('searchword');
  }

  onReachBottom(e){
    var mylat = this.mylat;
    var mylng = this.mylng;

    var jgvteach = this.jgvteach;
    var vteach = this.vteach;
    var courselist = this.courselist;
    var jglist = this.jglist;
    var count = 0;
    var cs = 0;
 
    if (this.params.type == "kc") {
      for (var i = vteach.length; i < courselist.length; i++) {

        var mile = this.util.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        var miletxt = this.util.GetMileTxt(mile);
        courselist[i]["miletxt"] = miletxt;
        courselist[i]["zuidijia"] = this.util.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
        vteach.push(courselist[i]);
        count++;
        if (count >= 7) {
          break;
        }
      }
      console.log(count + "AAA")
      if (count == 0) {
        e.target.complete();
        return;
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.vteach=vteach;
          e.target.complete();
        }, 500);
      }

    }



    if (this.params.type == "jg") {
      for (var j = jgvteach.length; j < jglist.length; j++) {
        var mile = this.util.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
        var miletxt = this.util.GetMileTxt(mile);
        jglist[j]["miletxt"] = miletxt;
        jgvteach.push(jglist[j]);
        cs++;
        if (cs >= 4) {
          break;
        }
      }
      if (cs == 0) {
        e.target.complete();
        return;
      }
      if (cs != 0) {
        setTimeout(() => {
          this.jgvteach=jgvteach;
          e.target.complete();
        }, 500);
      }
    }

    console.log("diaoni3");


  }
}
