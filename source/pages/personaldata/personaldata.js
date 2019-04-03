// pages/personaldata/personaldata.js
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
  JigouApi
} from "../../apis/jigou.api.js";
import {
  MineApi
} from "../../apis/mine.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: 2
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var mineapi = new MineApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

    mineapi.mydata({}, (mydata) => {
      this.Base.setMyData({
        mydata
      });
    });

  }


  bindcheck(e) {
    var check = e.currentTarget.dataset.sex;
    console.log(check)
    if (check == 'M') {
      this.Base.setMyData({
        show: 2
      })
    }
    if (check == 'W') {
      this.Base.setMyData({
        show: 1
      })
    }
  }

  confirm(e) {

    console.log(e);
    var that = this;
    var data = e.detail.value;
    var name = data.name;
    var show = this.Base.getMyData().show;
    var memberinfo = this.Base.getMyData().memberinfo;
    //console.log(memberinfo.id)
    console.log(data.name);
    if (data.name == "") {
      this.Base.info("请填写昵称");
      return;
    }
    if (data.mobile == "") {
      this.Base.info("请填写手机号");
      return;
    }
    // if (data.sex == "") {
    //   this.Base.info("请选择性别");
    //   return;
    // }
    if (data.address == "") {
      this.Base.info("请填写地址");
      return;
    }
    if (data.housenum == "") {
      this.Base.info("请填写门牌号");
      return;
    }
    if (show == 1) {
      this.Base.info("请点击同意用户协议");
      return;
    }

    if (show == 2) {
      this.Base.setMyData({
        sex: "M"
      })
    }
    if (show == 1) {
      this.Base.setMyData({
        sex: "W"
      })
    }

    var mineapi = new MineApi();
    var sex = this.Base.getMyData().sex;
    wx.showModal({
      title: '',
      content: '确认提交修改资料？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {

        if (res.confirm) {
          wx.showLoading({
            title: '正在保存',
            mask: true
          })

          mineapi.updatemydata({
            id: memberinfo.id,
            name: data.name,
            mobile: data.mobile,
            sex: sex,
            address: data.address,
            house_num: data.housenum,
            status: "A"
          }, (updatemydata) => {
            that.Base.setMyData({
              updatemydata
            });
          });
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '保存成功',
            icon: '',
          })
        }
      }
    });
  }




  bindback(e) {
    wx.navigateBack({
      delta: 2,
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
body.bindback = content.bindback;
body.bindcheck = content.bindcheck;
body.confirm = content.confirm;
Page(body)