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
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-pingjia',
  templateUrl: './pingjia.page.html',
  styleUrls: ['./pingjia.page.scss'],
  providers: [MemberApi, JigouApi,PingjiaApi,JifenApi]
})
export class PingjiaPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public pingjiaApi: PingjiaApi,
    public jifenApi: JifenApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  images = [];
  pingfen = 0;
  jgpingfen = 0;
  check = false;
  focus = false;
  kcinfo = null;
  jg_id = 0;
  onMyLoad(e=undefined) {
    //参数
    this.params;
  }
  onMyShow(e=undefined) {
    var that = this;

    var api = this.jigouApi;;

    api.courseinfo({ id: this.params.id }).then((kcinfo) => {
      this.kcinfo = kcinfo;
      this.jg_id = kcinfo.jg_id;
    })

  }

  checkclick(ck) {
    console.log(ck);
    if (ck == "nm") {
      this.check = false;
    } else {
      this.check = true;
    }
  }

  uploadimg(e) {
    //todo
    // var that = this;
    // this.Base.uploadImage("pingjia", (ret) => {
    //   var images = that.images;
    //   images.push(ret);
    //   that.Base.setMyData({
    //     images
    //   });
    // }, 6, undefined);
  }

  minusImg(seq) {
    var that = this;
    var images = that.images;
    var imgs = [];
    for (var i = 0; i < images.length; i++) {
      if (seq != i) {
        imgs.push(images[i]);
      }
    }
    this.images = imgs;
  }

  //课程评分
  bindkcpingfen(e) {
    var fen = e.target.id;
    this.pingfen = fen;
  }


  //机构评分
  bindjgpingfen(e) {
    var jgfen = e.target.id;
    this.jgpingfen = jgfen;
  }
  show(e) {
    this.focus = true;
  }
  niming = "";
  submit(e) {

    var that = this;
    var data = e.detail.value;

    var pingfen = this.pingfen;
    console.log(pingfen + "课程评分");

    var jgpingfen = this.jgpingfen;
    console.log(jgpingfen + "机构评分");

    var text = data.text;
    console.log(text + "评分文字");

    if (this.check == false) {
      this.niming = "N";
    } else {
      this.niming = "Y";
    }
    var niming = this.niming;
    console.log(this.check + "是否匿名");
    console.log(niming + "是否匿名");

    if (data.text == null || data.text == "") {
      this.showAlert("请输入您的评价");
      return;
    }

    var img1 = that.images[0];
    var img2 = that.images[1];
    var img3 = that.images[2];
    var img4 = that.images[3];
    var img5 = that.images[4];
    var img6 = that.images[5];

    console.log(img1 + "困了累了");
    // return;
    this.showConfirm("确认提交评价？", (ret) => {
      if (ret) {
        var pingjiaapi = this.pingjiaApi;;

        pingjiaapi.addpingjia({
          member_id: that.MemberInfo.id,
          mechanism_id: that.jg_id,
          kecheng_id: that.params.id,
          order_id: that.params.order_id,
          pingfen: pingfen,
          jgpingfen: jgpingfen,
          content: text,
          img1: img1,
          img2: img2,
          img3: img3,
          img4: img4,
          img5: img5,
          img6: img6,
          niming: niming,
          status: "A"
        }).then((addpingjia) => {

          var jifenapi = this.jifenApi;;
          jifenapi.addjifen({ member_id: that.MemberInfo.id, unicode: "pingjia" })

        });


        this.navigate("pingjiawanchen");
        this.toast("提交成功");

      }
    });


  }
}
