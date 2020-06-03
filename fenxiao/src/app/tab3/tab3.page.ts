import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { AliyunApi } from 'src/providers/aliyun.api';
import { HaibaoApi } from 'src/providers/haibao.api';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,JigouApi,AliyunApi,HaibaoApi]
})
export class Tab3Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public aliyunApi:AliyunApi,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi,
    public haibaoApi: HaibaoApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
      
  }
  showModal1=false;
  tuiguandindan=[];
  tuiguaninfo=[];
  ycmobile='';
  shijian=0;
  onMyLoad() {

    
  }
  ycmobile1(str) {
    return str.substr(0, 3) + "****" + str.substr(7);
  }
  dianle=false;

  onMyShow() {
    
    var that = this;
   
    var mobile = this.MemberInfo.mobile;
    if (mobile != '') {
      this.ycmobile=this.ycmobile1(mobile)
    }
    var api = this.jigouApi;
    api.fenxiaoinfo({}).then((res)=>{
      console.log(res);
      console.log(1231313);
          console.log(res.length);
          this.tuiguaninfo=res 
          if (res.length == 0 ) {
            this.showModal1=true;
          }
          else{
            this.showModal1=false;
          }

    })
  
    var leijikehu = [];
    var xiajituiguan = [];
    var shijian = this.InstInfo.xiajishijian;
    this.memberApi.chakanxiaji({}).then((xiaji)=>{
      for (var i = 0; i < xiaji.length; i++) {

        leijikehu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(leijikehu);
      console.log(xiajituiguan);
      this.leijikehu=leijikehu.length;
      this.xiajituiguan=leijikehu.length;
      this.tuiguandindan=this.zhuandindan(leijikehu);
     

     
    })
    
  }
  leijikehu=0;
    xiajituiguan=0;
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
  tuiguanguize(){

     this.navigate("tuiguanguize");

  }
  todetails(name){
    var pagename="";
    if (name == "jfsc") {
      pagename="shopmall";
    }
    // if (name == "yhq") {
    //   wx.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if(name=="dd"){
      pagename="myorder";
    }
    if (name == "dz") {
      pagename="address";
    }
    if (name == "xx") {
      pagename="mymessage";
    }
    if (name == "wt") {
      pagename="problem";
    }
    if (name == "sc") {
      pagename="mycollect";
    }
    if (name == "wm") {
      pagename="aboutus";
    }
    if (name == "jg") {
      pagename="addmechanism";
    }
    if (name == "tg") {
      pagename="promotion";
    }

    this.navigate(pagename);
  
  }
  name="";
  photo="";
  yanzhenma="";
  dizhi="";

  name1(e) {
    this.name=e.detail.value ;
  }
 
  yanzhenma1(e) {
    this.yanzhenma=e.detail.value ;
  }
  dizhi1(e) {
    this.dizhi=e.detail.value ;
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
  tuiguandindan1(tuiguandindan) {
    if (tuiguandindan == 0) {
      this.showAlert("暂无推广订单")
      return
    }
    // this.navigateTo({
    //   url: '/pages/tuiguandindan/tuiguandindan',
    // })
    this.navigate('tuiguandindan')
  }

  lijitixian(e=undefined) {

    // this.navigateTo({
    //   url: '/pages/tixian/tixian',
    // })
    this.navigate('tixian')
  }
  myshoucan(){
   console.log("21111");
    this.navigate("mycollect");

  }

  fason() {

    var shouji = this.photo;
    console.log(shouji);
  console.log(shouji.toString().length);
    if (shouji.toString().length!=11) {
      this.toast("请输入正确的手机号");
      return
    }

    var that = this;

    var api = this.aliyunApi;

    api.sendverifycode({ mobile: shouji, type: 'tixian' }).then((res)=>{
      if (res.code == 0) {
        var shu = 60;
          var aaaa = setInterval(() => {
          shu--
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
  queren() {
    var that = this;
    var api = this.jigouApi;
    var name = this.name;
    var photo = this.photo;
    var yanzhenma = this.yanzhenma;
    var dizhi = this.dizhi;
    console.log(name);
    console.log(photo);
    console.log(yanzhenma);
    console.log(dizhi);
    if (name == '') {
      this.toast("请填写真实姓名");
      return
    }
    if (photo == '') {
      photo = this.MemberInfo.mobile;
    }
    if (yanzhenma == '') {
      this.toast("请输入验证码");
      return
    }
    if (dizhi == '') {
      this.toast("请输入地址");
      return
    }
    var aliyun = this.aliyunApi;
    aliyun.verifycode({ mobile: photo, type: 'tixian', verifycode: yanzhenma }).then((res)=>{
      if (res.code == 0) {

        api.fenxiaoshenhe({ reainame: name, mobile: photo, dizhi: dizhi }).then((res)=>{

          if (res.code == '0') {
            this.showModal1=false;
            this.navigate("review");
           
          }
        })
      }
      else {

        this.toast("验证码错误");
        return

      }

      
    })
   


  }
  hideModal(){
    this. showModal1= false ;
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

        this.navigate('yaoqinhaibao',{name:res.return})

      }
    })

  }
}
