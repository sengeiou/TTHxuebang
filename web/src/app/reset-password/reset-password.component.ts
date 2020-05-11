import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends AppBase {
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

  email = "";
  verifycode = "";
  password = "";
  password2 = "";

  isinvalid = false;
  invalidtext1 = "";
  invalidtext2 = "";
  invalidtext3 = "";

  resetsuccess = 0;

  onMyLoad() {
    this.params;
    if (this.params.v == undefined) {
      this.email = this.params.email;
    } else {
      var str = this.base64decode(this.params.v);
      var emailstr = str.split("&")[0];
      this.email = emailstr.split("=")[1];
      var codestr = str.split("&")[1];
      this.verifycode = codestr.split("=")[1];
    }
  }
  onMyShow() {
  }
  changePassword() {

    if (this.password.length < 8) {
      this.isinvalid = true;
      this.invalidtext1 = "Password is to short, please more than 8";
      return;
    }
    if (this.password != this.password2) {
      this.isinvalid = true;
      this.invalidtext2 = "Twice password is different, please input again";
      return;
    }
    // this.memberApi.resetpassword({ email: this.email, verifycode: this.verifycode, password: this.password }).then((ret: any) => {
    //   if (ret.code == 0) {
    //     this.resetsuccess = 1;
    //   } else {
    //     this.isinvalid = true;
    //     this.invalidtext1 = "Verify code is invalid, please input again";
    //     return;
    //   }
    // });
  }
  typeres() {
    this.isinvalid = false;
    this.invalidtext1 = "";
    this.invalidtext2 = "";
    this.invalidtext3 = "";
  }
}
