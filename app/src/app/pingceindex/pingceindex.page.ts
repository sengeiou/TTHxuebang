import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { PingceApi } from 'src/providers/pingce.api';

@Component({
  selector: 'app-pingceindex',
  templateUrl: './pingceindex.page.html',
  styleUrls: ['./pingceindex.page.scss'],
  providers: [MemberApi,PingceApi]
})
export class PingceindexPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public pingceApi: PingceApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  check=false;
  onMyLoad() {
    //参数
    this.params;

    var pingceapi = this.pingceApi;
    pingceapi.mypingcelist({}).then((mypingcelist) => {

      var a = mypingcelist.filter((item, idx) => {
        return item.pingce_id == this.params.id 
        && item.member_id == this.params.member_id
      })

      console.log(a, "刚刚")

      if (a.length > 0) {
        var that = this;

        this.showConfirm("您已答题，将跳转至结果页",(ret)=>{
          this.navigate("pingcejieguo",{
            id:that.params.id,
            typeA: a[0].typeA,
            typeB: a[0].typeB,
            typeC: a[0].typeC,
            typeD: a[0].typeD
          });
        });

      }
      // else {
      //   this.navigateTo({
      //     url: '/pages/pingceindex/pingceindex?id=' + id
      //   })
      // }

    })



  }

  count= 0;
  count2= 0;
  count3= 0;
  countTimer;
  countTimer2;
  countTimer3;

  info=null;
  yd="0";
  zq="0";
  sy="0";
  mypingcelist=[];

  onMyShow() {
    var that = this;

    this.count= 0;
  this.count2= 0;
  this.count3= 0;
  this.countTimer= null;
  this.countTimer2= null;
  this.countTimer3= null;

    this.drawProgressbg();
    this.countInterval();

    this.drawProgressbg2();
    this.countInterval2();

    this.drawProgressbg3();
    this.countInterval3();

    var pingceapi = this.pingceApi;
    pingceapi.indexinfo({
      id: this.params.id
    }).then( (info) => {

      console.log(info.yidong + "啦啦啦")

      this.info=info;
      this.yd= parseFloat(info.yidong).toFixed(1);
      this.zq= parseFloat(info.zhunque).toFixed(1);
      this.sy= parseFloat(info.shiyon).toFixed(1)

    });


    pingceapi.mypingcelist({}).then((mypingcelist) => {
      this.mypingcelist=mypingcelist;
    })


  }


  drawProgressbg() {
    //todo
    // 使用 wx.createContext 获取绘图上下文 context
    // var ctx = wx.createCanvasContext('canvasProgressbg')

    // console.log("滴滴滴滴");
    // console.log(ctx);
    // console.log("滴滴滴滴");

    // ctx.setLineWidth(6); // 设置圆环的宽度
    // ctx.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    // ctx.setLineCap('stroke') // 设置圆环端点的形状
    // ctx.beginPath(); //开始一个新的路径
    // ctx.arc(45, 45, 35, 0, 2 * Math.PI, false);
    // //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    // ctx.stroke(); //对当前路径进行描边
    // ctx.draw();
  }

  drawCircle(step) {
    //todo
    // var context = wx.createCanvasContext('canvasProgress');
    // // 设置渐变
    // var gradient = context.createLinearGradient(200, 100, 100, 200);
    // gradient.addColorStop("0.1", "#C0D0FF");
    // gradient.addColorStop("0.5", "#5F52A0");
    // gradient.addColorStop("1.0", "#C0D0FF");

    // context.setLineWidth(6);
    // context.setStrokeStyle(gradient);
    // context.setLineCap('stroke')
    // context.beginPath();

    // // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    // context.arc(45, 45, 35, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    // context.stroke();
    // context.draw()
  }
  data={count:0,count2:0,count3:0};
  countInterval() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var pingceapi = this.pingceApi;
    pingceapi.indexinfo({
      id: this.params.id
    }).then((info) => {

      var zq = parseFloat(info.zhunque);

      console.log(zq + "共和国")
      var jindu = (zq / 5) * 60;
      console.log(jindu + "巅峰");

      this.countTimer = setInterval(() => {
        if (this.data.count <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle(this.data.count / (60 / 2))
          this.data.count++;
        } else {
          clearInterval(this.countTimer);
        }
      }, 10)


    });
  }

  drawProgressbg2() {
    //todo
    // console.log("顶1");
    // // 使用 wx.createContext 获取绘图上下文 context
    // var ctx2 = wx.createCanvasContext('canvasProgressbg2')

    // console.log("顶1");
    // console.log(ctx2);
    // console.log("顶1");

    // ctx2.setLineWidth(6); // 设置圆环的宽度
    // ctx2.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    // ctx2.setLineCap('stroke') // 设置圆环端点的形状
    // ctx2.beginPath(); //开始一个新的路径
    // ctx2.arc(45, 45, 35, 0, 2 * Math.PI, false);
    // //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    // ctx2.stroke(); //对当前路径进行描边
    // ctx2.draw();
  }

  drawCircle2(step2) {
    //todo
    // var context2 = wx.createCanvasContext('canvasProgress2');
    // // 设置渐变
    // var gradient2 = context2.createLinearGradient(200, 100, 100, 200);
    // gradient2.addColorStop("0.1", "#C0D0FF");
    // gradient2.addColorStop("0.5", "#5F52A0");
    // gradient2.addColorStop("1.0", "#C0D0FF");

    // context2.setLineWidth(6);
    // context2.setStrokeStyle(gradient2);
    // context2.setLineCap('stroke')
    // context2.beginPath();

    // // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    // context2.arc(45, 45, 35, -Math.PI / 2, step2 * Math.PI - Math.PI / 2, false);
    // context2.stroke();
    // context2.draw()
  }

  countInterval2() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var pingceapi = this.pingceApi;
    pingceapi.indexinfo({
      id: this.params.id
    }).then( (info) => {

      var sy = parseFloat(info.shiyon);

      console.log(sy + "共和国")
      var jindu = (sy / 5) * 60;
      console.log(jindu + "巅峰");

      this.countTimer2 = setInterval(() => {
        if (this.data.count2 <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle2(this.data.count2 / (60 / 2))
          this.data.count2++;
        } else {
          clearInterval(this.countTimer2);
        }
      }, 10)


    });
  }


  drawProgressbg3() {
    //todo
    // console.log("顶1");
    // // 使用 wx.createContext 获取绘图上下文 context
    // var ctx3 = wx.createCanvasContext('canvasProgressbg3')

    // console.log("顶1");
    // console.log(ctx3);
    // console.log("顶1");

    // ctx3.setLineWidth(6); // 设置圆环的宽度
    // ctx3.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    // ctx3.setLineCap('stroke') // 设置圆环端点的形状
    // ctx3.beginPath(); //开始一个新的路径
    // ctx3.arc(45, 45, 35, 0, 2 * Math.PI, false);
    // //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    // ctx3.stroke(); //对当前路径进行描边
    // ctx3.draw();
  }

  drawCircle3(step3) {
    //todo
    // var context3 = wx.createCanvasContext('canvasProgress3');
    // // 设置渐变
    // var gradient3 = context3.createLinearGradient(200, 100, 100, 200);
    // gradient3.addColorStop("0.1", "#C0D0FF");
    // gradient3.addColorStop("0.5", "#5F52A0");
    // gradient3.addColorStop("1.0", "#C0D0FF");

    // context3.setLineWidth(6);
    // context3.setStrokeStyle(gradient3);
    // context3.setLineCap('stroke')
    // context3.beginPath();

    // // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    // context3.arc(45, 45, 35, -Math.PI / 2, step3 * Math.PI - Math.PI / 2, false);
    // context3.stroke();
    // context3.draw()
  }
  progress_txt="";
  countInterval3() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈

    var pingceapi = this.pingceApi;
    pingceapi.indexinfo({
      id: this.params.id
    }).then( (info) => {

      var yd = parseFloat(info.yidong);

      console.log(yd + "昆仑决")
      var jindu = (yd / 5) * 60;
      console.log(jindu + "法规");

      this.countTimer3 = setInterval(() => {
        if (this.data.count3 <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle3(this.data.count3 / (60 / 2))
          this.data.count3++;
        } else {
          this.progress_txt="匹配成功";
          clearInterval(this.countTimer3);
        }
      }, 10)


    });

  }


  checkclick(e) {
    var ck = e.target.dataset.ck;
    console.log(ck);
    if (ck == "nm") {
      this.check=false;
    } else {
      this.check=true;
    }
  }



  todati(e) {
    var id = e.target.id;
    //console.log(id+"所属");
    var pcid = e.target.dataset.pc_id;
    //console.log(pcid + "题目id");
    var pingceapi = this.pingceApi;
    var mypingcelist = this.mypingcelist;

    // if (mypingcelist.length == 0) {
    //   console.log("电风扇");
    // } else {

    var a = mypingcelist.filter((item, idx) => {
      return item.pingce_id == pcid && item.member_id == id
    })

    //console.log(a[0].id,"六六六");
    //return

    if (a.length > 0) {
      this.navigate("pingcedati",{id:this.params.id,upid:a[0].id});
      return;
    }

    else {
      console.log("先增再跳000000");
      var pingceapi = this.pingceApi;
      pingceapi.addpingce({
        member_id: id,
        pingce_id: pcid,
        status: "A",
        dati_status: "N"
      }).then( (addpingce) => {

        console.log(addpingce.return, "滴滴");
        this.navigate("pingcedati",{
          id:this.params.id,
          upid:addpingce.return
        });
      })
    }

  }

}
