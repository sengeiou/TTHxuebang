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
  selector: 'app-addkechen',
  templateUrl: './addkechen.component.html',
  styleUrls: ['./addkechen.component.scss'],
  providers: [InstApi, MemberApi,UserbApi,JigouApi]
})
export class AddkechenComponent extends AppBase {
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
    if(this.params.id!=undefined){
      this.primary_id=this.params.id;
    }
     this.instApi.allinst({}).then((allinst:any)=>{
      
      this.allinst=allinst;
    })
    this.jigouApi.coursetype({}).then((coursetype:any)=>{
      this.coursetype=coursetype;
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
    this.jigouApi.courseage({}).then((courseage:any)=>{
      this.courseage=courseage;
    })
    this.instApi.city({}).then((city:any)=>{
      this.city=city;
    })
    this.instApi.district({}).then((district:any)=>{
      this.district=district;
    })

    var date=new Date();
    var year=date.getFullYear();
    var mon=(date.getMonth()+1)>10?(date.getMonth()+1):'0'+(date.getMonth()+1);
    var day=date.getDate()>10?date.getDate():'0'+date.getDate();
    this.kcdetail.up_time=year+'-'+mon+'-'+day;
  }

  jigoulen=0;
  alllable='';
  lablen=0;
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
   
    if(this.primary_id>0){
      this.userbApi.kechendetail({id:this.primary_id}).then((kechendetail:any)=>{
        this.kcdetail=kechendetail;
        this.lunbo=kechendetail.lunbo;
        this.kcdetail.labels=kechendetail.labels+',';

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
    kucun:'',
    teachermobile:'',
    purchasetype:'',
    isfenxiao:'',
    isfenxiao_value:'',
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
    status:'',
    shenhestatus:'',
    shenhestatus_name:'',
    kechennum:''
  }
  ischeckbox(item){
    var id=item.id+',';
      if(this.kcdetail.jg_id.indexOf(item.id)>-1){
        
        this.kcdetail.jg_id=this.kcdetail.jg_id.replace(id,'');
      }else {
        this.kcdetail.jg_id+=id;
      }
      if(this.jigoulen==this.kcdetail.jg_id.length){
        this.quanjigou=true;
      }else {
        this.quanjigou=false;
      }
  }
  quanjigou=false;
  quanxuan2(){
    
    if(this.quanjigou==true){
      this.quanjigou=false;
      for(let item of this.allinst){
        var id=item.id+',';
        if(this.kcdetail.jg_id.indexOf(item.id)>-1){
          this.kcdetail.jg_id=this.kcdetail.jg_id.replace(id,'');
        }
      }
    }else {
      this.quanjigou=true;
      for(let item of this.allinst){
        var id=item.id+',';
        if(this.kcdetail.jg_id.indexOf(item.id)>-1){
        }else {
          this.kcdetail.jg_id+=id;
        }
      }
    }
  }
  ischeckbox2(item){
    var id=item.id+',';
    if(this.kcdetail.labels.indexOf(item.id)>-1){
      this.kcdetail.labels=this.kcdetail.labels.replace(id,'');
    }else {
      this.kcdetail.labels+=id;
    }
    if(this.lablen==this.kcdetail.labels.length){
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
        if(this.kcdetail.labels.indexOf(item.id)>-1){
          this.kcdetail.labels=this.kcdetail.labels.replace(id,'');
        }
      }
    }else {
      this.quanlabels=true;
      for(let item of this.label){
        var id=item.id+',';
        if(this.kcdetail.labels.indexOf(item.id)>-1){
        }else {
          this.kcdetail.labels+=id;
        }
      }
      console.log( this.kcdetail.labels.length)
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
  afteruploads(e){
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.kcdetail.mv= e.file.response.result;
    } else if (e.type == 'removed') {
      this.kcdetail.mv = '';
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
    if(this.kcdetail.isfenxiao_value=='Y'){
      this.kcdetail.isfenxiao_value='N';
     }else {
      this.kcdetail.isfenxiao_value='Y'
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
    if(this.kcdetail.duration.indexOf('分钟')==-1  ){
      this.kcdetail.duration=this.kcdetail.duration+'分钟';
    }

    if(this.kcdetail.age_name.indexOf('岁')==-1  ){
      this.kcdetail.age_name=this.kcdetail.age_name+'岁';
    }
    if(this.errorprice!=""){
      this.toast('课程价格错误，请重新输入');
      return
    }
    // this.kcdetail.searchkeyword=this.kcdetail.name;
    this.kcdetail.purchasetype='C';
    var json=null;
    json=this.kcdetail;
    json.lunbo=JSON.stringify(this.lunbo);
    if(this.primary_id>0){
      json.primary_id=this.primary_id;
    }
    json.status='A';
    json.isfenxiao=this.kcdetail.isfenxiao_value;
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
  copy(){
    this.navigate('copykechen',{copyid:this.primary_id});
  }
  errorprice="";
  pricekeyup(e){

    if (e.keyCode == 8) {
      return;
    }
    if(Number(this.kcdetail.kechennum)<=2 && Number(this.kcdetail.expeprice)>9.9){
      this.errorprice='1~2次课，价格不超过9.9元';
    }

    if(Number(this.kcdetail.kechennum)==3 && Number(this.kcdetail.expeprice)>19.9){
      this.errorprice='3次课，价格不超过19.9元';
    }

    if(Number(this.kcdetail.kechennum)>3 && Number(this.kcdetail.kechennum)<=5 && Number(this.kcdetail.expeprice)>49.9){
      this.errorprice='4~5次课，价格不超过49.9元';
    }

    if(Number(this.kcdetail.kechennum)>=6 && Number(this.kcdetail.expeprice)>99){
      this.errorprice='6次课，价格不超过99元';
    }
   
  }
}
