import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { AliyunApi } from 'src/providers/aliyun.api';
import { HaibaoApi } from 'src/providers/haibao.api';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
  providers: [MemberApi, JigouApi,AliyunApi,HaibaoApi]
})
export class PromotionPage extends AppBase {

  constructor(public zone:NgZone, public router: Router, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public aliyunApi: AliyunApi,
    public haibaoApi: HaibaoApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,zone);
    this.headerscroptshow = 480;

  }
  name = "";
  photo = "";
  yanzhenma = "";
  dizhi = "";
  shijian = 0;
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  ycmobilestr(str) {
    return str.substr(0, 3) + "****" + str.substr(7);
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));

    return days < b;

  }
  dianle = false;
  ycmobile = "";
  tuiguaninfo;
  showModal;
  leijikehu= 0;
  xiajituiguan= 0;
  onMyShow(e=undefined) {
    var api = this.jigouApi;;
    var that = this;
    this.dianle = false;
    var mobile = this.MemberInfo.mobile;
    if (mobile != '') {
      this.ycmobile = this.ycmobilestr(mobile);
    }

    api.fenxiaoinfo({}).then((res) => {
      console.log(res);
      console.log(1231313);
      console.log(res.length);
      this.tuiguaninfo = res;
      if (res.length == 0) {
        this.showModal = true;
      }

    })
    var memberapi = this.memberApi;;
    var leijikehu = [];
    var xiajituiguan = [];
    var shijian = this.InstInfo.xiajishijian;
    memberapi.chakanxiaji({}).then((xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {

        leijikehu.push(xiaji[i]);
      }
      this.leijikehu= leijikehu.length;
      this.xiajituiguan= leijikehu.length;
      this.zhuandindan(leijikehu) ;
    })


  }
  tuiguanguize(e) {
    // this.navigateTo({
    //   url: '/pages/tuiguanguize/tuiguanguize',
    // })
    this.navigate('tuiguanguize');
  }
  hideModal(e) {
    this.showModal=false;
  }
  queren(e) {
    var that = this;
    var api = this.jigouApi;;
    var name = this.name;
    var photo = this.photo;
    var yanzhenma = this.yanzhenma;
    var dizhi = this.dizhi;
    console.log(name);
    console.log(photo);
    console.log(yanzhenma);
    console.log(dizhi);
    if (name == '') {
      this.showAlert("请填写真实姓名");
      return
    }
    if (photo == '') {
      photo = this.MemberInfo.mobile;
    }
    if (yanzhenma == '') {
      this.showAlert("请输入验证码");
      return
    }
    if (dizhi == '') {
      this.showAlert("请输入地址");
      return
    }
    var aliyun = this.aliyunApi;
    aliyun.verifycode({ mobile: photo, type: 'tixian', verifycode: yanzhenma }).then((res) => {
      if (res.code == 0) {
        api.fenxiaoshenhe({ reainame: name, mobile: photo, dizhi: dizhi }).then((res) => {

          if (res.code == '0') {
            that.showModal=false;
            // this.navigateTo({
            //   url: '/pages/review/review',
            // })
            this.navigate('review')
          }

        })

      }
      else {

        this.showAlert("验证码错误");
        return

      }

    })
    return


  }
  lijitixian(e=undefined) {

    // this.navigateTo({
    //   url: '/pages/tixian/tixian',
    // })
    this.navigate('tixian')
  }
  mykehu(e=undefined) {

    if (this.leijikehu == 0) {
      this.showAlert("暂无邀请的好友，快去邀请好友吧")
      return
    }
    // this.navigateTo({
    //   url: '/pages/mykehu/mykehu',
    // })
    this.navigate('mykehu')
  }

  myinvite(e=undefined) {
    if (this.xiajituiguan == 0) {
      this.showAlert("暂无成功邀请的推广员，请先邀请好友成为推广员。")
      return
    }
    // this.navigateTo({
    //   url: '/pages/myinvite/myinvite',
    // })
    this.navigate('myinvite')
  }
  tuiguandindan(tuiguandindan) {
    if (tuiguandindan == 0) {
      this.showAlert("暂无推广订单")
      return
    }
    // this.navigateTo({
    //   url: '/pages/tuiguandindan/tuiguandindan',
    // })
    this.navigate('tuiguandindan')
  }
  yaoqin(e=undefined) {
    var api = this.haibaoApi;

    if (this.dianle == true) {
      return
    }

    if (this.tuiguaninfo.length == 0 || this.tuiguaninfo[0].status == 'A') {
      this.showAlert("您现在还不是推广员");
      return
    }

    this.dianle=true;

    api.haibao({ isdebug: 'Y' }).then((res) => {
      console.log(res);
      if (res.code == 0) {
        // this.navigateTo({
        //   url: '/pages/yaoqinhaibao/yaoqinhaibao?name=' + res.return,
        // })

        this.navigate('yaoqinhaibao')

      }
    })

  }
  zhuandindan(quanbu) {
    var dindan = [];

    quanbu.map((item) => {

      item.dindan.map((item1) => {
        dindan.push(item1)
      })

    })
    console.log("嚯嚯嚯");
    console.log(dindan);
    return dindan;

  }
  fason(e=undefined) {

    var shouji = this.photo;

    if (shouji.length != 11 || shouji[0] != '1') {
      this.showAlert("手机号格式错误");
      return
    }

    var that = this;

    var api = this.aliyunApi;

    api.sendverifycode({ mobile: shouji, type: 'tixian' }).then((res) => {
      if (res.code == 0) {
        var shu = 60;
        var aaaa = setInterval(() => {
          shu--;
          this.shijian=shu;
          if (shu == 0) {
            clearInterval(aaaa);
          }
        }, 1000)

      }
      else {
        console.log(res);
        console.log("发送失败");

      }
    })
  }

}
