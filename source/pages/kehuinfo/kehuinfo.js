import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '客户详情',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    console.log(days);
    return [days < b, b - days];

  }
  onMyShow() {
    var that = this;
    var shijian = this.Base.getMyData().instinfo.xiajishijian;
     var memberapi=new MemberApi();
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];
    memberapi.chakanxiaji({}, (xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
        console.log(this.Base.getMyData().instinfo.fenxiaobili);
        console.log(xiaji[i].shouyi * this.Base.getMyData().instinfo.fenxiaobili);
        console.log(12313);
        xiaji[i].shouyi = Number(xiaji[i].jiner * this.Base.getMyData().instinfo.fenxiaobili).toFixed(2);
        quanbu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(quanbu);
      console.log(youxiao);
      console.log(shixiao);
      var member = quanbu.filter((item) => {
        return item.id = this.Base.options.id;
      })
      this.Base.setMyData({ member: member[0] });
    })
       
 
 
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.jisuanchaoshi = content.jisuanchaoshi;
Page(body)