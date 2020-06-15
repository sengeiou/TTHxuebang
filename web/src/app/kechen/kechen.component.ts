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
  selector: 'app-kechen',
  templateUrl: './kechen.component.html',
  styleUrls: ['./kechen.component.scss'],
  providers: [InstApi, MemberApi,JigouApi]
})
export class KechenComponent extends AppBase {

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
  }
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("kechen", "");
    }
    
    this.search();
    this.jigouApi.coursetype({}).then((coursetype:any)=>{
      this.coursetype=coursetype;
    })
    this.instApi.allinst({status:'A'}).then((allinst:any)=>{
      
      this.allinst=allinst;
    })
  }
  allinst=[];
  coursetype=[];
  name='';
  jg_id='';
  type='';
  seashow = false;
  allcurriculum=[];
  search(){
    this.pageList=[];
    if(this.name.trim()!="" || this.jg_id!=""){
      this.seashow=true;
    }
    this.userbApi.allcurriculum({
      name:this.name,
      type:this.type,
      jg_id:this.jg_id
    }).then((allcurriculum:any)=>{
      this.allcurriculum=allcurriculum;
      this.pagination(allcurriculum,allcurriculum.length);
    })
  }
  reset(){
    this.name='';
    this.jg_id='';
    this.type='';
    this.seashow=false;
    this.onMyShow();
  }
  bianji(item){
    this.navigate('/addkechen',{id:item.id});
  }
  shanchu(item){
    item.status='D';
    item.primary_id=item.id;
  }
  jgdelete(){
    for(let item of this.allcurriculum){
      if(item.status=='D'){
        this.userbApi.deletekc({idlist:item.id}).then((res:any)=>{
          console.log(res)
          if(res.code=='0'){
            this.onMyShow();
          }
        })
      }
    }
  }
}
