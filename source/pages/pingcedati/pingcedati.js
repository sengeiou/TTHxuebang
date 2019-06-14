// pages/pingcedati/pingcedati.js
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
  PingceApi
} from "../../apis/pingce.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      check: "",
      sx: 0,
      pingce: []
    });
  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      gif:false
    });

    var pingceapi = new PingceApi();

    pingceapi.pingcelist({ pingceindex_id:this.Base.options.id}, (pingcelist) => {
      this.Base.setMyData({
        pingcelist
      });
    });

  }

  bindcheck(e) {

    var id = e.currentTarget.id;
    var sx = e.currentTarget.dataset.sx;
    var pingcelist = this.Base.getMyData().pingcelist;
    pingcelist[sx].check = id;
 
    this.Base.setMyData({
      pingcelist: pingcelist, ck: parseInt(sx)
    })

  }



  next(e) {
    var id = e.currentTarget.id; 
    console.log(id+"谷歌");
    var ck = this.Base.getMyData().ck;
    console.log(ck + "苹果");

    if (ck != id){ 
      wx.showToast({
        title: '请选择选项',
        icon: 'none'
      })
      return;
    }
 

    var check = this.Base.getMyData().check;
 
    var idx = parseInt(id) + 1;
    var pingce = this.Base.getMyData().pingce;
    pingce.push([parseInt(id) + 1, check]);
    this.Base.setMyData({
      sx: idx
    })
  }


  last(e) {
    var ck = this.Base.getMyData().ck;
    var aa = ck + 1;

    this.Base.setMyData({ ck: aa - 1 })

    var id = this.Base.getMyData().sx;
    var idx = parseInt(id) - 1;
    this.Base.setMyData({
      sx: idx
    })
  }






  tijiao() {

    var pingcelist = this.Base.getMyData().pingcelist;
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    for (var i = 0; i < pingcelist.length; i++) {
      if (pingcelist[i].check == 'A') {
        a++;
      }


      if (pingcelist[i].check == 'B') {
        b++;
      }

      if (pingcelist[i].check == 'C') {
        c++;
      }

      if (pingcelist[i].check == 'D') {
        d++;
      }

      // console.log(a,b,c,d)

    }
    console.log(a, b, c, d)
    var numbers = [a, b, c, d];
    // var max = arr[i];

    var maxInNumbers = Math.max.apply(Math, numbers);

    // for (var i = 1; i < arr.length; i++) {
    //  var max = arr[i]; 
    // }
    var type=[];
    console.log(maxInNumbers);
    if (a == maxInNumbers) {
      console.log("乐观")
      var typeA= "A" 
    }
    if (b == maxInNumbers) {
      console.log("悲观") 
      var typeB = "B"
    }
    if (c == maxInNumbers) {
      console.log("积极") 
      var typeC = "C"
    }
    if (d == maxInNumbers) {
      console.log("消极") 
      var typeD = "D"
    }
    console.log(typeA, typeB, typeC, typeD)

    this.Base.setMyData({gif:true});
   
   setTimeout(()=>{

     wx.navigateTo({
       url: '/pages/pingcejieguo/pingcejieguo?typeA=' + typeA + '&typeB=' + typeB + '&typeC=' + typeC + '&typeD=' + typeD
     })

   },800)
  

  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
body.last = content.last;
body.next = content.next;
body.tijiao = content.tijiao;
Page(body)