// pages/baoma/baoma.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  HuodonApi
} from "../../apis/huodon.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      guize: false
    })
  }

  onMyShow() {
    var that = this;
    var huodonapi = new HuodonApi();
    var instapi = new InstApi();
    huodonapi.huodoninfo({
      id: this.Base.options.id
    }, (huodoninfo) => {
      this.Base.setMyData({
        huodoninfo
      });

    })
    instapi.guize({
      type: 'G'
    }, (guize) => {
      var guizezon = '';
      guize.map((item) => {

        guizezon += item.guize + '\n';

      })

      this.Base.setMyData({
        guize,
        guizezon
      })



    })

  }
  guize() {
    this.Base.setMyData({
      guize: true
    })

  }
  closetanchuang() {
    this.Base.setMyData({
      guize: false
    })
  }
  baomin() {


  var that=this;
    var date = Date.parse(new Date()) / 1000;
    var huodoninfo = this.Base.getMyData().huodoninfo;

    if (date < huodoninfo.apply_startTime_timespan) {
      wx.showToast({
        title: '报名未开始',
        icon: 'none',
      })
      return
    }


    if (date > huodoninfo.apply_endTime_timespan + 86400) {
      wx.showToast({
        title: '报名已结束',
        icon: 'none',
      })
      return
    }



    wx.navigateTo({
      url: '/pages/baomin/baomin?id=' + this.Base.options.id,
    })
  }
  jiemuinfo(e) {
    var huodoninfo = this.Base.getMyData().huodoninfo;
    wx.navigateTo({
      url: '/pages/jiemuxianqin/jiemuxianqin?id=' + e.currentTarget.id + '&idd=' + parseInt(e.currentTarget.dataset.id + 1)
        + '&vote_startTime_timespan=' + huodoninfo.vote_startTime_timespan + '&vote_endTime_timespan=' + huodoninfo.endTime_timespan
      ,
    })
  }
  toupiao(e) {
    var that = this;
    var api = new InstApi();
    var date = Date.parse(new Date()) / 1000;
    var huodoninfo = this.Base.getMyData().huodoninfo;
    if (date < huodoninfo.vote_startTime_timespan) {
      wx.showToast({
        title: '投票暂未开放',
        icon: 'none',
      })
      return
    }

    if (date > huodoninfo.vote_endTime_timespan + 86400) {
      wx.showToast({
        title: '投票已结束',
        icon: 'none',
      })
      return
    }

    api.jianchatoupiao({}, (zige) => {

      if (zige.length == 0) {
        api.toupiao({ jiemu_id: e.currentTarget.id }, (res) => {

          if (res.code == 0) {
            wx.showToast({
              title: '投票成功',
              icon: 'none',
            })
            that.onMyShow();
          }
        })
      }
      else {
        wx.showToast({
          title: '今日投票次数已达上限，明天再来吧~',
          icon: 'none',
        })


      }


    })




  }
  jiazaiwanle(){
 var that=this;
      var query = wx.createSelectorQuery();
      query.select('#gdd').boundingClientRect();
      query.exec((res) => {
        //res就是 所有标签为mjltest的元素的信息 的数组
        console.log(res);
        console.log("哈哈哈哈");
        console.log(res[0].height);
        console.log(AppBase.Model);
        
      
        that.Base.setMyData({ gaodu: res[0].height });
      })
    
  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.guize = content.guize;
body.closetanchuang = content.closetanchuang;
body.baomin = content.baomin;
body.jiemuinfo = content.jiemuinfo;
body.toupiao = content.toupiao;
body.jiazaiwanle = content.jiazaiwanle;
Page(body)