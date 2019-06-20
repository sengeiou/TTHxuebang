// pages/ceshi/ceshi.js 
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
  BaomaApi
} from "../../apis/baoma.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      newSignBtnState: false, //按钮签到状态
      continuityDays7: false, //连续7
      continuityDays3: false, //连续3 
      myToday: '', //周几
      newSignNum: 0, //签到天数
      newSignIntegral: 0,
      isNewSignedArr: [{
          "day": "日",
          "isSigned": false
        },
        {
          "day": "一",
          "isSigned": false
        },
        {
          "day": "二",
          "isSigned": false
        },
        {
          "day": "三",
          "isSigned": false
        },
        {
          "day": "四",
          "isSigned": false
        },
        {
          "day": "五",
          "isSigned": false
        },
        {
          "day": "六",
          "isSigned": false
        }
      ]
    })
  }

  onMyShow() {

    var that = this,
      myDate = new Date(),
      myToday = myDate.getDay(); //周几   0 1 2 3 4 5 6
    this.Base.setMyData({
      myToday: myToday
    })


  }

  signNewFn(e) {
    var that = this;
    const arr = [],
      newSignArr = [...arr, ...that.data.isNewSignedArr];
    newSignArr[that.data.myToday].isSigned = true;
    that.setData({
      isNewSignedArr: newSignArr
    })
    //console.log(that.data.isNewSignedArr);

    //签到积分函数
    that.signAddFen();
  }

  signAddFen(e) {
    var that = this,
      num = that.data.newSignNum,
      oneIsSigned = that.data.isNewSignedArr[1].isSigned,
      twoIsSigned = that.data.isNewSignedArr[2].isSigned,
      threeIsSigned = that.data.isNewSignedArr[3].isSigned,
      fourIsSigned = that.data.isNewSignedArr[4].isSigned,
      fiveIsSigned = that.data.isNewSignedArr[5].isSigned,
      sixIsSigned = that.data.isNewSignedArr[6].isSigned,
      sevenIsSigned = that.data.isNewSignedArr[0].isSigned;

    //当前积分
    num++;
    var curFen = that.data.newSignIntegral + 1;
    that.setData({
      //signInPop: true,
      newSignBtnState: true,
      newSignNum: num,
      newSignIntegral: curFen,
    })

    //签到后执行
    if (that.data.newSignBtnState) {
      // 周三 ： 一 二 三
      if (!fourIsSigned || !fiveIsSigned || !sixIsSigned || !sevenIsSigned) {
        if (oneIsSigned && twoIsSigned && threeIsSigned) {
          var fens = that.data.newSignIntegral + 3 - 1;
          that.setData({
            newSignIntegral: fens
          })
          //console.log(that.data.newSignIntegral);
        }
      }
      // 所有签了： 日 一 二 三 四 五 六
      if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && sevenIsSigned) {
        var fens = that.data.newSignIntegral + 7 - 1;
        that.setData({
          newSignIntegral: fens
        })
        //console.log( that.data.newSignIntegral);
      }
    }

    // 另外加分 周三+3 , 周日+7 黄色小框显示
    if (oneIsSigned && twoIsSigned && that.data.myToday == 3) {
      that.setData({
        continuityDays3: true
      })
    } else if (oneIsSigned && twoIsSigned && threeIsSigned && fourIsSigned && fiveIsSigned && sixIsSigned && that.data.myToday == 0) {
      that.setData({
        continuityDays7: true
      })
    }
  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.signNewFn = content.signNewFn;
body.signAddFen = content.signAddFen;
Page(body)