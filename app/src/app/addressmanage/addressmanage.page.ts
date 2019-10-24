import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AddressApi } from 'src/providers/address.api';

@Component({
  selector: 'app-addressmanage',
  templateUrl: './addressmanage.page.html',
  styleUrls: ['./addressmanage.page.scss'],
  providers: [MemberApi, AddressApi]
})
export class AddressmanagePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public addressApi: AddressApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  type = "mine";
  xiugai = null;
  id = 0;
  onMyLoad() {
    //参数
    this.params;
    // if (this.params.id != undefined) {
    //   this.id = this.params.id;
    //   var addressapi = this.addressApi;
    //   addressapi.addressinfo({
    //     id: this.params.id
    //   }).then((info) => {
    //     this.formdata = info;
    //   })
    // }
  }
  onMyShow() {
    var that = this;
    var instapi = this.addressApi;
    if (this.params.id != undefined) {
      this.id = this.params.id;
      var addressapi = this.addressApi;
      addressapi.addressinfo({
        id: this.params.id
      }).then((info) => {
        this.formdata = info;
      })
    }



  }

  show=0;



  confirm(e) {
    var that = this;
    var data = this.formdata;
    console.log(data)
    var member_id = this.MemberInfo.id;
    console.log(this.MemberInfo.id , "乐扣乐扣")

    if (data.name == ""||data.name==null||data.name==undefined) {
      this.showAlert("请填写收件人姓名");
      return;
    }

    if (data.phonenumber == ""||data.phonenumber==null||data.phonenumber==undefined) {
      this.showAlert("请填写手机号");
      return;
    }

    if (data.region == ""||data.region==null||data.region==undefined) {
      this.showAlert("请选择地址");
      return;
    }

    if (data.address == ""||data.address==null||data.address==undefined) {
      this.showAlert("请填写门牌号");
      return;
    }

    this.showConfirm("确认保存地址？",(ret)=>{
      if(ret==true){

        var addressapi = this.addressApi;


        if (that.id>0) {
          addressapi.updateaddress({
            id: that.params.id,
            member_id: member_id,
            name: data.name,
            phonenumber: data.phonenumber,
            region: data.region,
            address: data.address,
            status: "A"
          }).then((updateaddress) => {
            
            this.back();

          })
        } else {
          addressapi.addedaddress({
            member_id: 1,
            name: data.name,
            phonenumber: data.phonenumber,
            region: data.region,
            address: data.address,
            status: "A"
          }).then( (res) => {

            // this.back();
            console.log(res)
            if (res.code == 0) {this.back();}

          })
        }

      }
    });


  }



  binddeleted() {
    var that = this;
    var addressapi = this.addressApi;
    this.showConfirm("确认删除该地址？",(ret)=>{
      if(ret==true){
        addressapi.deleteaddress({
          id: that.params.id
        }).then( (deleteaddress) => {
          
          this.toast("删除成功");

          this.back();

        })
      }
    });
    
  }
}
