// pages/addmechanism/addmechanism.js
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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      currentItemId: 2,
      show: 1
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.aboutus({
      id: 1
    }, (aboutus) => {
      this.Base.setMyData({
        aboutus
      });
    });
  }
  bindcheck(e) {
    var check = e.currentTarget.dataset.sf;

    console.log(check)
    if (check == 'N') {
      this.Base.setMyData({
        show: 2
      })
    }
    if (check == 'Y') {
      this.Base.setMyData({
        show: 1
      })
    }

  }
  // addjigou

  confirm(e) {

    console.log(e);
    var that = this;
    var data = e.detail.value;
    var name = data.name;
    var show = this.Base.getMyData().show;
    var memberinfo = this.Base.getMyData().memberinfo;
    //console.log(memberinfo.id)
    console.log(data.name);
    if (data.jigou == "") {
      this.Base.info("请填写机构名");
      return;
    }
    if (data.name == "") {
      this.Base.info("请填写联系人姓名");
      return;
    }
    if (data.mobile == "") {
      this.Base.info("请填写联系电话");
      return;
    }
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

    var jigouapi = new JigouApi();

    wx.showModal({
      title: '提交',
      content: '确认提交机构申请？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在提交',
            mask: true
          })
          //console.log(data.name);return;
          jigouapi.addjigou({
            member_id: memberinfo.id,
            name: data.jigou,
            peoplename: data.name,
            mobile: data.mobile,
            address: data.address,
            housenum: data.housenum,
            appstatus: "I",
            status: "A",
            protocol: "Y"
          }, (addjigou) => {
            that.Base.setMyData({
              addjigou
            });
          });

          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '提交成功',
            icon: '',
          })
        }

      }
      
    });

    
   


  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
body.confirm = content.confirm;

Page(body)