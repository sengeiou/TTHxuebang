import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { UserbApi } from 'src/providers/userb.api';
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [InstApi, MemberApi, UserbApi, AliyunApi]
})
export class RegisterComponent extends AppBase {
  instinfo = null;
  loading = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public userbApi: UserbApi,
    public aliyunApi: AliyunApi
  ) {
    super(router, activeRoute, instApi, userbApi);
    this.isLoginPage = true;

  }


  onMyLoad() {
    this.params;
    this.instApi.info({}).then((instinfo) => {
      this.instinfo = instinfo;
    });

  }
  num = 1;
  name = '';
  email = '';
  password = '';
  password2 = '';
  address = '';
  mobile = '';
  gonsi = '';
  zhizhao = '';
  onMyShow() {

  }

  errorname = "";

  afterupload(e) {
    console.log(e.file);
    this.errorzhizhao = "";
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    if (e.type == "success") {
      this.zhizhao = e.file.response.result;
    } else if (e.type == 'removed') {
      this.zhizhao = '';
    }
  }
  errorgonsi = "";
  errorpassword = "";
  erroraddress = "";
  errorzhizhao = "";
  errorverifycode = "";
  errornum = "";
  submit() {
    var iserror = false;
    this.num = parseInt(this.num.toString());
    if (this.gonsi.trim() == "") {
      iserror = true;
      this.errorgonsi = "机构信息不能为空";
    }
    if (this.name.trim() == "") {
      iserror = true;
      this.errorname = "姓名不能为空";
    }
    if (this.num <= 0 || isNaN(this.num)) {
      iserror = true;
      this.errornum = "机构数量不能小于0";
    }

    if (!(this.mobile[0] == "1" && this.mobile.length == 11)) {
      iserror = true;
      this.mobileerror = "请输入正确的联系电话";
    }
    if (this.password == "" || this.password.length < 8) {
      iserror = true;
      this.errorpassword = "密码不能为空且不得小于8位数";
    } else if (this.password != this.password2) {
      iserror = true;
      this.errorpassword = "两次密码不一致";
    }

    if (this.address.trim() == "") {
      iserror = true;
      this.erroraddress = "公司地址不能为空";
    }
    if (this.zhizhao == "") {
      iserror = true;
      this.errorzhizhao = "营业执照不能为空";
    }
    if (this.verifycode == "") {
      iserror = true;
      this.errorverifycode = "验证码不能为空";
    }
    if (iserror == true) {
      return;
    }
    this.aliyunApi.verifycode({ mobile: this.mobile, verifycode: this.verifycode, type: "register" }).then((ret: any) => {
      if (ret.code != '0') {
        this.errorverifycode = "验证码不正确";
        return;
      }


      this.userbApi.register({
        name: this.name,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        gonsi: this.gonsi,
        address: this.address,
        zhizhao: this.zhizhao,
        instnum:this.num
      }).then((res: any) => {
        if (res.code == '0') {
          console.log(11);
          var token = res.return;
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
          this.mobileerror = (res.result);
        }
      })
    })
  }
  errorregister = "";
  mobilechange() {
    this.mobileerror = "";
  }
  verifycode = "";
  resendreminder = 0;
  mobileerror = "";
  getVerifyCode() {
    if (!(this.mobile[0] == "1" && this.mobile.length == 11)) {
      this.mobileerror = "请输入正确的手机号码";
      return;
    }
    this.aliyunApi.sendverifycode({ mobile: this.mobile, type: "register" }).then((ret: any) => {
      this.resendreminder = 60;
      var timeresend = setInterval(() => {
        this.resendreminder--;
        if (this.resendreminder == 0) {
          clearInterval(timeresend);
        }
      }, 1000);
    });
  }
  numkeyup(e) {
    console.log(e);
    if (e.keyCode == 8) {
      return;
    }
    try {
      this.num = parseInt(this.num.toString());
    } catch (e) {
      this.num = 1;
    }
    console.log(this.num);
    if (this.num <= 0 || isNaN(this.num)) {
      console.log("mk", this.num);
      this.num = 1;
    }
  }
}