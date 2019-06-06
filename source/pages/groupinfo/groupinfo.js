// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
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
  }
  onUnload() {
    console.error(66666);
    clearInterval(this.timer);
  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();
    api.pintuaninfo({ id: this.Base.options.id }, (pintuaninfo) => {
      pintuaninfo.group_course_group_number = parseInt(pintuaninfo.group_course_group_number);
      console.error(pintuaninfo);
      var daojishilist = [];
      daojishilist[0] = pintuaninfo.jieshushijian;
      this.Base.setMyData({
        pintuaninfo: pintuaninfo, daojishilist: daojishilist
      })
   this.daojishi();
    })

  }
  daojishi() {
    var that = this;


    var list = that.Base.getMyData().daojishilist;
    console.log(list);
    console.log(52);
    this.timer = setInterval(() => {

      var sjlist = [];
      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        var jisuandate = new Date(list[i]);
        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000)));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000)));   //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000)));//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));


        sjlist.push(listtt);

      }
      that.Base.setMyData({

        sjlist: sjlist

      })



    }, 1000)





  }
}
var timer = 1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.daojishi = content.daojishi;
Page(body)