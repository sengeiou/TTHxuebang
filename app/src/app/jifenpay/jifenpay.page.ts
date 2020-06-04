import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { TeacherApi } from 'src/providers/teacher.api';
import { JigouApi } from 'src/providers/jigou.api';
import { nextTick } from 'q';
import { JifenApi } from 'src/providers/jifen.api';
import { AddressApi } from 'src/providers/address.api';
declare let WeixinJSBridge: any; 

@Component({
  selector: 'app-jifenpay',
  templateUrl: './jifenpay.page.html',
  styleUrls: ['./jifenpay.page.scss'],
  providers: [MemberApi, JifenApi, JigouApi,AddressApi]
})
export class JifenpayPage extends AppBase {

  static Instance=null;

  constructor(public zone: NgZone, public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public jifenApi: JifenApi,
    public addressApi: AddressApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute, zone);
    this.headerscroptshow = 480;
    
  }

  public address_id=0;
  shuliang=1;
  info=null;

  errorreturn="";
  

  pay(e) {

    var jifenapi = this.jifenApi;;

    if (this.address_id == 0) {
      this.showAlert("请先选择收货人地址");
      return;
    }

    this.showConfirm("是否确认支付?", () => {
      var info = this.info;
      var addressinfo = this.addressinfo;
      var shuliang = this.shuliang;
      jifenapi.addjifenorder({
        goods_id: this.params.id,
        member_id: this.MemberInfo.id,
        payamount: info.price * shuliang,
        danjia: info.price,
        img: info.imgs,
        shuliang: shuliang,
        name: info.name,
        orderstatus: "P",
        paytype: "X",
        consignee: addressinfo.name,
        mobile: addressinfo.phonenumber,
        address: addressinfo.region + addressinfo.address,
        // orderid:'1234567891011',
        status: "A"
      }).then((ret) => {
        if (ret.code != 0) {
          this.showerror=true;
          this.errorreturn=ret.return;
        } else {
          jifenapi.prepay({
            id: ret.return,
            h5:"Y"
          }).then((payret) => {

            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', payret,
              (res) => {
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  this.redirectTo({
                    url: '/jifenpaysuccess/jifenpaysuccess?paytype=X&id=' + ret.return,
                  })
                }
              });

            
            console.log(payret);
            //this.requestPayment(payret)
          });
        }
      });


    });

  }
  addressinfo=null;

  onMyShow() {

    JifenpayPage.Instance=this;

    var that = this;
    if (this.address_id != 0) {

      var addressapi = this.addressApi;
      addressapi.addressinfo({
        id: this.address_id
      }).then((info) => {
        this.addressinfo=info;
      })
    }


    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({
      id: this.params.id
    }).then((info) => {
      this.info=info;
    })

  }
  towuliu(e) {

  }
  shouhuo(e) {

  }

  xuanzedizhi(e) {
    this.navigateTo({
      url: '/xuanzedizhi/xuanzedizhi?selectback=Y'
    })
  }


  jia(e) {
    this.shuliang++;
  }
  jian(e) {
    var shuliang = this.shuliang;
    if (shuliang > 1) {
      this.shuliang--;
    }
    
  }
  showduihuanqueren=false;
  showerror=false;

  duihuan() {
    if (this.address_id == 0) {
      this.showAlert("请先选择收货人地址");
      return;
    }
    this.showduihuanqueren=true;
  }
  quxiaoduihuan() {
    this.showduihuanqueren=false;
    this.showerror=false;
  }
  qurenduihuan(){
    this.showduihuanqueren=false;
    this.showerror=false;

    var info = this.info;
    var addressinfo = this.addressinfo;
    var shuliang = this.shuliang;

    var jifenapi = this.jifenApi;;
    jifenapi.addjifenorder({
      goods_id: this.params.id,
      member_id: this.MemberInfo.id,
      jifen: shuliang * info.interral,
      danjia: info.interral,
      img: info.imgs,
      shuliang: shuliang,
      name: info.name,
      paytype:"B",
      orderstatus: "A",
      consignee: addressinfo.name,
      mobile: addressinfo.phonenumber,
      address: addressinfo.region + addressinfo.address,
      status: "A"
    }).then((ret) => {

      if(ret.code==0){
        this.redirectTo({
          url: '/jifenpaysuccess/jifenpaysuccess?paytype=X&id=' + ret.return,
        })
      }else{
        this.errorreturn=ret.return;
        this.showerror=true;
      }
    })


  }
}
