import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [InstApi, MemberApi]
})
export class SettingComponent extends AppBase {

  
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
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("setting", "");
    }
  }
  newpassword2='';
  newpassword='';
  oldpassword='';
  resetpwd(){
    if(this.oldpassword.trim()=="" || this.newpassword.trim()=="" || this.newpassword2.trim()==""){
      this.toast("密码为空，请重新输入！");
      return
    }
    if(this.newpassword2!=this.newpassword){
      this.toast("设置的密码不一样，请重新输入！");
      return
    }
    console.log(this.oldpassword)
    this.userbApi.resetpwd({
      id:this.memberinfo.id,
      oldpassword:this.oldpassword,
      newpassword:this.newpassword2
    }).then((res:any)=>{
      console.log(res);
      if(res.code=='0'){
        this.show=false;
        this.oldpassword='';
        this.newpassword2='';
        this.newpassword='';
        this.saveing();
      }else {
        this.toast(res.result);
      }
    })
  }
  logo='';
  watchimg(item){
    var url=ApiConfig.getUploadPath()+'kehu/'+item.img;
    window.open(url,'new','');
  }
  afterupload(e){
    console.log(e.file)
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if(e.type=="success"){
      this.memberinfo.primary_id=this.memberinfo.id;
      this.memberinfo.logo=e.file.response.result;
      this.userbApi.xiugai(this.memberinfo).then((res:any)=>{
        console.log(res);
        if(res.code=='0'){
          this.succ('修改成功');
          window.location.reload();
        }else {
          this.toast(res.result);
        }
      })
    }else if(e.type=='removed'){
      this.memberinfo.logo='';
    }
  }
  save(){
    this.memberinfo.primary_id=this.memberinfo.id;
    this.userbApi.xiugai(this.memberinfo).then((res:any)=>{
      if(res.code=='0'){
        
        this.succ('修改成功');
      }else {
        this.toast(res.result);
      }
    })
  }
  show=false;
  xiugai(){
    this.show=true;
  }
  download(){
    window.open(this.uploadpath+"inst/"+this.InstInfo.yufukuan);
  }
}
