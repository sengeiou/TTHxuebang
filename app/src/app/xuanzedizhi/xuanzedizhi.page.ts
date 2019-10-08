import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';
import { JifenApi } from 'src/providers/jifen.api';

@Component({
  selector: 'app-xuanzedizhi',
  templateUrl: './xuanzedizhi.page.html',
  styleUrls: ['./xuanzedizhi.page.scss'],
  providers: [MemberApi, AddressApi,JifenApi]
})
export class XuanzedizhiPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public addressApi: AddressApi,
    public jifenApi:JifenApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  show;
  jifen;
  kong;
  type;
  onMyLoad(e=undefined) {
    //参数
    this.params;
    this.show = false;
    this.jifen = this.params.interral;
    this.kong = false;
    this.type = this.params.type
  }
  addresslist = [];
  onMyShow(e=undefined) {
    var that = this;
    var addressapi = this.addressApi;

    addressapi.addresslist({ member_id: this.MemberInfo.id }).then((addresslist) => {
      this.addresslist = addresslist;
    })

  }

  check;
  bindcheck(e) {
    var id = e.target.id;
    this.check = id;
  }

  addressmanage(e) {
    var id = e.target.id;
    this.navigateTo({
      url: '/pages/addressmanage/addressmanage?xiugai=1&id=' + id,
    })
  }

  addnew(e) {

    this.navigateTo({
      url: '/pages/addressmanage/addressmanage',
    })
  }
  info;
  xiaofei=0;
  queren(e) {
    var jifen = this.params.interral;


    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({ id: this.params.id }).then((info) => {

      this.info=info;

    })




    var shuliang = this.params.shuliang;
    if (this.check == null) {
      this.toast("请选择地址");
      return;
    }
    this.show= true;
    this.xiaofei= jifen * shuliang;

  }
  tanchuan;
  quedin(e) {

    console.log(this.info.inventory);
    //return;

    if (this.info.inventory == 0) {
      this.showToast({
        title: '库存不足，无法兑换',
        icon: 'none'
      })
      this.show=false;
      return;
    }

    console.log("成功");

    //return;
    var inventory = this.params.inventory;

    var jifen = this.params.interral;
    var shuliang = this.params.shuliang;

    var myjifen = e.target.id;
    var img = this.params.img;

    console.log(img);
    //return;

    var shanpin = this.params.name;

    var shengyu = myjifen - jifen * shuliang;

    var zonger = jifen * shuliang;



    console.log(shengyu + "剩余");
    if (parseInt(jifen) > parseInt(myjifen)) {
      this.kong=true;
      return;
    }
    //return;
    var jifenapi = this.jifenApi;;

    var addressapi = this.addressApi;

    addressapi.addressinfo({
      id: this.check
    }).then((info) => {


      jifenapi.addjifenorder({
        member_id: this.MemberInfo.id,
        jifen: zonger,
        danjia: jifen,
        img: img,
        shuliang: shuliang,
        name: shanpin,
        orderstatus: "A",
        consignee: info.name,
        mobile: info.phonenumber,
        address: info.region + info.address,
        orderid: '1234567891011',
        status: "A"
      }).then((addjifenorder) => {


        var jifenapi = this.jifenApi;;

        jifenapi.deduction({ member_id: this.MemberInfo.id, goods_id: this.params.id });


        //console.log(addjifenorder.return+"阿");
        // return;

        jifenapi.updatekucun({ id: this.params.id, inventory: inventory - shuliang });

        jifenapi.updatejifen({ id: this.MemberInfo.id, integral: shengyu }).then((updatejifen) => {
        
          this.tanchuan=2;
          this.show=false;
          //this.onMyShow();
          this.redirectTo({
            url: '/pages/yiduihuang/yiduihuang?id=' + addjifenorder.return + '&shopid=' + this.params.id,
          })
        })

        //this.Base.setMyData({ addjifenorder })

      })

      // this.Base.setMyData({
      //   info
      // })
    })



  }
  quxiao(e) {
    this.show=false;
  }
}
