// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  AliyunApi
} from "../../apis/aliyun.api.js";
import {
  UserbApi
} from "../../apis/userb.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '填写注册信息',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      check: false,
      gonsi: '',
      name: '',
      instnum: '',
      dizhi: '',
      mobile: '',
      yanzhengma: '',
      password: '',
      resendreminder: 0,
      zhizhao: ''
    })
  }
  onMyShow() {
    var that = this;
  }
  checkFn() {
    var check = this.Base.getMyData().check;
    this.Base.setMyData({
      check: !check
    })
  }
  gonsiFn(e) {
    this.Base.setMyData({
      gonsi: e.detail.value
    })
  }
  instnumFn(e) {
    this.Base.setMyData({
      instnum: e.detail.value
    })
  }
  nameFn(e) {
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  mobileFn(e) {
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  yanzhengmaFn(e) {
    this.Base.setMyData({
      yanzhengma: e.detail.value
    })
  }
  passowordFn(e) {
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  passoword2Fn(e) {
    this.Base.setMyData({
      password2: e.detail.value
    })
  }
  addressFn(e) {
    this.Base.setMyData({
      dizhi: e.detail.value
    })
  }
  tijiao() {
    var gonsi = this.Base.getMyData().gonsi;
    var name = this.Base.getMyData().name;
    var instnum = this.Base.getMyData().instnum;
    var mobile = this.Base.getMyData().mobile;
    var yanzhengma = this.Base.getMyData().yanzhengma;
    var password = this.Base.getMyData().password;
    var password2 = this.Base.getMyData().password2;
    var dizhi = this.Base.getMyData().dizhi;
    var zhizhao = this.Base.getMyData().zhizhao;
    var check = this.Base.getMyData().check;
    var aliyunapi = new AliyunApi;
    var userbapi = new UserbApi;


    if (gonsi.trim() == "") {
      wx.showToast({
        title: '账户名称不能为空',
        icon: 'none'
      })
      return
    }
    if (name.trim() == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return
    }

    if (instnum <= 0) {
      wx.showToast({
        title: '机构数量不能小于0',
        icon: 'none'
      })
      return
    }

    if (!(mobile[0] == "1" && mobile.length == 11)) {
      wx.showToast({
        title: '请输入正确的联系电话',
        icon: 'none'
      })
      return
    }
    if (password == "" || password.length < 8) {
      wx.showToast({
        title: '密码不能为空切不得小于8位数',
        icon: 'none'
      })
      return
    } else if (password != password2) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return
    }

    if (dizhi.trim() == "") {
      wx.showToast({
        title: '公司地址不能为空',
        icon: 'none'
      })
      return
    }
    if (zhizhao == "") {
      wx.showToast({
        title: '营业执照不能为空',
        icon: 'none'
      })
      return
    }
    if (yanzhengma == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return
    }
    if (check == false) {
      wx.showToast({
        title: '请阅读并同意入驻协议',
        icon: 'none'
      })
      return
    }



    aliyunapi.verifycode({
      mobile: mobile,
      verifycode: yanzhengma,
      type: "register"
    }, (ret) => {
      if (ret.code != '0') {
        wx.showToast({
          title: '验证码不正确',
          icon: 'none'
        })
        return;
      }


      userbapi.register({
        name: name,
        mobile: mobile,
        password: password,
        gonsi: gonsi,
        address: dizhi,
        zhizhao: zhizhao,
        instnum: instnum
      }, (res) => {
        if (res.code == '0') {
          wx.navigateTo({
            url: '/pages/deposit/deposit?id=' + res.result + '&num=' + instnum,
          })

        } else {
          wx.showToast({
            title: res.result,
            icon: 'none'
          })
          return
        }
      })

    })
  }
  getVerifyCode() {
    var mobile = this.Base.getMyData().mobile;
    var resendreminder = this.Base.getMyData().resendreminder;
    var that = this;
    if (!(mobile[0] == "1" && mobile.length == 11)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return;
    }
    var aliyunapi = new AliyunApi;
    aliyunapi.sendverifycode({
      mobile: mobile,
      type: "register"
    }, () => {
      that.Base.setMyData({
        resendreminder: 60
      })
      that.setInVerify();

    });
  }
  setInVerify() {

    var resendreminder = this.Base.getMyData().resendreminder;
    var k = setInterval(() => {
      if (resendreminder >= 0) {
        var mm = resendreminder--;
        this.Base.setMyData({
          resendreminder: mm
        })
      }
      if (resendreminder < 0) {
        clearInterval(k);
      }

    }, 1000);
  }
  bindpic() {
    var that = this;
    this.Base.uploadOneImage("instregister", (ret) => {
      that.Base.setMyData({
        zhizhao: ret,
        xiala: false
      });

    }, undefined, ['album', 'camera']);
  }
  xieyi(){
    wx.navigateTo({
      url: '/pages/ruzhuxieyi/ruzhuxieyi',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.checkFn = content.checkFn;
body.gonsiFn = content.gonsiFn;
body.instnumFn = content.instnumFn;
body.nameFn = content.nameFn;
body.mobileFn = content.mobileFn;
body.yanzhengmaFn = content.yanzhengmaFn;
body.passowordFn = content.passowordFn;
body.passoword2Fn = content.passoword2Fn;
body.addressFn = content.addressFn;
body.tijiao = content.tijiao;
body.getVerifyCode = content.getVerifyCode;
body.setInVerify = content.setInVerify;
body.bindpic = content.bindpic;
body.xieyi = content.xieyi;
Page(body)