import { Component, NgZone, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { InstApi } from 'src/providers/inst.api';
import { JigouApi } from 'src/providers/jigou.api';
import { MineApi } from 'src/providers/mine.api';

@Component({
  selector: 'app-addmechanism',
  templateUrl: './addmechanism.page.html',
  styleUrls: ['./addmechanism.page.scss'],
  providers:[MemberApi,InstApi,JigouApi,MineApi]
})
export class AddmechanismPage  extends AppBase {

  constructor(public zone:NgZone, public router: Router,  
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public instApi:InstApi,
    public jigouApi:JigouApi,
    public mineApi:MineApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  currentItemId= 2;
  show= 1;
  region= [];
  jgimages= [];
  hjimages= [];
  skimages= [];
  list= [];
  kclist= [];
  tc=false;

  onMyLoad(){
    //参数
    this.params;
    var idx = {
      name: '',
      nianlin: '',
      yuyue: '',
      shichang: '',
      sex: '',
      kaike: '',
      qingjia: ''
    };

    this.kclist.push(
      idx
    );
    
  }
  onMyShow(e=undefined) {
    var that = this;
    var instapi = this.instApi;
    var jigouapi = this.jigouApi;
    var mineapi = this.mineApi;

  }





  // bindRegionChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     region: e.detail.value
  //   })
  // }

  bindcheck(check) {

    console.log(check)
    if (check == 'N') {
      this.show=2;
    }
    if (check == 'Y') {
      this.show=1;
    }

  }
  // addjigou



  addkecheng(e) {
    var list = this.list;
    var idx = {
      name: '',
      nianlin: '',
      yuyue: '',
      shichang: '',
      sex: '',
      kaike: '',
      qingjia: ''
    };
    this.kclist.push(
      idx
    );
    
  }

  tocontent(e) {
    this.navigate("content");
  }

  useaddress(e=undefined) {
    alert("todo");
    // wx.chooseAddress({
    //   success: (res) => {
    //     console.log(res);

    //     this.Base.setMyData({
    //       pca: res.provinceName + res.cityName + res.countyName,
    //       detail: res.detailInfo,
    //       contacttel: res.telNumber,
    //       contactname: res.userName
    //     });


    //   }
    // })
  }

  tohuiyuan(e) {
    // this.navigateTo({
    //   url: '/pages/huiyuanfuwu/huiyuanfuwu'
    // })
    // this.showToast({
    //   title: '暂未开放，敬请期待',
    //   icon:'none'
    // })
    this.showAlert('暂未开放，敬请期待');
  }

  sex="";
  kk="";
  qj="";

  addjigou=[];

  confirm(e) {
    console.log("form",e);
    var that = this;
    var data = this.formdata;
    console.log(this.formdata);
    var jigouapi = this.jigouApi;

    var jgimages = this.jgimages.slice(0, 19);
    var hjimages = this.hjimages.slice(0, 19);
    var skimages = this.skimages.slice(0, 19);
    //console.log(jgimages);
   // console.log(hjimages);
   // console.log(skimages);
   // console.log("弗兰克攻击力可")

    var sex = this.sex;
    var kaike = this.kk;
    var qingjia = this.qj;
    //return;


    //console.log(sex);
    //console.log(kaike);
    //console.log(qingjia);
    //console.log("双方各")
    // return;

    var name = data.name;

    //var phonetel = /^[1][3,4,5,7,8][0-9]{9}$/;
    //console.log(phonetel);
    //return;
    //var ismobile = phonetel.exec(data.mobile);
    var show = this.show;
    var region = this.region;

    //console.log(this.MemberInfo.id);
    //return;

    //return;

    // if (data.hangye == "") {
    //   this.showAlert("请填写所属行业");
    //   return;
    // }

    if (data.jigou == "") {
      this.showAlert("请填写机构名称");
      return;
    }

    if (data.mobile == "") {
      this.showAlert("请填写联系电话");
      return;
    }


    if (data.address == "") {
      this.showAlert("请填写地址");
      return;
    } 
    if (data.fulladdress == "") {
      this.showAlert("请填写详细地址");
      return;
    } 


    var kclist = that.kclist;
  

    this.showConfirm("确认提交机构申请？",(ret)=>{
      if(ret==true){
       

        jigouapi.addjigou({
          member_id: that.MemberInfo.id,
          hangye: data.hangye,
          name: data.jigou,
          mobile: data.mobile,
          address: region,
          full_address: data.fulladdress,
          jianjie: data.jianjie,
          mentou: jgimages,
          huanjing: hjimages,
          huojiang: skimages,
          appstatus: "I",
          status: "A",
          protocol: "Y"
        }).then( (addjigou) => {

          that.addjigou=addjigou;
          
          var kclist = that.kclist;
          for (var i = 0; i < kclist.length; i++) {

            var k = {
              application_id: addjigou.return,
              name: kclist[i].name,
              age: kclist[i].nianlin,
              date_time: kclist[i].yuyue,
              sex: kclist[i].sex,
              duration: kclist[i].shichang,
              style: kclist[i].kaike,
              claim: kclist[i].qingjia,
              status: "A"
            };
            that.addt(k, i);
          }

        });
        //todo
        //wx.hideLoading();
        

        that.tc=true;

      }
    });

    
  }
  delta=0;

  bindshowtoast(e) {

    this.tc=false;
    this.delta=1;
  }
  addshenqing=null;
  addt(json, i) {
    var jigouapi = this.jigouApi;
    setTimeout(() => {

      jigouapi.addshenqing(json).then((addshenqing) => {
        this.addshenqing=addshenqing;
      })
    }, i * 300);
  }


}
