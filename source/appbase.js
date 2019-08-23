/****
import { MemberApi } from "../apis/member.api";
import { WechatApi } from "../apis/wechat.api";
 */
import {
  ApiConfig
} from "apis/apiconfig.js";
import {
  ApiUtil
} from "apis/apiutil.js";
import {
  InstApi
} from "apis/inst.api.js";
import {
  MemberApi
} from "apis/member.api";
import {
  WechatApi
} from "apis/wechat.api";
var mta = require('mta_wechat_sdk/mta_analysis.js')

export class AppBase {
  static lastlat = 0;
  static lastlng = 0;
  static lastdistance=0;
  static lastaddress = {
    address: { ad_info: { adcode: "", city:""} }
  };
  static CITYID = 440300;
  static CITYNAME = "深圳市";
  static CITYSET = false;
  static BRANDAPPLE = 12;
  static QQMAPKEY = "IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5";
  static UserInfo = {};
  static Scene = 1001;
  static InstInfo = null;
  static Resource = null;
  static System=null;  
  static Model=null;
  unicode = "tthxb";
  needauth = true;
  pagetitle = null;
  app = null;
  options = null;
  inmaintain = false;
  data = {
    apiurl: ApiConfig.GetApiUrl(),
    uploadpath: ApiConfig.GetUploadPath(),
    copyright: {
      name: "",
      website: "mecloud.com"
    }
  };
  Page = null;
  util = ApiUtil;
  constructor() {
    this.app = getApp();
    this.me = this;
    //ApiConfig.SetToken("10e991a4ca7a93c60794628c11edaea3");
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: instinfo.name,
    })
  }
  generateBodyJson() {
    var base = this;
    return {
      Base: base,
      /**
       * 页面的初始数据
       */
      data: base.data,
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: base.onLoad,

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: base.onReady,

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: base.onShow,

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: base.onHide,

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: base.onUnload,

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: base.onPullDownRefresh,

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: base.onReachBottom,

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: base.onShareAppMessage,
      onMyShow: base.onMyShow,
      phonenoCallback: base.phonenoCallback,
      viewPhoto: base.viewPhoto,
      phoneCall: base.phoneCall,
      openMap: base.openMap,
      backPage: base.backPage,
      backHome: base.backHome,
      logout: base.logout,
      switchTab: base.switchTab,
      closePage: base.closePage,
      gotoPage: base.gotoPage,
      navtoPage: base.navtoPage,
      openContent: base.openContent,
      getPhoneNo: base.getPhoneNo,
      dataReturn: base.dataReturn,
      dataReturnCallback: base.dataReturnCallback,
      loadtabtype: base.loadtabtype,
      contactkefu: base.contactkefu,
      contactweixin: base.contactweixin,
      download: base.download,
      checkPermission: base.checkPermission,
      getUserInfo: base.getUserInfo,
      copytext: base.copytext,
      recorderManager: base.recorderManager,
      backtotop: base.backtotop,
      gotoBottom: base.gotoBottom



    }
  }
  log() {
    console.log("yeah!");
  }
  onLoad(options) {
    mta.Page.init()

    this.Base.options = options;

    var obj = wx.getLaunchOptionsSync();
    console.log(obj);
    console.log('启动小程序的路径:', obj.path);
    console.log('启动小程序的场景值:', obj.scene);
    console.log('启动小程序的 query 参数:', obj.query);
    console.log('来源信息:', obj.shareTicket);
    console.log('来源信息参数appId:', obj.referrerInfo.appId);
    console.log('来源信息传过来的数据:', obj.referrerInfo.extraData);
  
    
    
    wx.getSystemInfo({
      success: function (res) {
        console.log("真的牛皮你");
        console.log(res); 
            AppBase.System=res.system;
            AppBase.model=res.model;
            
          
      }
    })

    
    this.Base.setBasicInfo();

    this.Base.setMyData({
      options: options
    });


    var instapi = new InstApi();
    if (AppBase.Resource != null) {
      this.Base.setMyData({
        res: AppBase.Resource
      });
    } else {

      instapi.resources({}, (res) => {
        AppBase.Resource = res;
        this.Base.setMyData({
          res
        });
      });
    }


    ApiConfig.SetUnicode(this.Base.unicode);


    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
      console.log("是不是新版本");
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })


  }

  gotoOpenUserInfoSetting() {
    var that = this;
    wx.showModal({
      title: '需要您授权才能正常使用小程序',
      content: '请点击“去设置”并启用“用户信息”，然后确定即可正常使用',
      confirmText: "去设置",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({

          })
        } else {
          that.gotoOpenUserInfoSetting();
        }
      }
    })
  }

  setBasicInfo() {
    var that = this;
  }
  onReady() {
    console.log("onReady");
  }
  minimm
  onShow() {
    var that = this;

    var instapi = new InstApi();
    
    if (AppBase.InstInfo != null) {
      var instinfo = AppBase.InstInfo;
      if (instinfo == null || instinfo == false) {

        return;
      }

      // if (this.Base.inmaintain == false && instinfo.instswitch == '否') {
      //   wx.reLaunch({
      //     url: '/pages/maintain/maintain',
      //   })
      //   return;
      // }
      AppBase.InstInfo = instinfo;
      this.Base.setMyData({
        instinfo: instinfo
      });
      if (this.Base.pagetitle == null) {
        this.Base.setPageTitle(instinfo);
      } else {

      }
    } else {

      instapi.info({}, (instinfo) => {
        if (instinfo == null || instinfo == false) {

          return;
        }
        AppBase.InstInfo = instinfo;
        this.Base.setMyData({
          instinfo: instinfo
        });
        if (this.Base.pagetitle == null) {
          this.Base.setPageTitle(instinfo);
        } else {

        }
      }, false);
    }
    //AppBase.UserInfo.openid ="ozqQo4y4CUIXHIf0c2aJ7V9gd_Lo";
    //ApiConfig.SetToken(AppBase.UserInfo.openid);
    if (AppBase.UserInfo.openid == undefined) {
      // 登录
      console.log("onShow");
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("loginres", res);
          
          var memberapi = new MemberApi();
          memberapi.getuserinfo({
            code: res.code,
            grant_type: "authorization_code"
          }, data => {
            console.log("loginres2", data);
            AppBase.UserInfo.openid = data.openid;
            AppBase.UserInfo.session_key = data.session_key;
            ApiConfig.SetToken(data.openid);
            memberapi.updateauth(AppBase.UserInfo, (res) => {
              console.log("loginres3", res);
              that.Base.setMyData({
                UserInfo: AppBase.UserInfo
              });
              that.checkPermission();

              that.getUserInfo();
              

            });



            });


        }
      })
      return false;
    } else {
      if (that.setMyData != undefined) {
        that.setMyData({
          UserInfo: AppBase.UserInfo
        });
      } else {
        that.Base.setMyData({
          UserInfo: AppBase.UserInfo
        });
      }
      //this.loadtabtype();

      that.Base.setMyData({
        UserInfo: AppBase.UserInfo
      });

      that.getUserInfo();


      that.checkPermission();
    }

  }

  getUserInfo(){
    var that=this;
    var memberapi=new MemberApi();
    wx.getUserInfo({
      success: userres => {
        var openid = AppBase.UserInfo.openid;
        var session_key = AppBase.UserInfo.session_key;
        AppBase.UserInfo = userres.userInfo;
        AppBase.UserInfo.openid = openid;
        AppBase.UserInfo.session_key = session_key;
        console.log("loginres4", userres);

        var api = new WechatApi();
        api.decrypteddata({
          iv: userres.iv,
          encryptedData: userres.encryptedData
        }, ret => {

          AppBase.UserInfo.unionid = ret.return.unionId;
          ApiConfig.SetTokenKey(ret.return.unionId);
          console.log("loginres5", ret);
          console.log("loginres6", AppBase.UserInfo);

          memberapi.update(AppBase.UserInfo, () => {

            console.log(AppBase.UserInfo);
            that.Base.setMyData({
              UserInfo: AppBase.UserInfo
            });
            memberapi.info({}, (info) => {
              console.log({
                tick: "member",
                info
              });

              console.log("说锤子呢绒");
              var order = info.order;
              var dfkorder = 0;
              var ypborder = 0;
              var dpjorder = 0;
              var dshorder = 0;
              var tkorder = 0;
              order.map((item) => {

                if (item.pstatus == 'W') {
                  dfkorder++;
                }
                if (item.type == 'PT' && item.pstatus == 'PT') {
                  ypborder++;
                }
                if (item.pstatus == 'PJ') {
                  dpjorder++;
                }
              })
              info.dfkorder = dfkorder;
              info.ypborder = ypborder;
              info.dpjorder = dpjorder;
              info.dshorder = dshorder;
              info.tkorder = tkorder;

              this.Base.setMyData({
                memberinfo: info
              });
            });

          });
        });

      },
      fail: userloginres => {
        console.log("auth fail");
        console.log(userloginres);
        if (that.Base.needauth == true) {
          console.log("auth redirect", that.Base.needauth, that.needauth);
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        }
      }
    })
  }

  checkPermission() {
    var memberapi = new MemberApi();
    var that = this;
    memberapi.info({}, (info) => {
      console.log({
        tick: "member",
        info
      });
      
      console.log("说锤子呢绒");
      var order = info.order;
      var dfkorder = 0;
      var ypborder = 0;
      var dpjorder = 0;
      var dshorder = 0;
      var tkorder = 0;
      order.map((item) => {

        if (item.pstatus == 'W') {
          dfkorder++;
        }
        if (item.type == 'PT' && item.pstatus == 'PT') {
          ypborder++;
        }
        if (item.pstatus =='PJ')
        {
          dpjorder++;
        }
      })
      info.dfkorder = dfkorder;
      info.ypborder=ypborder;
      info.dpjorder=dpjorder;
      info.dshorder=dshorder;
      info.tkorder=tkorder;

      this.Base.setMyData({
        memberinfo: info
      });
      //that.onMyShow();

      if (AppBase.lastlat != 0) {
        this.Base.setMyData({
          address: AppBase.lastaddress,
          lastdistance: AppBase.lastdistance,
          mylat: AppBase.lastlat,
          mylng: AppBase.lastlng
        });
        console.log("vvckc", "0");
        that.onMyShow();
      }

      this.Base.getAddress((address) => {
        console.log("vvckc", "4",address );
        AppBase.lastaddress = address;
        var mylat = address.location.lat;
        var mylng = address.location.lng;
        var memberinfo = this.Base.getMyData().memberinfo;
        var citylist = memberinfo.citylist;



        var citycode = address.ad_info.adcode.substr(0, 4) + "00";

        this.Base.setMyData({ adcode: address.ad_info.adcode, citycode });
  
        if (AppBase.CITYSET == false) {

          console.log(AppBase.CITYID, "哦哦", citycode)

          var citys = citylist.filter((item, idx) => {
            return item.code == citycode
          })

          console.log(citys, "阔脚裤")


          if (citys.length == 0) {
            this.Base.setMyData({
              nocity: 1
            });
          }

          

          for (var i = 0; i < citylist.length; i++) {

            console.log(citylist[i].id, "大蒜", citycode, AppBase.CITYID)

            if (citylist[i].id == citycode) {
              AppBase.CITYID = citylist[i].id;
              AppBase.CITYNAME = citylist[i].name;
              break;
            }


          }

          


        }

        var memberapi = new MemberApi();
        memberapi.usecity({
          city_id: AppBase.CITYID
        });

         

        this.Base.setMyData({
          mylat,
          mylng,
          cityname: AppBase.CITYNAME
        });

        var lastlat = Number(AppBase.lastlat == undefined ? 0 : AppBase.lastlat);
        var lastlng = Number(AppBase.lastlng == undefined ? 0 : AppBase.lastlng);

        var lastdistance = ApiUtil.GetDistance(mylat, mylng, lastlat, lastlng);

        AppBase.lastlat = mylat;
        AppBase.lastlng = mylng;
        AppBase.lastdistance = lastdistance;

        this.Base.setMyData({
          lastdistance,
          address,
          mia: "??",
        });
        console.log("lastdistance", Number(lastdistance), Number(lastdistance) == "NaN");
        if (lastdistance > 500 || lastdistance == NaN) {
          console.log("citycode2" + AppBase.CITYID);
          console.log("vvckc", "1", mylat);
          that.onMyShow();
        }
      }, () => {

        this.Base.setMyData({
          address: AppBase.lastaddress,
          lastdistance: 0,
          address: { ad_info: {} },
          mylat: 0,
          mylng: 0
        });
        console.log("vvckc", "2");
        that.onMyShow();


      });




    });
  }
  loadtabtype() {
    console.log("loadtabtype");
    var memberapi = new MemberApi();
    memberapi.update(AppBase.UserInfo, () => { });
  }

  onMyShow() {
    console.log("onMyShow");
  }
  onHide() {
    console.log("onHide");
  }
  onUnload() {
    console.log("onUnload犯得上");
  }
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    this.onShow();
    wx.stopPullDownRefresh();
  }
  onReachBottom() {
    console.log("onReachBottom");
  }
  onShareAppMessage() {

  }

  dataReturn(data) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log("????");
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.dataReturnCallback(this.Base.options.callbackid, data);
    wx.navigateBack();
  }

  dataReturnCallback(callbackid, data) {
    console.log("please use dataReturnCallback(callbackid, data)");
  }

  setMyData(obj) {
    console.log(obj);
    this.Page.setData(obj);
  }
  getMyData() {
    return this.Page.data;
  }
  getPhoneNo(e) {
    var that = this;
    console.log(e);
    var api = new WechatApi();
    var data = this.Base.getMyData();
    console.log("aaa?");

    e.detail.session_key = AppBase.UserInfo.session_key;
    e.detail.openid = AppBase.UserInfo.openid;
    console.log(e.detail);
    api.decrypteddata(e.detail, (ret) => {
      console.log(ret);
      that.phonenoCallback(ret.return.phoneNumber, e);
    });
  }


  phonenoCallback(phoneno, e) {
    console.log("phone no callback");
    console.log(phoneno);
    console.log(e);
  }
  viewPhoto(e) {
    var img = e.currentTarget.id;
    console.log(img);
    wx.previewImage({
      urls: [img],
    })
  }
  viewGallary(modul, photos, current = "") {
    var nphotos = [];
    for (var i = 0; i < photos.length; i++) {
      nphotos.push(ApiConfig.GetUploadPath() + modul + "/" + photos[i]);
    }
    current = ApiConfig.GetUploadPath() + modul + "/" + current;
    console.log(nphotos);
    wx.previewImage({
      urls: nphotos,
      current: current
    })
  }
  phoneCall(e) {
    var tel = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  }
  getAddress(callback, failcallback, lat, lng) {
    var that = this;
    if (AppBase.QQMAP == null) {
      var QQMapWX = require('libs/qqmap/qqmap-wx-jssdk.js');
      AppBase.QQMAP = new QQMapWX({
        key: AppBase.QQMAPKEY
      });
    }
    console.log("getmyaddress");
    if (lat == undefined && lng == undefined) {
      wx.getLocation({
        success: function (res) {
          lat = res.latitude;
          lng = res.longitude;
          AppBase.QQMAP.reverseGeocoder({
            location: {
              latitude: lat,
              longitude: lng
            },
            success: function (res) {
              //that.setMyData({ addressinfo:res.result });
              callback(res.result);
            },
            fail: function (res) {
              console.log("fail get location");
              callback(res.result);
              console.log(res);
            },
            complete: function (res) {
              console.log("complete");
              console.log(res);
            }
          });
        },
        fail: function (res) {
          console.log("fail open location");
          console.log(res);
          if (failcallback != undefined) {
            failcallback();
          }
        }
      });
    } else {
      AppBase.QQMAP.reverseGeocoder({
        location: {
          latitude: lat,
          longitude: lng
        },
        success: function (res) {
          console.log("success");
          console.log(res);
          callback(res.result);
        },
        fail: function (res) {
          console.log("fail");
          console.log(res);
        },
        complete: function (res) {
          console.log("complete");
          console.log(res);
        }
      });
    }
  }
  openMap(e) {
    if (AppBase.QQMAP == null) {
      var QQMapWX = require('libs/qqmap/qqmap-wx-jssdk.js');
      AppBase.QQMAP = new QQMapWX({
        key: 'IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5'
      });
    }
    var address = e.currentTarget.id;
    AppBase.QQMAP.geocoder({
      address: address,
      success: function (res) {
        if (res.status == 0) {
          var lat = res.result.location.lat;
          var lng = res.result.location.lng;

          wx.openLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
            address: address,
            latitude: lat,
            longitude: lng,
            success: function (res) {

            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  uploadFile(modul, filename, lujin, callback) {
    //console.log(8888888888);

    var tempFilePaths = filename
    var lujin = lujin;
    console.log("ssssssssssss" + tempFilePaths);
    console.log(lujin);
    wx.uploadFile({
      url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
      filePath: lujin,
      name: 'file',
      formData: {
        'module': modul,
        "field": "file"
      },

      success: function (res) {
        console.log(res);
        var data = res.data
        if (data.substr(0, 7) == "success") {
          data = data.split("|");
          var photo = data[2];
          callback(photo);
        } else {
          wx.showToast({
            title: '上传失败，请重试',
            icon: 'warn',
            duration: 2000
          })
        }
        //do something
      }
    });
  }

  uploadImage(modul, callback, count, completecallback) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: count,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
        if (completecallback != undefined) {
          completecallback();
        }
      }
    })
  }

  uploadOneImage(modul, callback, completecallback) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 1,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
        if (completecallback != undefined) {
          completecallback();
        }
      }
    })
  }

  uploadVideo(modul, callback, completecallback) {
    wx.chooseVideo({
      compressed: true, // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      maxDuration: 60,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = [];
        tempFilePaths.push(res.tempFilePath);
        //res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
        if (completecallback != undefined) {
          completecallback();
        }
      }
    })
  }

  takeImage(modul, callback) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
      }
    })
  }


  takeVideo(modul, callback) {
    wx.chooseVideo({
      compressed: false,
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      maxDuration: 60,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = [res.tempFilePath];
        for (var i = 0; i < tempFilePaths.length; i++) {

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
      }
    })
  }
  zhendon() {

    wx.vibrateShort();
  }
  info(message) {
    wx.showModal({
      title: '提示',
      content: message,
      confirmText: "我知道了",
      confirmColor: '#FF6600',
      showCancel: false
    })
  }
  warning(message) {
    wx.showModal({
      title: '警告',
      content: message,
      showCancel: false
    })
  }
  error(message) {
    wx.showModal({
      title: '错误',
      content: message,
      showCancel: false
    })
  }

  backPage() {
    wx.navigateBack({

    });
  }
  backHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
  logout() {
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  }
  gotoPage(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    var page = dataset.page;
    var parameter = dataset.param;
    if (parameter != "") {
      parameter = "?" + parameter;
    }
    var url = "../" + page + "/" + page + parameter;
    console.log(url);
    wx.redirectTo({
      url: url,
    })
  }
  navtoPage(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    var page = dataset.page;
    var parameter = dataset.param;
    if (parameter != "") {
      parameter = "?" + parameter;
    }
    var url = "../" + page + "/" + page + parameter;
    console.log(url);
    wx.navigateTo({
      url: url,
    })
  }
  switchTab(e) {
    console.log(e);
    var page = e.currentTarget.id;
    var url = "../" + page + "/" + page;
    console.log(url);
    wx.redirectTo({
      url: url,
    })
  }
  closePage() {

  }
  openContent(e) {
    var title = e.target.dataset.title;
    var keycode = e.target.dataset.keycode;
    wx.navigateTo({
      url: '/pages/content/content?keycode=' + keycode + "&title=" + title,
    })
  }
  console(key, val) {
    var json = {
      key,
      val
    };
    console.log(json);
  }

  checkRealname(callback) {
    var memberapi = new MemberApi();
    memberapi.checkrealname({}, (ret) => {
      if (ret == false) {
        wx.navigateTo({
          url: '/pages/signup/signup',
        })
      } else {
        callback();
      }
    });
  }

  download(url, callback, open = false) {
    var that=this;
    console.log(url);
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {

          var tempFilePath = res.tempFilePath;
          console.log(res);
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function (res) {
               that.Base.info("保存成功");
              var savedFilePath = res.savedFilePath;
              if (open == true) {
                wx.openDocument({
                  filePath: savedFilePath,
                });
              }
              console.log(savedFilePath);
              if (callback != null) {
                callback(savedFilePath);
              }
            }
          })
        }
      }
    })
  }

  contactkefu() {
    var instinfo = this.Base.getMyData().instinfo;
    console.log(instinfo);
    wx.showActionSheet({
      itemList: ["拨打热线", "添加客服"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: instinfo.tel
          })
        } else {
          var img = ApiConfig.GetUploadPath() + "inst/" + instinfo.kefuerweima;
          console.log(img);
          wx.previewImage({
            urls: [img],
          })
        }
      }
    })
  }
  contactweixin() {
    //wechatno
    var instinfo = this.Base.getMyData().instinfo;
    console.log(instinfo);
    wx.showActionSheet({
      itemList: [instinfo.wechatno, "一键复制"],
      success(e) {
        if (e.tapIndex == 0) {

        } else {
          wx.setClipboardData({
            data: instinfo.wechatno,
          })
        }
      }
    })
  }
  toast(msg, i = 0) {
    if (i == 0) {
      wx.showToast({
        title: msg,
        icon: "none"
      })
    }
    else (i == 1)
    {
      wx.showToast({
        title: msg,
        icon: "success"
      })

    }
  }
  backtotop() {
    console.log("backtotop");
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100
    })
  }

  gotoBottom() {
    wx.pageScrollTo({
      scrollTop: 100000,
      duration: 300
    })
  }
  
  copytext(e) {
    var id = e.currentTarget.id;
    wx.setClipboardData({
      data: id,
    })
    wx.showToast({
      title: '复制成功',

    })
  }
}