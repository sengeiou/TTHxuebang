import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-seek',
  templateUrl: './seek.page.html',
  styleUrls: ['./seek.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class SeekPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  courselist = [];
  jglist = [];
  xiala= "yc";
  xialakc= "yc";
  xialaage= "yc";
 //type= "kc";
  show= "jx";
  ageid=-1;
  mylat= 0;
  mylng= 0;
  filtercoursetype= [];
  ttype_id= "0";
  filtercourseage= [];
  tage_id= "0";
  filterdistrict= [];
  tdistrict_id= "0";
  params_show= false;
  buyshow= [];
  vteach= [];
  type= "";
  fdistrict_id= "0";
  fage_id= "0";
  ftype_id= "0";
  gongaolist=[];

  onLoad() {
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

    this.type= this.params.type;
    this.fdistrict_id= this.params.fdistrict_id;
    this.fage_id= this.params.fage_id;
    this.ftype_id= this.params.ftype_id;

    //  console.log(this.this.params.type);

    this.setPageTitle(this.params);

    var jigouapi = this.jigouApi;;
    jigouapi.gongaolist({
      orderby: " rand() "
    }).then( (gongaolist) => {
this.gongaolist=gongaolist;
    });

    jigouapi.coursetype({}).then( (filtercoursetype) => {
      this.filtercoursetype=filtercoursetype;
    });
    jigouapi.courseage({}).then( (filtercourseage) => {
      this.filtercourseage=filtercourseage;
    });
    jigouapi.buyshow({
      limit: '20'
    }).then( (buyshow) => {
      this.buyshow=buyshow;
    });

  }

  timerStart;

  onUnload() {
    var timerStart = this.timerStart;
    clearInterval(timerStart);
  }
  onMyShow() {
    var that = this;

    var jigouapi = this.jigouApi;;
    var isload = this.isload;
    if (isload == true) {
      return;
    }
    this.Base.setMyData({
      isload: true
    });
    wx.showLoading({
      title: '加载中...'
    });

    var type = this.type;

    var that = this;
    var instapi = this.instApi;;
    var show = this.show;


    console.log(show);



    jigouapi.activedistrictlist({
      city_id: AppBase.CITYID
    }).then( (filterdistrict) => {

      this.Base.setMyData({
        filterdistrict
      });
      //默认搜索罗湖区算了

      // if ((1 == 1 || this.params.type == 'jg') && this.fdistrict_id == 0) {
      //   console.log(this.Base.getMyData());
      //   var address = this.address;
      //   var adcode = address.ad_info.adcode;
      //   for (var i = 0; i < filterdistrict.length; i++) {
      //     if (adcode == filterdistrict[i].id) {
      //       var fdistrict_id = filterdistrict[i].id;
      //       this.Base.setMyData({
      //         fdistrict_id
      //       });
      //     }
      //   }
      // }
      if (type == "kc") {
        this.loadcourse();
      } else {
        this.loadjg();
      }
    });

    setTimeout(() => {
      wx.hideLoading()
    }, 1000);


  }
  tojgdetails(e) {
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
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
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
    var type = e.target.dataset.type;
    console.log(type);
    if (type == "jx") {
      this.Base.setMyData({
        show: "jx"
      })
    }
    if (type == "xs") {
      this.Base.setMyData({
        show: "xs"
      })
    }
    if (type == "hp") {
      this.Base.setMyData({
        show: "hp"
      })
    }
    this.loadjg();

  }

  bindxuanxiang(e) {
    var this.params = e.target.dataset.this.params;
    console.log(this.params);
    if (this.params == "j_x") {
      this.Base.setMyData({
        this.params: "j_x"
      })

    }
    if (this.params == "x_s") {
      this.Base.setMyData({
        this.params: "x_s"
      })


    }
    if (this.params == "bm_za") {
      this.Base.setMyData({
        this.params: "bm_za"
      })


    }
    if (this.params == "h_p") {
      this.Base.setMyData({
        this.params: "h_p"
      })

    }
    this.loadcourse();
  }


  loadjg() {
    var jigouapi = this.jigouApi;;
    var mylat = this.mylat;
    var mylng = this.mylng;


    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };
    var data = this.Base.getMyData();

    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    if (data.show == "jx") {
      opt.orderby = "jxrate,distance";
    }
    if (data.show == "xs") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.show == "hp") {
      opt.orderby = "scoring desc,distance";
    }
    //opt.limit="100";

    jigouapi.jglist(opt, (jglist) => {


      var jgvteach = [];
      for (var j = 0; j < jglist.length && j < 5; j++) {
        var mile = this.util.GetDistance(mylat, mylng, jglist[j].lat, jglist[j].lng);
        var miletxt = this.util.GetMileTxt(mile);
        jglist[j]["miletxt"] = miletxt;
        jgvteach.push(jglist[j]);
      }
      this.Base.jglist = jglist;
      this.Base.setMyData({
        jgvteach
      });
    });
  }


  loadcourse() {
    var jigouapi = this.jigouApi;;
    var mylat = this.mylat;
    var mylng = this.mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };

    var data = this.Base.getMyData();
    console.log("loadcourse", data);
    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    
    if (data.typeid != "0") {
      opt.type = this.params.typeid;
       
    }
    if (this.params.keyword!=undefined){
      opt.searchkeyword = this.params.keyword;
    }
    

    if (data.ages == 1) {
      opt.ages = data.ages;
      opt.minage = data.minage;
      opt.maxage = data.maxage;
    }

    //opt.type = 1;
    // }
    if (data.fage_id != "0") {
      opt.age = data.fage_id;
    }
    if (data.this.params == "j_x") {
      opt.orderby = "jxrate,distance";
    }
    if (data.this.params == "x_s") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.this.params == "bm_za") {
      opt.orderby = "people_num desc,distance";
    }
    if (data.this.params == "h_p") {
      opt.orderby = "scoring desc,distance";
    }

    // opt.limit="100";

    jigouapi.courselist(opt, (courselist) => {
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
      this.Base.courselist = courselist;
      this.Base.setMyData({
        vteach
      });

    });
  }



  // onReachBottom() {
  //   console.log("???kk");
  //   var vteach = this.vteach;
  //   var courselist = this.courselist;

  //   var count = 0;
  //   for (var i = vteach.length; i < courselist.length; i++) {
  //     vteach.push(courselist[i]);
  //     count++;
  //     if (count >= 3) {
  //       break;
  //     }
  //   }

  //   if (count == 0) {
  //     wx.showToast({
  //       title: '已经没有了',
  //       nomore: 1,
  //       icon: 'none'
  //     })
  //   }
  //   else {
  //     setTimeout(() => {
  //       console.log("llll");
  //       this.Base.setMyData({
  //         vteach
  //       });
  //     }, 100);
  //   }
  // }

  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })


    var mylat = this.mylat;
    var mylng = this.mylng;

    var jgvteach = this.jgvteach;
    var vteach = this.vteach;
    var courselist = this.Base.courselist;
    var jglist = this.Base.jglist;
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
            vteach
          });
          wx.hideLoading()
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
            jgvteach
          });
          wx.hideLoading()
        }, 500);
      }
    }

    console.log("diaoni3");


  }


  hideFilter() {
    var data = this.Base.getMyData();
    var tdistrict_id = data.fdistrict_id;
    var ttype_id = data.ftype_id;
    var tage_id = data.fage_id;
    this.Base.setMyData({
      this.params_show: false,
      tdistrict_id,
      ttype_id,
      tage_id
    });
  }


  bindScreening(e) {
    var data = this.Base.getMyData();
    var qd = e.target.dataset.qd;
    if (qd == "ok") {
      var fdistrict_id = data.tdistrict_id;
      var ftype_id = data.ttype_id;
      var fage_id = data.tage_id;
      this.Base.setMyData({
        this.params_show: false,
        fdistrict_id,
        ftype_id,
        fage_id
      });
      this.loadcourse();
    } else {

      var tdistrict_id = data.fdistrict_id;
      var ttype_id = data.ftype_id;
      var tage_id = data.fage_id;
      this.Base.setMyData({
        // this.params: "s_x",
        this.params_show: true,
        tdistrict_id,
        ttype_id,
        tage_id
      })
    }

  }
  changeDistrict(e) {
    console.log(e);
    var seq = parseInt(e.target.id);
    if (seq == -1) {
      this.Base.setMyData({
        fdistrict_id: 0,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    } else {

      var filterdistrict = this.filterdistrict;
      this.Base.setMyData({
        fdistrict_id: filterdistrict[seq].id,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    }

    this.backtotop();
    this.loadjg();
    this.loadcourse();

  }


  changeage(e) {
    var seq = parseInt(e.target.id);

    console.log(seq,"各个")

    var minage=e.target.dataset.minage;
    var maxage = e.target.dataset.maxage;

    console.log('最小值' + minage)
    console.log('最大值' + maxage)
    if (seq == -1) {
      this.Base.setMyData({
        ages: 0,
        ageid: seq,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    } else {
 
      this.Base.setMyData({
        ages: 1,
        ageid: seq,
        minage: minage,
        maxage: maxage,
        xiala: "yc",
        xialakc: "yc",
        xialaage: "yc",
      });
    }

    this.backtotop(); 
    this.loadcourse();

  }


  setTDistrict(e) {
    var id = e.target.id;
    this.Base.setMyData({
      tdistrict_id: id
    });
  }
  setTType(e) {
    var id = e.target.id;
    this.Base.setMyData({
      ttype_id: id
    });
  }
  setTAge(e) {
    console.log("555555555");
    var id = e.target.id;
    this.Base.setMyData({
      tage_id: id
    });
  }
  resetFilter() {
    var that = this;



    // var that=this;
    wx.showModal({
      title: '确定',
      content: '确认重置？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {


          var tdistrict_id = that.fdistrict_id;
          var ttype_id = that.ftype_id;
          var tage_id = that.fage_id;

          that.Base.setMyData({
            tdistrict_id: 0,
            ttype_id: 0,
            tage_id: 0
          });



          // // wx.showToast({
          // //   title: '保存成功',
          // //   icon: '',
          // // })
        }
      }
    });




  }


  bindxiala(e) {
    var xiala = this.xiala;

    this.Base.setMyData({
      xiala: xiala == "xs" ? "yc" : "xs"
    })

  }

  bindxialakc(e) {
    // var xialakc = this.xialakc;

    // this.Base.setMyData({
    //   xialakc: xialakc == "xs" ? "yc" : "xs"
    // })
    var data = this.Base.getMyData();

    var fdistrict_id = e.target.id;
    


    this.Base.setMyData({
      this.params_show: false,
      fdistrict_id
    });
    this.loadcourse();
 

  }

  bindxialaage(e) {
    var xialaage = this.xialaage;

    this.Base.setMyData({
      xialaage: xialaage == "xs" ? "yc" : "xs"
    })
  }

  yingcang(e) {
    this.Base.setMyData({
      xiala: "yc",
      xialakc: "yc",
      xialaage: "yc",
    })
  }

  catchTouchMove() {
    return false;
  }


  onShareAppMessage() {
    var data = this.Base.getMyData();
    console.log("/pages/seek/seek?type=" + data.type +
      "&ftype_id=" + data.type_id +
      "&fage_id=" + data.fage_id +
      "&fdistrict_id=" + data.fdistrict_id);
    console.log('haha');
    var url = "/pages/seek/seek?type=" + this.params.type +
      "&fage_id=" + data.fage_id +
      "&fdistrict_id=" + data.fdistrict_id +'&typename='+this.params.typename;
    //"&keyword=" + this.params.keyword +
    
    if (this.params.keyword!=undefined){
      url += "&keyword=" + this.params.keyword;
    }
    return {
      path: url
    };
  }


}
