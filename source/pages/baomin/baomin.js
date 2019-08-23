import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import { InstApi } from "../../apis/inst.api.js";
import { HuodonApi } from "../../apis/huodon.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      xuanzhon: false,
      fenmian: '',
      jgimages: [],
      saiqu: [],
      minchen: '',
      renshu: '',
      laoshi: '',
      lianxifanshi: '',
      jigou: '',
      xuanyan: '',


    })
  }
  minchen(e) {


    this.Base.setMyData({ minchen: e.detail.value })
  }
  renshu(e) {


    this.Base.setMyData({ renshu: e.detail.value })
  }
  laoshi(e) {


    this.Base.setMyData({ laoshi: e.detail.value })
  }

  lianxifanshi(e) {


    this.Base.setMyData({ lianxifanshi: e.detail.value })
  }

  jigou(e) {


    this.Base.setMyData({ jigou: e.detail.value })
  }

  xuanyan(e) {


    this.Base.setMyData({ xuanyan: e.detail.value })
  }


  onMyShow() {
    var that = this;
    var huodonapi = new HuodonApi();
    var instapi = new InstApi();
    huodonapi.huodoninfo({ id: this.Base.options.id }, (huodoninfo) => {
      this.Base.setMyData({ huodoninfo });
    })
    instapi.saiqu({huodon_id:this.Base.options.id}, (saiqu) => {
      this.Base.setMyData({ saiqu });

    })

  }

  jguploadimg() {
    this.Base.uploadOneImage("jiemu", (ret) => {

      this.Base.setMyData({ fenmian: ret })

    }, undefined);

  }
  jguploadimg1() {
    var that = this;
    this.Base.uploadImage("jiemutupian", (ret) => {

      var jgimages = that.Base.getMyData().jgimages;
      jgimages.push(ret);
      that.Base.setMyData({
        jgimages
      });

    }, 9, undefined);


  }
  deleteimg(e) {

    var jgimages = this.Base.getMyData().jgimages;


    jgimages = jgimages.filter((item, idx) => {
      return idx != e.currentTarget.dataset.id;
    })

    this.Base.setMyData({ jgimages })

  }
  gou() {

    var xuanzhon = this.Base.getMyData().xuanzhon;
    this.Base.setMyData({ xuanzhon: !xuanzhon })

  }
  bindsaiquChange(e) {

    this.Base.setMyData({
      index: e.detail.value
    })
  }

  tijiao() {
    var minchen = this.Base.getMyData().minchen;
    var renshu = this.Base.getMyData().renshu;
    var laoshi = this.Base.getMyData().laoshi;
    var lianxifanshi = this.Base.getMyData().lianxifanshi;
    var index = this.Base.getMyData().index;
    var saiqu = this.Base.getMyData().saiqu;
    var jigou = this.Base.getMyData().jigou;
    var xuanyan = this.Base.getMyData().xuanyan;
    var fenmian = this.Base.getMyData().fenmian;
    var zhaopiao = this.Base.getMyData().jgimages;
    var xuanzhon = this.Base.getMyData().xuanzhon;

    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.Base.info("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.Base.info("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.Base.info("请填写联系方式");
      return
    }
    if (index == undefined) {
      this.Base.info("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.Base.info("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.Base.info("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.Base.info("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.Base.options.id,
      name: minchen,
      renshu: renshu,
      laoshi: laoshi,
      lianxifanshi: lianxifanshi,
      jigou: jigou,
      xuanyan: xuanyan,
      saiqu_id: saiqu[index].id,
      fenmian: fenmian,
      tupian: zhaopiao,
    }
    var huodonapi = new HuodonApi();

    huodonapi.addjiemu(json, (res) => {

      console.log(res);
      if (res.code == 0) {
        wx.showModal({
          title: '提示',
          content: '报名成功,请等待管理员审核',
          confirmText: "我知道了",
          confirmColor: '#FF6600',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({

              })
            }

          }
        })

      }



    })




  }
  yulan() {
    var minchen = this.Base.getMyData().minchen;
    var renshu = this.Base.getMyData().renshu;
    var laoshi = this.Base.getMyData().laoshi;
    var lianxifanshi = this.Base.getMyData().lianxifanshi;
    var index = this.Base.getMyData().index;
    var saiqu = this.Base.getMyData().saiqu;
    var jigou = this.Base.getMyData().jigou;
    var xuanyan = this.Base.getMyData().xuanyan;
    var fenmian = this.Base.getMyData().fenmian;
    var zhaopiao = this.Base.getMyData().jgimages;
    var xuanzhon = this.Base.getMyData().xuanzhon;

    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (renshu == '') {
      this.Base.info("请填写节目人数");
      return
    }
    if (laoshi == '') {
      this.Base.info("请填写带队老师");
      return
    }
    if (lianxifanshi == '') {
      this.Base.info("请填写联系方式");
      return
    }
    if (index == undefined) {
      this.Base.info("请填写报名赛区");
      return
    }
    if (jigou == '') {
      this.Base.info("请填写所属机构");
      return
    }
    if (minchen == '') {
      this.Base.info("请填写节目名称");
      return
    }
    if (zhaopiao.length == 0) {
      this.Base.info("请上传照片");
      return
    }
    if (xuanzhon == false) {
      this.Base.info("请勾选报名相关条款");
      return
    }

    var json = {
      huodon_id: this.Base.options.id,
      name: minchen,
      renshu: renshu,
      laoshi: laoshi,
      lianxifanshi: lianxifanshi,
      jigou: jigou,
      xuanyan: xuanyan,
      saiqu_id: saiqu[index].id,
      fenmian: fenmian,
      tupian: zhaopiao,
    }

    wx.navigateTo({
      url: '/pages/jiemuxianqin/jiemuxianqin?json=' + JSON.stringify(json),
    })

  }
  baomin(){

  wx.navigateTo({
    url: '/pages/tiaokuan/tiaokuan',
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
body.jguploadimg = content.jguploadimg;
body.jguploadimg1 = content.jguploadimg1;
body.deleteimg = content.deleteimg;
body.gou = content.gou;
body.minchen = content.minchen;
body.renshu = content.renshu;
body.laoshi = content.laoshi;
body.lianxifanshi = content.lianxifanshi;
body.jigou = content.jigou;
body.xuanyan = content.xuanyan;
body.tijiao = content.tijiao;
body.bindsaiquChange = content.bindsaiquChange;
body.yulan = content.yulan;
body.baomin = content.baomin;
Page(body)