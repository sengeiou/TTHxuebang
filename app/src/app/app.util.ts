import { ApiConfig } from './api.config';
import { AlertController, ToastController } from '@ionic/angular';

export class AppUtil {
    public static isMicroMessager: boolean = false; //是否是在微信内置浏览器打开.
    public static isLessThenAndroid5: boolean = false; //<= android 4.4
    public static isIOS: boolean = false; //是否是在Iphone设备, 不论是微信打开,还是APP.
    public static osVersion = '';

    public static HtmlDecode(str) {
        if (str == null) {
            return "";
        }
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        //s = s.replace(new RegExp("</p>", "gm"), "</p><br />");

        var reg = new RegExp("\"/alucard263096/zwgz/upload/", "g"); //创建正则RegExp对象   
        s = s.replace(reg, "\"http://cmsdev.app-link.org/alucard263096/zwgz/upload/");

        return s;
    }

    public static zhenze(str) {
        return (str.length == 11 && str[0] == "1")
    }

    public static FormatDateTime(date) {
        console.log("FormatDateTime" + date);
        var year = AppUtil.ten2(date.getFullYear());
        var month = AppUtil.ten2(date.getMonth() + 1);
        var datec = AppUtil.ten2(date.getDate());
        var hour = AppUtil.ten2(date.getHours());
        var minute = AppUtil.ten2(date.getMinutes());
        var second = AppUtil.ten2(date.getSeconds());

        var v = year + "-" + month + "-" + datec + " " + hour + ":" + minute + ":" + second;

        //console.log("FormatDateTime=" + v);
        return v;
    }

    public static ten2(i) {
        i = parseInt(i);
        if (i > 9) {
            return i.toString();
        } else {
            return "0" + i.toString();
        }
    }

    public static IsMobileNo(str) {
        console.log(str);
        if (str == null || str == undefined || str.length != 11) {
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    }
    public static FormatPercent(val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    }
    public static FormatPrice(val) {
        val = val * 1.0;
        return val.toFixed(2);
    }
    public static FormatNumber(val, digits) {
        val = val * 1.0;
        return val.toFixed(digits);
    }
    public static FormatDate(val) {
        return val.substr(0, 10);
    }
    public static TimeAgo(agoTime) {

        // 计算出当前日期时间到之前的日期时间的毫秒数，以便进行下一步的计算
        var time = (new Date()).getTime() / 1000 - agoTime;

        var num = 0;
        if (time >= 31104000) { // N年前
            num = parseInt((time / 31104000).toString());
            return num + '年前';
        }
        if (time >= 2592000) { // N月前
            num = parseInt((time / 2592000).toString());
            return num + '月前';
        }
        if (time >= 86400) { // N天前
            num = parseInt((time / 86400).toString());
            return num + '天前';
        }
        if (time >= 3600) { // N小时前
            num = parseInt((time / 3600).toString());
            return num + '小时前';
        }
        if (time > 60) { // N分钟前
            num = parseInt((time / 60).toString());
            return num + '分钟前';
        }
        return '1分钟前';
    }

    static GetLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

    static GetCurrentMonthFirst() {
        var date = new Date();
        var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
        return todate;
    }

    static GetDates(days, todate) {

        //todate默认参数是当前日期，可以传入对应时间
        var dateArry = [];
        var dateLater = AppUtil.DateLater;
        for (var i = 0; i < days; i++) {
            var dateObj = dateLater(todate, i);
            dateArry.push(dateObj)
        }
        return dateArry;
    }
    static Rad(d) {
        return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
    }
    static zuidijia(a, b, c, d) {
        var list = [];
        list.push(a, b, c, d);
        list = list.filter((item) => {
            return item > 0;
        })
        var min = Math.min.apply(null, list)
        console.log(list);
        console.log(min);
        console.log("hahdadhsadhasdhasdhas");


        return min.toFixed(2);

    }

    static GetNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var vmonty = "";
        var strDate = date.getDate();
        var vstrDate = "";
        if (month >= 1 && month <= 9) {
            vmonty = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            vstrDate = "0" + strDate;
        }
        var nowdate = year + seperator1 + vmonty + seperator1 + vstrDate;
        return nowdate;
    }

    //param：传入时间：dates: "2018-04-02", later: 往后多少天
    static DateLater(dates, later) {
        let dateObj = null;
        dateObj = {};
        let show_day = new Array('星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        let date = new Date(dates.replace(/-/g, '/'));
        console.log("hahahah");
        console.log(dates.replace(/-/g, '/'));
        date.setDate(date.getDate() + later);
        let day = date.getDay();
        dateObj.year = date.getFullYear();
        dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
        dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());

        dateObj.seven_date = dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
        dateObj.daka_date = dateObj.month + '/' + dateObj.day;

        dateObj.week = show_day[day];
        return dateObj;
    }
    static masaike(name) {

        console.log(12132);
        // return name.substring(0, 1) + '***';
        return name;

    }

    static shijianjisuan(date) {
        console.log(date);
        var jisuandate = new Date(date);
        var danqiandate = new Date();
        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
        console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
            , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");

        return dateDiff;

    }

    static GetDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = AppUtil.Rad(lat1);
        var radLat2 = AppUtil.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = AppUtil.Rad(lng1) - AppUtil.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137; // 地球半径，千米;
        s = Math.round(s * 10000) / 10000; //输出为公里
        s = Math.round(s * 1000) / 1; //单位修改为米,取整
        //s=s.toFixed(4);
        return s;
    }

    static GetMileTxt(mile) {
        console.log(mile);
        if (mile > 100000) {
            return "";
        }
        if (mile > 1000) {
            return + (mile / 1000.0).toFixed(0) + "km";
        } else if (mile < 100) {
            return "100米内";
        } else {
            return "" + (mile).toString() + "m";
        }
    }

    static Updatetime(str) {
        var timestamp = Date.parse(str);

        //返回当前时间毫秒数
        timestamp = timestamp / 1000;
        //获取当前时间
        var n = timestamp *
            1000;
        console.log(n, "啊啊啊")

        var date = new Date(n);


        console.log(date, "啊啊")
        //年
        var Y =
            date.getFullYear();

        //月
        var M = date.getMonth()
            + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

        return (Y + "年" + M + "月" + D + "日")
    }



}