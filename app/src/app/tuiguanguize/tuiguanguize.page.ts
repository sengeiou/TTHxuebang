import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-tuiguanguize',
  templateUrl: './tuiguanguize.page.html',
  styleUrls: ['./tuiguanguize.page.scss'],
  providers:[MemberApi]
})
export class TuiguanguizePage  extends AppBase {

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
  }
  onMyShow() {
    var api = this.jigouApi;;
    var that = this;
  
    api.problemlist({ chanjin: 'tg' }).then( (problemlist)=>{
      this.Base.setMyData({ problemlist: problemlist})

    })

 

  }
  lijishenqin()
  {
    var api = this.jigouApi;;
    api.fenxiaoinfo({}).then( (res) => {
      console.log(res.length);
      if (res.length == 0) {
       this.navigateBack({
         
       })
       return

      }
      if(res[0].status=='A')
      {
      this.showAlert("正在审核中哦");
      return
      }
      if (res[0].status == 'S') {
        this.showAlert("您已经是推广员了,无需申请");
      }

    })
  }
}
