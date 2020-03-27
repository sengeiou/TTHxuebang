//app.js
var mta = require('mta_wechat_sdk/mta_analysis.js')

import {
  AppBase
} from "appbase.js";

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    mta.App.init({
      "appID": "500680287",
      "eventID": "500680288",
      "lauchOpts": options, //渠道分析,需在onLaunch方法传入
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
   
    var ss = options;
    console.log("ddd")
    console.log(options.scene,"飞飞")
    
    console.log("ddd")
    if (options.scene!=undefined){
      AppBase.scenes = options.scene
    }
  }
})
