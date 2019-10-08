import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
  selector: 'app-seek',
  templateUrl: './seek.page.html',
  styleUrls: ['./seek.page.scss'],
  providers: [MemberApi, JigouApi, InstApi]
})
export class SeekPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public instApi: InstApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  courselist = [];
  jglist = [];
  xiala = "yc";
  xialakc = "yc";
  xialaage = "yc";
  //type= "kc";
  show = "jx";
  ageid = -1;
  mylat = 0;
  mylng = 0;
  filtercoursetype = [];
  ttype_id = "0";
  filtercourseage = [];
  tage_id = "0";
  filterdistrict = [];
  tdistrict_id = "0";
  params_show = false;
  buyshow = [];
  vteach = [];
  type = "";
  fdistrict_id = "0";
  fage_id = "0";
  ftype_id = "0";
  gongaolist = [];
  options_show=false;

  onLoad(e=undefined) {
    if (this.params.keyword != undefined) {
      this.params.keyword = decodeURI(this.params.keyword);
    }
    //this.this.params.type="jg";

    if (this.params.type == undefined) {
      this.params.type = 'kc';
    }


    if (this.params.ftype_id == undefined) {
      this.params.ftype_id = "0";
    }

    if (this.params.fage_id == undefined) {
      this.params.fage_id = "0";
    }

    if (this.params.fdistrict_id == undefined) {
      this.params.fdistrict_id = "0";
    }

    this.type = this.params.type;
    this.fdistrict_id = this.params.fdistrict_id;
    this.fage_id = this.params.fage_id;
    this.ftype_id = this.params.ftype_id;

    //  console.log(this.this.params.type);


    var jigouapi = this.jigouApi;;
    jigouapi.gongaolist({
      orderby: " rand() "
    }).then((gongaolist) => {
      this.gongaolist = gongaolist;
    });

    jigouapi.coursetype({}).then((filtercoursetype) => {
      this.filtercoursetype = filtercoursetype;
    });
    jigouapi.courseage({}).then((filtercourseage) => {
      this.filtercourseage = filtercourseage;
    });
    jigouapi.buyshow({
      limit: '20'
    }).then((buyshow) => {
      this.buyshow = buyshow;
    });

  }

  timerStart;

  onUnload(e=undefined) {
    var timerStart = this.timerStart;
    clearInterval(timerStart);
  }
  isload = false;
  onMyShow(e=undefined) {
    var that = this;

    var jigouapi = this.jigouApi;;
    var isload = this.isload;
    if (isload == true) {
      return;
    }
    this.isload = true;

    var type = this.type;

    var that = this;
    var instapi = this.instApi;;
    var show = this.show;


    console.log(show);



    jigouapi.activedistrictlist({
      city_id: AppBase.CITYID
    }).then((filterdistrict) => {
      this.filterdistrict = filterdistrict;
      if (type == "kc") {
        this.loadcourse();
      } else {
        this.loadjg();
      }
    });


  }
  tojgdetails(e) {
    this.xiala = "yc";
    this.xialakc = "yc";
    this.xialaage = "yc";
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

  bindshow(e) {
    this.xiala = "yc";
    this.xialakc = "yc";
    this.xialaage = "yc";
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "jx") {
      this.show="jx";
    }
    if (type == "xs") {
      this.show="xs";
    }
    if (type == "hp") {
      this.show="hp";
    }
    this.loadjg();

  }
  options="";
  bindxuanxiang(e) {
    var options = e.target.dataset.options; 
    this.options=options;
    this.loadcourse();
  }
  jgvteach=[];

  loadjg(e=undefined) {
    var jigouapi = this.jigouApi;;
    var mylat = this.mylat;
    var mylng = this.mylng;
    var opt=null;

    opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };

    if (this.fdistrict_id != "0") {
      opt.district_id = this.fdistrict_id;
    }
    if (this.show == "jx") {
      opt.orderby = "jxrate,distance";
    }
    if (this.show == "xs") {
      opt.orderby = "up_time desc,distance";
    }
    if (this.show == "hp") {
      opt.orderby = "scoring desc,distance";
    }
    //opt.limit="100";

    jigouapi.jglist(opt).then((jglist) => {


      var jgvteach = [];
      for (var j = 0; j < jglist.length && j < 5; j++) {
        var mile = this.util.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
        var miletxt = this.util.GetMileTxt(mile);
        jglist[j]["miletxt"] = miletxt;
        jgvteach.push(jglist[j]);
      }
      this.jglist = jglist;
      this.jgvteach=jgvteach;
    });
  }

  typeid="0";
  ages=0;
  minage:0;
  maxage:0;
  loadcourse(e=undefined) {
    var jigouapi = this.jigouApi;;
    var mylat = this.mylat;
    var mylng = this.mylng;
    var opt=null;
    opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };

    if (this.fdistrict_id != "0") {
      opt.district_id = this.fdistrict_id;
    }

    if (this.typeid != "0") {
      opt.type = this.params.typeid;

    }
    if (this.params.keyword != undefined) {
      opt.searchkeyword = this.params.keyword;
    }


    if (this.ages == 1) {
      opt.ages = this.ages;
      opt.minage = this.minage;
      opt.maxage = this.maxage;
    }

    //opt.type = 1;
    // }
    if (this.fage_id != "0") {
      opt.age = this.fage_id;
    }
    if (this.options == "j_x") {
      opt.orderby = "jxrate,distance";
    }
    if (this.options == "x_s") {
      opt.orderby = "up_time desc,distance";
    }
    if (this.options == "bm_za") {
      opt.orderby = "people_num desc,distance";
    }
    if (this.options == "h_p") {
      opt.orderby = "scoring desc,distance";
    }

    // opt.limit="100";

    jigouapi.courselist(opt).then((courselist) => {
      console.log("提交了哈哈啊");
      console.log(opt);

      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {

        var mile = this.util.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        var miletxt = this.util.GetMileTxt(mile);
        courselist[i]["miletxt"] = miletxt;
        courselist[i]["zuidijia"] = this.util.zuidijia(
          courselist[i].expeprice, courselist[i].price, courselist[i].isgroup, courselist[i].isgroup_tiyan);
        vteach.push(courselist[i]);
      }
      this.courselist = courselist;
      this.vteach=vteach;
    });
  }


  onReachBottom(e=undefined) {


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
        return;
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.vteach=vteach;
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
        return;
      }
      if (cs != 0) {
        setTimeout(() => {
          this.jgvteach=jgvteach;
        }, 500);
      }
    }

    console.log("diaoni3");


  }


  hideFilter(e=undefined) {
    var tdistrict_id = this.fdistrict_id;
    var ttype_id = this.ftype_id;
    var tage_id = this.fage_id;
    this.options_show= false;
    this.tdistrict_id=tdistrict_id;
    this.ttype_id=ttype_id;
    this.tage_id=tage_id;
  }


  bindScreening(e) {
    var qd = e.target.dataset.qd;
    if (qd == "ok") {
      var fdistrict_id = this.tdistrict_id;
      var ftype_id = this.ttype_id;
      var fage_id = this.tage_id;
      this.options_show= false;
      this.fdistrict_id=fdistrict_id;
      this.ftype_id=ftype_id;
      this.fage_id=fage_id;
      this.loadcourse();
    } else {

      var tdistrict_id = this.fdistrict_id;
      var ttype_id = this.ftype_id;
      var tage_id = this.fage_id;
      this.options_show= true;
      this.tdistrict_id=tdistrict_id;
      this.ttype_id=ttype_id;
      this.tage_id=tage_id;
    }

  }
  changeDistrict(e) {
    console.log(e);
    var seq = parseInt(e.target.id);
    if (seq == -1) {
      this.fdistrict_id= "0";
      this.xiala= "yc";
      this.xialakc= "yc";
      this.xialaage= "yc";
    } else {

      var filterdistrict = this.filterdistrict;
      this.fdistrict_id= filterdistrict[seq].id;
      this.xiala= "yc";
      this.xialakc= "yc";
      this.xialaage= "yc";
    }

    this.backtotop();
    this.loadjg();
    this.loadcourse();

  }


  changeage(e) {
    var seq = parseInt(e.target.id);

    console.log(seq, "各个")

    var minage = e.target.dataset.minage;
    var maxage = e.target.dataset.maxage;

    console.log('最小值' + minage)
    console.log('最大值' + maxage)
    if (seq == -1) {
      this.ages= 0;
      this.ageid= seq;
      this.xiala= "yc";
      this.xialakc= "yc";
      this.xialaage= "yc";
    } else {
      this.ages= 1;
      this.ageid= seq;
      this.minage= minage;
      this.maxage= maxage;
      this.xiala= "yc";
      this.xialakc= "yc";
      this.xialaage= "yc";
    }

    this.backtotop();
    this.loadcourse();

  }


  setTDistrict(e) {
    var id = e.target.id;
    this.tdistrict_id=id;
  }
  setTType(e) {
    var id = e.target.id;
    this.ttype_id=id;
  }
  setTAge(e) {
    var id = e.target.id;
    this.tage_id=id;
  }
  resetFilter(e=undefined) {
    var that = this;

    this.showConfirm("确认重置？",(ret)=>{
      var tdistrict_id = that.fdistrict_id;
      var ttype_id = that.ftype_id;
      var tage_id = that.fage_id;
      this.tdistrict_id= "0";
      this.ttype_id= "0";
      this.tage_id= "0";
    });
  }


  bindxiala(e) {
    var xiala = this.xiala;
    this.xiala=xiala == "xs" ? "yc" : "xs";
  }

  bindxialakc(e) {
    // var xialakc = this.xialakc;

    // this.Base.setMyData({
    //   xialakc: xialakc == "xs" ? "yc" : "xs"
    // })

    var fdistrict_id = e.target.id;

    this.options_show= false;
    this.fdistrict_id=fdistrict_id;

    this.loadcourse();


  }

  bindxialaage(e) {
    var xialaage = this.xialaage;
    this.xialaage= xialaage == "xs" ? "yc" : "xs";
  }

  yingcang(e) {
    this.xiala= "yc";
    this.xialakc= "yc";
    this.xialaage= "yc";
  }

  catchTouchMove(e=undefined) {
    return false;
  }


  onShareAppMessage(e=undefined) {
    console.log('haha');
    var url = "/pages/seek/seek?type=" + this.params.type +
      "&fage_id=" + this.fage_id +
      "&fdistrict_id=" + this.fdistrict_id + '&typename=' + this.params.typename;
    //"&keyword=" + this.params.keyword +

    if (this.params.keyword != undefined) {
      url += "&keyword=" + this.params.keyword;
    }
    return {
      path: url
    };
  }


}
