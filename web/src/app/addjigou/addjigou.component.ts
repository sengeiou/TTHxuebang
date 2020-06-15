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
    var date=new Date();
    var year=date.getFullYear();
    var mon=(date.getMonth()+1)>10?(date.getMonth()+1):'0'+(date.getMonth()+1);
    var day=date.getDate()>10?date.getDate():'0'+date.getDate();
    this.jgdetail.up_time=year+'-'+mon+'-'+day;
    //Chart.setColorPick2();
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
  allprovince=[];
  allcity=[];
  alldistrict=[];
  allstreet=[];
  getaddress(){
      this.instApi.province({}).then((province:any)=>{
          this.province=province;
          this.allprovince=province;
      })
      this.instApi.city({}).then((city:any)=>{
          this.city=city;
          this.allcity=city;
      })
      this.instApi.district({}).then((district:any)=>{
          this.district=district;
          this.alldistrict=district;
      })
      this.instApi.street({}).then((street:any)=>{
          this.street=street;
          this.allstreet=street;
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
    province_id_name:'',
    city_id:'',
    city_id_name:'',
    district_id:'',
    district_id_name:'',
    street_id:'',
    street_id_name:'',
    address:'',
    showaddress:'',
    lat:'',
    lng:'',
    map:'',
    up_time:'',
    labels:'',
    bgcolor:'#fec02f',
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
    qrcode:'',
    status2:'A'
  }
  afterupload(e) {
    console.log(e)
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
    if(this.jgdetail.status2=='A'){
      this.jgdetail.status2='I';
     }else {
      this.jgdetail.status2='A'
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


    if(this.jgdetail.status=='I'){
      this.toast('此机构已被系统禁用，不允许启用');
      return
    }

    if(this.bgimg.length==0){
      this.toast('请添加轮播图');
      return
    }
    if(this.bgimg.length==1 && this.bgimg[0].img==""){
      this.toast('请添加轮播图');
      return
    }

    this.jgdetail.searchkeyword=this.jgdetail.jigou+','+this.jgdetail.address;
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
        this.back();
      }else {
        this.toast(res.result);
      }
    })
  }
  copy(){
    if(this.jgdetail.status=='I'){
      this.toast('此机构已被系统禁用，不允许启用');
      return
    }
    if(this.bgimg.length==0){
      this.toast('请添加轮播图');
      return
    }
    if(this.bgimg.length==1 && this.bgimg[0].img==""){
      this.toast('请添加轮播图');
      return
    }

    this.jgdetail.searchkeyword=this.jgdetail.jigou+','+this.jgdetail.address;
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
        this.navigate('/copyjigou',{copyid:res.return});
      }else {
        this.toast(res.result);
      }
    })
  }
  packagTypeChange(){
    console.log(this.jgdetail.province_id);
    var arr1=[];
    for(let item of this.allcity){
      if(item.province_id==this.jgdetail.province_id){
        arr1.push(item);
      }
    }
    this.city=arr1;

    var arr2=[];
    for(let item of this.alldistrict){
      if(item.province_id==this.jgdetail.province_id){
        arr2.push(item);
      }
    }
    this.district=arr2;

    var arr3=[];
    for(let item of this.allstreet){
      if(item.province_id==this.jgdetail.province_id){
        arr3.push(item);
      }
    }
    this.street=arr3;
  }
  packagTypeChange2(){
    console.log(this.jgdetail.city_id);

    for(let item of this.allcity){
      if(item.id==this.jgdetail.city_id){
        this.jgdetail.province_id=item.province_id;
      }
    }


    var arr2=[];
    for(let item of this.alldistrict){
      if(item.city_id==this.jgdetail.city_id){
        arr2.push(item);
      }
    }
    this.district=arr2;

    var arr3=[];
    for(let item of this.allstreet){
      if(item.city_id==this.jgdetail.city_id){
        arr3.push(item);
      }
    }
    this.street=arr3;
  }
  packagTypeChange3(){
    console.log(this.jgdetail.district_id);
  
    
    for(let item of this.alldistrict){
      if(item.id==this.jgdetail.district_id){
        this.jgdetail.city_id=item.city_id;
        this.jgdetail.province_id=item.province_id;
      }
    }


    var arr3=[];
    for(let item of this.allstreet){
      if(item.district_id==this.jgdetail.district_id){
        arr3.push(item);
      }
    }
    this.street=arr3;
  }
  packagTypeChange4(){
    console.log(this.jgdetail.street_id);
    
    for(let item of this.allstreet){
      if(item.id==this.jgdetail.street_id){
        this.jgdetail.district_id=item.district_id;
        this.jgdetail.city_id=item.city_id;
        this.jgdetail.province_id=item.province_id;
      }
    }

  }
}
