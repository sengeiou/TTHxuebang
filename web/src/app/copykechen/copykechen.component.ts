import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { UserbApi } from 'src/providers/userb.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-copykechen',
  templateUrl: './copykechen.component.html',
  styleUrls: ['./copykechen.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,JigouApi]
})
export class CopykechenComponent extends AppBase {
  loading=false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
    public jigouApi: JigouApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }

  onMyLoad() {
    this.params;
    if(this.params.copyid!=undefined){
     this.primary_id=this.params.copyid;
    }
  
  }
  allinst=[];
  coursetype=[];
  label=[];
  courseage=[];
  city=[];
  district=[];
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("kechen", "");
    }
    this.instApi.allinst({}).then((allinst:any)=>{
      this.allinst=allinst;
    })
    this.jigouApi.coursetype({}).then((coursetype:any)=>{
      this.coursetype=coursetype;
    })
    this.instApi.label({}).then((label:any)=>{
      this.label=label;
    })
    this.jigouApi.courseage({}).then((courseage:any)=>{
      this.courseage=courseage;
    })
    this.instApi.city({}).then((city:any)=>{
      this.city=city;
    })
    this.instApi.district({}).then((district:any)=>{
      this.district=district;
    })
    if(this.primary_id>0){
      this.userbApi.kechendetail({id:this.primary_id}).then((kechendetail:any)=>{
        this.kcdetail=kechendetail;
        this.lunbo=kechendetail.lunbo;
        this.kcdetail.labels=kechendetail.labels+',';
        this.kcdetail.jg_id=kechendetail.jg_id+',';

      })
    }
  }
  primary_id=0;
  kcdetail={
    jg_id:'',
    name:'',
    type:'',
    up_time:'',
    class_hours:'',
    duration:'',
    price:'',
    expeprice:'',
    age_name:'',
    mv:'',
    kc_img:'',
    searchkeyword:'',
    teacherwechatid:'',
    limitcount:0,
    xq_bg:'',
    kcchimg:'',
    labels:'',
    kucun:0,
    teachermobile:'',
    purchasetype:'',
    isfenxiao:'',
    age:'',
    fenxiaobili:0,
    showprice:'',
    city_id:'',
    district_id:'',
    seq:0,
    min_age:0,
    max_age:0,
    wenan:'',
    lunbo:'',
    status:''
  }
  ischeckbox(item){
    var id=item.id+',';
      if(this.kcdetail.jg_id.indexOf(item.id)>-1){
        
        this.kcdetail.jg_id=this.kcdetail.jg_id.replace(id,'');
      }else {
        this.kcdetail.jg_id+=id;
      }
      console.log(this.kcdetail.jg_id);
  }
  ischeckbox2(item){
    var id=item.id+',';
    if(this.kcdetail.labels.indexOf(item.id)>-1){
      
      this.kcdetail.labels=this.kcdetail.labels.replace(id,'');
    }else {
      this.kcdetail.labels+=id;
    }
  }
  afterupload(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.kcdetail.kc_img= e.file.response.result;
    } else if (e.type == 'removed') {
      this.kcdetail.kc_img = '';
    }
  }
  afterupload2(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.kcdetail.xq_bg= e.file.response.result;
    } else if (e.type == 'removed') {
      this.kcdetail.xq_bg = '';
    }
  }
  afterupload3(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.kcdetail.kcchimg= e.file.response.result;
    } else if (e.type == 'removed') {
      this.kcdetail.kcchimg = '';
    }
  }
  changestatus2(){
    if(this.kcdetail.isfenxiao=='Y'){
      this.kcdetail.isfenxiao='N';
     }else {
      this.kcdetail.isfenxiao='Y'
     }
  }
  lunbo=[];
  jialunbo(){
    this.lunbo.push({
      seq:this.lunbo.length+1,
      img:'',
      video:'',
      status:'',
    })
  }
  jianlunbo(item,i){
    if(item.status!=""){
      item.status='D';
    }else {
      this.lunbo.splice(i,1);
    }
  }
  afterupload4(e,item){
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
  afterupload5(e,item){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      item.video= e.file.response.result;
    } else if (e.type == 'removed') {
      item.video = '';
    }
  }
  tijiao(){
    var json=null;
    json=this.kcdetail;
    json.lunbo=JSON.stringify(this.lunbo);
    if(this.primary_id>0){
      json.primary_id=this.primary_id;
    }
    json.status='A';
    json.jg_id=this.kcdetail.jg_id.slice(0,this.kcdetail.jg_id.length-1);
    json.labels=this.kcdetail.labels.slice(0,this.kcdetail.labels.length-1)
    this.userbApi.addkechen(json).then((res:any)=>{
      if(res.code=='0'){
        this.primary_id=res.return;
        this.saveing();
        this.onMyShow();
      }else {
        this.toast(res.result);
      }
    })
  }
}
