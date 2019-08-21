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
      toupiao: false
    });
    this.Base.setMyData({
      yulan: options.id
    })

  }

  onMyShow() {
    var that = this;
    var huodonapi = new HuodonApi();
    var instapi=new InstApi();
    var instapi = new InstApi();
    var yulan = this.Base.getMyData().yulan;
    if (yulan != undefined) {
      huodonapi.jiemuinfo({
        id: this.Base.options.id
      }, (jiemuinfo) => {

        console.log(jiemuinfo);
        this.Base.setMyData({
          jiemuinfo,
          paimin: that.Base.options.idd
        });

      })
    } else {

      let json = JSON.parse(this.options.json);
      var jiemuinfo = {};
    
      instapi.saiquinfo({ id: json.saiqu_id},(res)=>{
           

        jiemuinfo.fenmian = json.fenmian;
        jiemuinfo.saiqu_id_name = res.name;
        jiemuinfo.piaoshu = '暂无';
        jiemuinfo.name = json.name;
        jiemuinfo.renshu = json.renshu;
        jiemuinfo.xuanyan = json.xuanyan;

        jiemuinfo.tupian = json.tupian;



        this.Base.setMyData({
          paimin: '暂无'
        });
        this.Base.setMyData({
          jiemuinfo
        })

      })


    }


  }
  toupiao() {
    var that = this;
    var api = new InstApi();
    var date = Date.parse(new Date()) / 1000;

    if (date < this.Base.options.vote_startTime_timespan) {
      wx.showToast({
        title: '投票暂未开放',
        icon: 'none',
      })
      return
    }

    if (date > this.Base.options.vote_endTime_timespan) {
      wx.showToast({
        title: '投票已结束',
        icon: 'none',
      })
      return
    }

    api.jianchatoupiao({}, (zige) => {

      if (zige.length == 0) {
        api.toupiao({
          jiemu_id: e.currentTarget.id
        }, (res) => {

          if (res.code == 0) {
            wx.showToast({
              title: '投票成功',
              icon: 'none',
            })
            that.onMyShow();
          }
        })
      } else {
        wx.showToast({
          title: '今日投票次数已达上限，明天再来吧~',
          icon: 'none',
        })


      }


    })




  }
  tijiao() {
    var json = JSON.parse(this.Base.options.json);
    var huodonapi = new HuodonApi();
    console.log(json);
   
    huodonapi.addjiemu(json, (res) => {

      console.log(res);


      if (res.code == 0) {
       

        wx.showModal({
          title: '提示',
          content: 报名成功,
          confirmText: "我知道了",
          confirmColor: '#FF6600',
          showCancel: false,
          success(res){
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
            } 

          }
        })


       

      }



    })

  }
  fanhui() {

    wx.navigateBack({

    })

  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.toupiao = content.toupiao;
body.fanhui = content.fanhui;
body.tijiao = content.tijiao;
Page(body)