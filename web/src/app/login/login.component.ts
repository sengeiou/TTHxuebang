import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [InstApi, MemberApi, UserbApi]
})
export class LoginComponent extends AppBase {
  instinfo = null;
  username = '';
  password = '';
  isremember = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);
    this.isLoginPage = true;
  }
  loginunicode = "";

  onMyLoad() {
    this.params;
    this.instApi.info({}).then((instinfo) => {
      this.instinfo = instinfo;
    });

  }
  onMyShow() {

  }

  login() {
    console.log(this.username, this.password)
    if (this.username == "" || this.password == "") {
      return
    }
    this.userbApi.login({
      mobile: this.username,
      password: this.password,
    }).then((res: any) => {
      console.log(res);
      if (res.code == '0') {
        var token = res.return;
        window.localStorage.setItem("lastusername", this.username);

        if (this.isremember == true) {
          window.localStorage.setItem("lastpassword", this.password);
        }
        window.sessionStorage.setItem("token", token);

        ApiConfig.SetToken(token);
        this.userbApi.userinfo({}).then((info: any) => {
          window.sessionStorage.setItem("memberinfo", JSON.stringify(info));
          // window.location.href="/";
          if (info.issign_value == 'Y') {
            this.navigate('/jigou');
          } else {
            this.navigate('/service');
          }
        })


      } else {

      }
    })
  }

}
