import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-xuanzedizhi',
  templateUrl: './xuanzedizhi.page.html',
  styleUrls: ['./xuanzedizhi.page.scss'],
  providers:[MemberApi]
})
export class XuanzedizhiPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    this.Base.setMyData({ show: false, jifen: this.params.interral, kong: false, type:this.params.type})
  }
  onMyShow() {
    var that = this; 



    var addressapi = new AddressApi();
    
    addressapi.addresslist({ member_id:this.MemberInfo.id   }).then( (addresslist) => {
      this.Base.setMyData({ addresslist })
    })

  }


  bindcheck(e){
    var id=e.target.id;

    this.Base.setMyData({ check: id})

  }

  addressmanage(e) {
    var id=e.target.id;
    this.navigateTo({
      url: '/pages/addressmanage/addressmanage?xiugai=1&id=' + id,
    })
  }

  addnew(e){
    
    this.navigateTo({
      url: '/pages/addressmanage/addressmanage',
    })
  }
  queren(e){
    var jifen = this.params.interral;


    var jifenapi = this.jifenApi;;
    jifenapi.commodityinfo({ id: this.params.id }).then( (info) => {

      this.Base.setMyData({ info })

    })
    

  

    var shuliang = this.params.shuliang;
    if(this.check==null){
      this.Base.toast("请选择地址");
      return;
    }
    
    this.Base.setMyData({
      show: true, xiaofei: jifen * shuliang
    })

  }
  quedin(e){
    
    console.log(this.info.inventory);
    //return;

    if (this.info.inventory == 0) {
      wx.showToast({
        title: '库存不足，无法兑换',
        icon: 'none'
      })
      this.Base.setMyData({ show: false})
      return;
    }

    console.log("成功");

//return;
    var inventory = this.params.inventory;

    var jifen = this.params.interral;
    var shuliang=this.params.shuliang;

    var myjifen = e.target.id;
    var img=this.params.img;

    console.log(img);
    //return;

    var shanpin=this.params.name;

    var shengyu = myjifen - jifen * shuliang;

    var zonger = jifen * shuliang;

    

    console.log(shengyu + "剩余");
    if (parseInt(jifen) > parseInt(myjifen)){
      this.Base.setMyData({ kong: true});
      return;
    }
    //return;
    var jifenapi = this.jifenApi;;

    var addressapi = new AddressApi();

    addressapi.addressinfo({
      id: this.check
    }).then( (info) => {


      jifenapi.addjifenorder({ 
        member_id:this.MemberInfo.id,
        jifen: zonger,
        danjia:jifen,
        img:img,
        shuliang: shuliang,
        name:shanpin,
        orderstatus:"A",
        consignee: info.name,
        mobile: info.phonenumber,
        address:info.region+info.address,
        orderid:'1234567891011',
        status:"A"
       }).then( (addjifenorder) => {


         var jifenapi = this.jifenApi;;
         
         jifenapi.deduction({ member_id: this.MemberInfo.id, goods_id: this.params.id }).then( (deduction)=>{
           this.Base.setMyData({ deduction })
         })


         //console.log(addjifenorder.return+"阿");
        // return;

         jifenapi.updatekucun({ id: this.params.id, inventory: inventory - shuliang }).then( (updatekucun) => {
           this.Base.setMyData({ updatekucun })
         })

         jifenapi.updatejifen({ id: this.MemberInfo.id, integral: shengyu }).then( (updatejifen) => {
           this.Base.setMyData({ updatejifen, tanchuan: 2, show: false })
           this.onMyShow();
           wx.redirectTo({
             url: '/pages/yiduihuang/yiduihuang?id=' + addjifenorder.return+'&shopid='+this.params.id,
           })
         })

         this.Base.setMyData({ addjifenorder })

      })

      this.Base.setMyData({
        info
      })
    })

     
   
  }
  quxiao(e) {
    this.Base.setMyData({
      show: false
    })
  }
}
