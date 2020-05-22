import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
declare let Chart: any;

@Component({
  selector: 'app-addjigou',
  templateUrl: './addjigou.component.html',
  styleUrls: ['./addjigou.component.scss'],
  providers: [InstApi, MemberApi,UserbApi]
})
export class AddjigouComponent extends AppBase {
  loading=false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }

  onMyLoad() {
    this.params;
    this.getaddress();
    if(this.params.id!=undefined){
      this.primary_id=this.params.id;
    }
    if(this.params.deposit!=undefined){
        this.deposit=true;
        Chart.saoma();
    }
  }
  deposit=false;
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("jigou", "");
    }

    if(this.primary_id>0){
      this.userbApi.instdetail({id:this.primary_id}).then((res:any)=>{
        console.log(res)
        this.jgdetail=res;
        this.bgimg=res.lunbo;
        this.hexiao=res.hexiaos;
        this.jgdetail.labels=res.labels+',';
      })
    }
  }
  primary_id=0;
  province=[];
  city=[];
  district=[];
  street=[];
  label=[];
  getaddress(){
      this.instApi.province({}).then((province:any)=>{
          this.province=province;
      })
      this.instApi.city({}).then((city:any)=>{
          this.city=city;
      })
      this.instApi.district({}).then((district:any)=>{
          this.district=district;
      })
      this.instApi.street({}).then((street:any)=>{
          this.street=street;
      })
      this.instApi.label({}).then((label:any)=>{
        for(let item of label){
          var id=item.id+',';
          if(this.alllable.indexOf(item.id)>-1){
          }else {
            this.alllable+=id;
          }
        }
        this.lablen=this.alllable.length;
        this.label=label;
      })
  }
  alllable='';
  lablen=0;
  jgdetail={
    jigou:'',
    time:'9:00-18:00',
    jg_img:'',
    waitimg:'',
    jg_video:'',
    jieshao:'',
    novideosummary:'',
    novideosummary_value:'',
    province_id:'',
    city_id:'',
    district_id:'',
    street_id:'',
    address:'',
    showaddress:'',
    lat:'',
    lng:'',
    map:'',
    up_time:'',
    labels:'',
    bgcolor:'',
    searchkeyword:'',
    limitcount:0,
    img:'',
    hexiao:'',
    longimg:'',
    isfenxiao:'',
    isfenxiao_value:'',
    jg_age:'',
    contactmobile:'',
    fabu:'',
    shenhe:'',
    status:'',
    qrcode:''
  }
  afterupload(e) {
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.jgdetail.jg_img = e.file.response.result;
    } else if (e.type == 'removed') {
      this.jgdetail.jg_img = '';
    }
  }
  afteruploads(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.jgdetail.qrcode = e.file.response.result;
    } else if (e.type == 'removed') {
      this.jgdetail.qrcode = '';
    }
  }
  afterupload2(e) {
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.jgdetail.waitimg = e.file.response.result;
    } else if (e.type == 'removed') {
      this.jgdetail.waitimg = '';
    }
  }
  afterupload3(e) {
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.jgdetail.jg_video = e.file.response.result;
    } else if (e.type == 'removed') {
      this.jgdetail.jg_video = '';
    }
  }
  afterupload4(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.jgdetail.longimg = e.file.response.result;
    } else if (e.type == 'removed') {
      this.jgdetail.longimg = '';
    }
  }
  changestatus(){
   if(this.jgdetail.novideosummary_value=='Y'){
    this.jgdetail.novideosummary_value='N';
   }else {
    this.jgdetail.novideosummary_value='Y'
   }
  }
  changestatus2(){
    if(this.jgdetail.isfenxiao_value=='Y'){
      this.jgdetail.isfenxiao_value='N';
     }else {
      this.jgdetail.isfenxiao_value='Y'
     }
  }
  ischeckbox(item){
    var id=item.id+',';
      if(this.jgdetail.labels.indexOf(item.id)>-1){
        this.jgdetail.labels=this.jgdetail.labels.replace(id,'');
      }else {
        this.jgdetail.labels+=id;
      }
      if(this.lablen==this.jgdetail.labels.length){
        this.quanlabels=true;
      }else {
        this.quanlabels=false;
      }
  }
  quanlabels=false;
  quanxuan(){
    
    if(this.quanlabels==true){
      this.quanlabels=false;
      for(let item of this.label){
        var id=item.id+',';
        if(this.jgdetail.labels.indexOf(item.id)>-1){
          this.jgdetail.labels=this.jgdetail.labels.replace(id,'');
        }
      }
    }else {
      this.quanlabels=true;
      for(let item of this.label){
        var id=item.id+',';
        if(this.jgdetail.labels.indexOf(item.id)>-1){
        }else {
          this.jgdetail.labels+=id;
        }
      }
      console.log( this.jgdetail.labels.length)
    }
   
  }
  bgimg=[];
  jiabgimg(){
    this.bgimg.push({
      seq:this.bgimg.length+1,
      img:'',
      status:''
    })
  }
  jianbgimg(item,i){
    if(item.status!=""){
      item.status='D';
    }else {
      this.bgimg.splice(i,1);
    }
  }
  afterupload5(e,item){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      item.img= e.file.response.result;
    } else if (e.type == 'removed') {
      item.img = '';
    }
  }
  hexiao=[];
  jiahexiao(){
    this.hexiao.push({
      seq:this.hexiao.length+1,
      member_id:'',
      status:''
    })
  }
  jianhexiao(item,i){
    if(item.status!=""){
      item.status='D';
    }else {
      this.hexiao.splice(i,1);
    }
  }
  submit(){
    var json=null;
    json=this.jgdetail;
    json.img=JSON.stringify(this.bgimg);
    json.hexiao=JSON.stringify(this.hexiao);
    if(this.primary_id>0){
      json.primary_id=this.primary_id;
    }
    json.novideosummary=this.jgdetail.novideosummary_value;
    json.isfenxiao=this.jgdetail.isfenxiao_value;
    json.labels=this.jgdetail.labels.slice(0,this.jgdetail.labels.length-1);
    json.status='A';
    this.userbApi.addinst(json).then((res:any)=>{
      if(res.code=='0'){
        this.saveing();
        this.primary_id=res.return;
        this.onMyShow();
      }else {
        this.toast(res.result);
      }
    })
  }
}
