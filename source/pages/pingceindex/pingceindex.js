// pages/pingceindex/pingceindex.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";
import {
  PingceApi
} from "../../apis/pingce.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      check: true,
      count: 0,
      countTimer: null
    });
  }
  onMyShow() {
    var that = this;

    this.drawProgressbg();
    // this.drawCircle(2) 
    this.countInterval()

    // var pingjiaapi = new PingjiaApi();

    // pingjiaapi.pingjialist({}, (pingjialist) => {
    //   this.Base.setMyData({
    //     pingjialist
    //   });
    // });

    // var i = 0
    // var dotAnData = wx.createAnimation({
    //   duration: 1000,
    //   transformOrigin: '4px 50px'
    // })
    // var dotAnFun;


    // dotAnData.rotate(360).step()
    // that.setData({
    //   dotAnData: dotAnData.export()
    // })

    var pingceapi = new PingceApi();
    console.log(this.Base.options.id)
    pingceapi.indexinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });
    });

  }


  drawProgressbg() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(6); // 设置圆环的宽度
    ctx.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    ctx.setLineCap('stroke') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(50, 50, 40, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  }

  drawCircle(step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0.1", "#C0D0FF");
    gradient.addColorStop("0.5", "#5F52A0");
    gradient.addColorStop("1.0", "#C0D0FF");

    context.setLineWidth(6);
    context.setStrokeStyle(gradient);
    context.setLineCap('stroke')
    context.beginPath();
    
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(50, 50, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  }




  countInterval() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 30) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / (60 / 2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "匹配成功"
        });
        clearInterval(this.countTimer);
      }
    }, 10)
  }




  check(e) {
    var ck = e.currentTarget.dataset.ck;
    console.log(ck);
    if (ck == "nm") {
      this.Base.setMyData({
        check: false
      })
    } else {
      this.Base.setMyData({
        check: true
      })
    }
  }



  todati(e) {
    wx.navigateTo({
      url: '/pages/pingcedati/pingcedati?id=' + this.Base.options.id
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.todati = content.todati;
body.drawProgressbg = content.drawProgressbg;
body.drawCircle = content.drawCircle; 
body.countInterval = content.countInterval;
Page(body)