// pages/search/search.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.new=1;
    super.onLoad(options);
    var json = {
      searchrecomm: ""
    };
    this.Base.setMyData({ show: 0, shows: "finished", });

    if (options.new != undefined) {
      json.newphone = "N";
    }
    var bookapi = new BookApi();


  }
  onMyShow() {
    var that = this;
  }
  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }


  search(e) {
    //console.log(e.detail.value);
    this.Base.setMyData({ show: 1 });
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      var json = {};
      var data = e.detail.value;
      this.Base.setMyData({ value: data });
      json.searchkeyword = data;

      var bookapi = new BookApi();
      bookapi.keywordlist(json, (result) => {
        this.Base.setMyData({ result });
        wx.hideLoading();
      });
    }, 100);

  }

  tosearch(e) {
    var word = this.Base.getMyData().value;
    if (word != null) {
      wx.navigateTo({
        url: '/pages/searchbook/searchbook?keyword=' + word,
      })
    }
  }

  todetails(e) {
    var name = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/searchbook/searchbook?keyword=' + name,
    })
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        shows: "wait"
      })
    } 
    if (type == "mv") {
      this.Base.setMyData({
        shows: "video"
      })
    } 

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.skey = content.skey;
body.search = content.search;
body.tosearch = content.tosearch;
body.todetails = content.todetails;

body.bindshow = content.bindshow;
Page(body)