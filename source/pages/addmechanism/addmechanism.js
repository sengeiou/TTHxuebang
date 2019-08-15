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
      currentItemId: 2,
      show: 1,
      region: [],
      jgimages: [],
      hjimages: [],
      skimages: [],
      list: [],
      kclist: [],tc:false
    })

    var kclist = this.Base.getMyData().kclist;
    var idx = {
      name: '',
      nianlin: '',
      yuyue: '',
      shichang: '',
      sex: '',
      kaike: '',
      qingjia: ''
    };

    kclist.push(
      idx
    );
    
    this.Base.setMyData({
      kclist
    })
    
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var mineapi = new MineApi();

    jigouapi.aboutus({
      id: 1
    }, (aboutus) => {
      this.Base.setMyData({
        aboutus
      });
    });


    this.Base.getAddress((address) => {
      console.log(address);
      var region = [address.address_component.province, address.address_component.city, address.address_component.district];
      this.Base.setMyData({
        region
      });
    });

  }

  jguploadimg() {
    var that = this;
    this.Base.uploadImage("jgmentou", (ret) => {
      var jgimages = that.Base.getMyData().jgimages;
      jgimages.push(ret);
      that.Base.setMyData({
        jgimages
      });
    }, 9, undefined);
  }

  jgminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var jgimages = that.Base.getMyData().jgimages;
    var jgimgs = [];
    for (var i = 0; i < jgimages.length; i++) {
      if (seq != i) {
        jgimgs.push(jgimages[i]);
      }
    }
    that.Base.setMyData({
      jgimages: jgimgs
    });
  }


  hjuploadimg() {
    var that = this;
    this.Base.uploadImage("huanjing", (ret) => {
      var hjimages = that.Base.getMyData().hjimages;
      hjimages.push(ret);
      that.Base.setMyData({
        hjimages
      });
    }, 9, undefined);
  }

  hjminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var hjimages = that.Base.getMyData().hjimages;
    var hjimgs = [];
    for (var i = 0; i < hjimages.length; i++) {
      if (seq != i) {
        hjimgs.push(hjimages[i]);
      }
    }
    that.Base.setMyData({
      hjimages: hjimgs
    });
  }

  skuploadimg() {
    var that = this;
    this.Base.uploadImage("shangke", (ret) => {
      var skimages = that.Base.getMyData().skimages;
      skimages.push(ret);
      that.Base.setMyData({
        skimages
      });
    }, 9, undefined);
  }

  skminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var skimages = that.Base.getMyData().skimages;
    var skimgs = [];
    for (var i = 0; i < skimages.length; i++) {
      if (seq != i) {
        skimgs.push(skimages[i]);
      }
    }
    that.Base.setMyData({
      skimages: skimgs
    });
  }


  bindchecksex(e) {
    var id = e.currentTarget.id;

    var dx = e.currentTarget.dataset.idx;

    var kclist = this.Base.getMyData().kclist;

    if (id == 'A') {
      kclist[dx].sex = id;
      this.Base.setMyData({
        kclist: kclist
      })
    }

    if (id == 'W') {

      kclist[dx].sex = id;
      this.Base.setMyData({
        kclist: kclist
      })

    }

    if (id == 'M') {
      kclist[dx].sex = id;
      this.Base.setMyData({
        kclist: kclist
      })

    }

  }

  bindkaike(e) {
    var kaike = e.currentTarget.id;
    var idx = e.currentTarget.dataset.idx;
    var kclist = this.Base.getMyData().kclist;

    if (kaike == 'tiqian') {
      kclist[idx].kaike = "A";
      this.Base.setMyData({
        kclist: kclist
      })
    }
    if (kaike == 'suishi') {
      kclist[idx].kaike = "B";
      this.Base.setMyData({
        kclist: kclist
      })
    }
  }

  bindqingjia(e) {
    var qingjia = e.currentTarget.id;
    var idx = e.currentTarget.dataset.idx;
    var kclist = this.Base.getMyData().kclist;

    if (qingjia == 'tqgz') {
      kclist[idx].qingjia = "A";
      this.Base.setMyData({
        kclist: kclist
      })
    }
    if (qingjia == 'buyunxu') {
      kclist[idx].qingjia = "B";
      this.Base.setMyData({
        kclist: kclist
      })
    }
    if (qingjia == 'qita') {
      kclist[idx].qingjia = "C";
      this.Base.setMyData({
        kclist: kclist
      })
    }
  }

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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



  addkecheng(e) {
    var kclist = this.Base.getMyData().kclist;
    var list = this.Base.getMyData().list;
    var idx = {
      name: '',
      nianlin: '',
      yuyue: '',
      shichang: '',
      sex: '',
      kaike: '',
      qingjia: ''
    };
    kclist.push(
      idx
    );
    this.Base.setMyData({
      kclist
    })
  }
  shanchu(e){
    var idx=e.currentTarget.id;
    console.log(idx);
    var kclist = this.Base.getMyData().kclist;
    kclist.splice(idx,1)
    this.Base.setMyData({ kclist})
  }





  tocontent(e) {
    wx.navigateTo({
      url: '/pages/content/content',
    })
  }

  useaddress() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res);

        this.Base.setMyData({
          pca: res.provinceName + res.cityName + res.countyName,
          detail: res.detailInfo,
          contacttel: res.telNumber,
          contactname: res.userName
        });


      }
    })
  }

  tohuiyuan(e) {
    // wx.navigateTo({
    //   url: '/pages/huiyuanfuwu/huiyuanfuwu'
    // })
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon:'none'
    })
  }
  xiename(e) {
    console.log(e.detail.value);
    var kclist = this.Base.getMyData().kclist;
    kclist[e.currentTarget.dataset.idx].name = e.detail.value;
    this.Base.setMyData({
      kclist: kclist
    })
  }
  nianlin(e) {
    console.log(e.detail.value);
    var kclist = this.Base.getMyData().kclist;
    kclist[e.currentTarget.dataset.idx].nianlin = e.detail.value;
    this.Base.setMyData({
      kclist: kclist
    })
  }
  yuyue(e) {
    console.log(e.detail.value);
    var kclist = this.Base.getMyData().kclist;
    kclist[e.currentTarget.dataset.idx].yuyue = e.detail.value;
    this.Base.setMyData({
      kclist: kclist
    })
  }
  shichang(e) {
    console.log(e.detail.value);
    var kclist = this.Base.getMyData().kclist;
    kclist[e.currentTarget.dataset.idx].shichang = e.detail.value;
    this.Base.setMyData({
      kclist: kclist
    })
  }





  confirm(e) {
    console.log(e);
    var that = this;
    var data = e.detail.value;
    var jigouapi = new JigouApi();

    var jgimages = this.Base.getMyData().jgimages.slice(0, 19);
    var hjimages = this.Base.getMyData().hjimages.slice(0, 19);
    var skimages = this.Base.getMyData().skimages.slice(0, 19);
    //console.log(jgimages);
   // console.log(hjimages);
   // console.log(skimages);
   // console.log("弗兰克攻击力可")

    var sex = this.Base.getMyData().sex;
    var kaike = this.Base.getMyData().kk;
    var qingjia = this.Base.getMyData().qj;
    //return;


    //console.log(sex);
    //console.log(kaike);
    //console.log(qingjia);
    //console.log("双方各")
    // return;

    var name = data.name;

    //var phonetel = /^[1][3,4,5,7,8][0-9]{9}$/;
    //console.log(phonetel);
    //return;
    //var ismobile = phonetel.exec(data.mobile);
    var show = this.Base.getMyData().show;
    var region = this.Base.getMyData().region;

    //console.log(this.Base.getMyData().memberinfo.id);
    //return;

    //return;

    // if (data.hangye == "") {
    //   this.Base.info("请填写所属行业");
    //   return;
    // }

    if (data.jigou == "") {
      this.Base.info("请填写机构名称");
      return;
    }

    if (data.mobile == "") {
      this.Base.info("请填写联系电话");
      return;
    }

    // if (!ismobile) {
    //   this.Base.info("请填写正确的联系电话");
    //   return;
    // }

    if (data.address == "") {
      this.Base.info("请填写地址");
      return;
    } 
    if (data.fulladdress == "") {
      this.Base.info("请填写详细地址");
      return;
    } 
    // if (data.jianjie == "") {
    //   this.Base.info("请填写机构简介");
    //   return;
    // }


    // if (data.kcname == "") {
    //   this.Base.info("请填写课程名称");
    //   return;
    // }

    // if (data.age == "") {
    //   this.Base.info("请填写年龄段");
    //   return;
    // }

    // if (data.time == "") {
    //   this.Base.info("请填写可预约的上课时间");
    //   return;
    // }


    var kclist = that.Base.getMyData().kclist;
  
    // for (var i = 0; i < kclist.length; i++) {

 

    //   if (kclist[i].sex == "") {
    //     this.Base.info("请选择性别");
    //     return;
    //   }
    //   if (kclist[i].kaike == "") {
    //     this.Base.info("请选择开课方式");
    //     return;
    //   }

    //   if (kclist[i].qingjia == "") {
    //     this.Base.info("请选择请假要求");
    //     return;
    //   }

    // }


    // if (data.duration == "") {
    //   this.Base.info("请填写课程时长");
    //   return;
    // }

    // if (data.duration == "") {
    //   this.Base.info("请填写课程时长");
    //   return;
    // }

    // if (data.duration == "") {
    //   this.Base.info("请填写课程时长");
    //   return;
    // }

    // if (data.duration == "") {
    //   this.Base.info("请填写课程时长");
    //   return;
    // }



    // if (jgimages.length == null || jgimages.length<1) {
    //   this.Base.info("请上传机构高清门头照");
    //   return;
    // }

    // if (hjimages.length == null || hjimages.length < 3) {
    //   this.Base.info("请上传至少三张机构内部环境照片");
    //   return;
    // }

    // if (skimages.length == null || skimages.length < 4) {
    //   this.Base.info("请上传至少四张小朋友上课或获奖照片");
    //   return;
    // }



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
            member_id: that.Base.getMyData().memberinfo.id,
            hangye: data.hangye,
            name: data.jigou,
            mobile: data.mobile,
            address: region,
            full_address: data.fulladdress,
            jianjie: data.jianjie,
            mentou: jgimages,
            huanjing: hjimages,
            huojiang: skimages,
            appstatus: "I",
            status: "A",
            protocol: "Y"
          }, (addjigou) => {

            that.Base.setMyData({
              addjigou
            });
           // console.log(addjigou.return);
           // console.log("大幅度");
            var kclist = that.Base.getMyData().kclist;
           // console.log("冷酷祭典");
           // console.log(kclist);
          //  console.log("冷酷祭典");
            //return;
            for (var i = 0; i < kclist.length; i++) {

              var k = {
                application_id: addjigou.return,
                name: kclist[i].name,
                age: kclist[i].nianlin,
                date_time: kclist[i].yuyue,
                sex: kclist[i].sex,
                duration: kclist[i].shichang,
                style: kclist[i].kaike,
                claim: kclist[i].qingjia,
                status: "A"
              };
              that.addt(k, i);
            }

          });

          wx.hideLoading();
          

          that.Base.setMyData({
            tc: true
          })


          // wx.showToast({
          //   title: '提交成功',
          //   icon: '',
          // })
          

        }
      }
    });
  }


  bindshowtoast(e) {
    this.Base.setMyData({
      tc:false
    })
    wx.navigateBack({
      delta: 1,
    })
  }

  addt(json, i) {
    var jigouapi = new JigouApi();
    setTimeout(() => {

      jigouapi.addshenqing(json, (addshenqing) => {
        this.Base.setMyData({
          addshenqing
        })
      })
    }, i * 300);
  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xiename = content.xiename;
body.nianlin = content.nianlin;
body.yuyue = content.yuyue;
body.shichang = content.shichang; 

body.bindshowtoast = content.bindshowtoast;

body.bindcheck = content.bindcheck;
body.confirm = content.confirm;
body.tocontent = content.tocontent;
body.useaddress = content.useaddress;
body.bindRegionChange = content.bindRegionChange;

body.bindchecksex = content.bindchecksex;
body.bindkaike = content.bindkaike;
body.bindqingjia = content.bindqingjia;
body.tohuiyuan = content.tohuiyuan;

body.jguploadimg = content.jguploadimg;
body.jgminusImg = content.jgminusImg;

body.hjuploadimg = content.hjuploadimg;
body.hjminusImg = content.hjminusImg;

body.skuploadimg = content.skuploadimg;
body.skminusImg = content.skminusImg;

body.addkecheng = content.addkecheng;
body.addt = content.addt; 

body.shanchu = content.shanchu;
Page(body)