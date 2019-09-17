import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { MemberApi } from "../providers/member.api";
import { WechatApi } from "../providers/wechat.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

declare let wx: any;

export class AppBase implements OnInit {
    public needlogin = false;

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    public static memberapi: MemberApi = null;
    public static wechatApi: WechatApi = null;
    public static UNICODE = "tthxb";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static InstInfo = null;
    public static MemberInfo=null;
    public InstInfo = {h5sharelogo:"",h5sharetitle:"",h5sharedesc:"",tel:"", h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "", memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "" };
    public MemberInfo = { avatarUrl: "", nickName: "",h5openid:"",unionid:"" };
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public keyt="memberinfo99";
    public stat="stat9";

    public heading="学榜";

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;

    static Current = null;
    currentpage = "";

    static STATICRAND="";


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute) {

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];
        var stat=window.sessionStorage.getItem(this.stat);
        if(stat==null){
            stat=parseInt((Math.random()*99999.9).toString()).toString();
            window.sessionStorage.setItem(this.stat,stat);
        }
        AppBase.STATICRAND=stat;

        var memberinfo=window.localStorage.getItem(this.keyt);
        
        if(memberinfo!=null){
            AppBase.MemberInfo=JSON.parse(memberinfo);
        }
        console.log("rdw",AppBase.MemberInfo);
    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {

        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();
    }
    onMyLoad() {
    }
    getInstInfo() {
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((instinfo) => {
                AppBase.InstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
                console.log("aaabbbccc",AppBase.STATICRAND);
                if(this.params.code!=undefined&&this.params.state==AppBase.STATICRAND){

                }else{
                    if(AppBase.MemberInfo==null){
                        var url=window.location.href;
                        //url="http://yuyue.helpfooter.com/tabs/tab1";
                        var redirecturl=encodeURIComponent(url);
                        var redurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.InstInfo.h5appid + "&redirect_uri="+redirecturl+"&response_type=code&scope=snsapi_userinfo&state="+AppBase.STATICRAND+"#wechat_redirect";
                        console.log({redurl});
                        //window.location.href=redurl;
                    }
                }
                this.setWechatShare();
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
            this.setWechatShare();
        }
    }
    getMemberInfo() {

        AppBase.memberapi.info({}).then((memberinfo) => {
            if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {
                //alert("?");
                memberinfo = null;
            }
            this.MemberInfo = memberinfo;

        });
    }
    shouye(){
        
  

 
    this.navigate("/tabs/tab1");
 
   

    }
    getResources() {
        if (AppBase.Resources == null) {
            AppBase.instapi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }
    ionViewDidEnter() {
        console.log("aaabbbccc",AppBase.STATICRAND);
        if(AppBase.MemberInfo==null){
            //
            
            console.log("aaabbbccc",this.params.code);
            console.log("aaabbbccc",this.params.code!=undefined&&this.params.state==AppBase.STATICRAND);
            console.log("aaabbbccc",this.params.state);
            if(this.params.code!=undefined&&this.params.state==AppBase.STATICRAND){
                AppBase.memberapi.getuserinfo({h5:"Y",code:this.params.code,grant_type:"authorization_code"}).then((memberinfo)=>{
                    memberinfo.h5openid=memberinfo.openid;
                    AppBase.MemberInfo=memberinfo;
                    this.MemberInfo=memberinfo;

                    window.localStorage.setItem(this.keyt,JSON.stringify(this.MemberInfo));
                    
                    ApiConfig.SetToken(memberinfo.h5openid);
                    ApiConfig.SetTokenKey(memberinfo.unionid);
                     AppBase.memberapi.updateh5(memberinfo).then((res)=>{
                        // this.onMyShow();
                     });
                    //window.location.href="/tabs/tab1";
                });
            }else{
                
                //alert(1);
                //alert("看到这个就是逻辑出大问题了");
                this.onMyShow();
            }
        }else{
            //alert("2"+this.MemberInfo.h5openid);
            this.MemberInfo=AppBase.MemberInfo;
            console.log("aaaa",this.MemberInfo);
            ApiConfig.SetToken(this.MemberInfo.h5openid);
            ApiConfig.SetTokenKey(this.MemberInfo.unionid);

            

            this.onMyShow();
        }
        

    }

    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    isbacking = false;
    back() {
        if (this.isbacking == true) {
            return;
        }
        this.isbacking = true;
        //alert(this.Params.fromtab);
        if(history.length<2){
            this.navCtrl.navigateBack('tabs/tab1' );
            return;
        }
        if (this.params.fromtab != undefined) {
            this.navCtrl.navigateBack('tabs/' + this.params.fromtab);
        } else {
            this.navCtrl.back();
        }
    }
    backToUrl(url) {
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}, checkLogin = false) {
        if (checkLogin == true) {
            if (this.MemberInfo == null) {
                this.navigate("mobilelogin");
                return;
            }
        }
        this.router.navigate([pagename], { queryParams: param });

    }
    async showModal(pageobj, param = {}, callback = null) {
        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data) => {
            if (callback != null) {
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content", { title, key });
        //this.showModal("ContentPage", { title, key });
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: ["知道了"]
        });
        alert.present();
    }
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "好的",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }
    async checkLogin(callback) {

    }

    async showActionSheet(actionSheetController, header, buttons) {
        const actionSheet = await actionSheetController.create({
            header: header,
            buttons: buttons
        });
        await actionSheet.present();
    }
    hasLogin() {
        return this.MemberInfo != null;
    }
    logout() {
        window.localStorage.removeItem("UserToken");
        this.MemberInfo = null;
    }
    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }

    splitRow(content) {
        return content.split("\n");
    }

    getMemberPhoto(photo: string) {
        if (photo == null || photo == undefined || photo.trim() == "") {
            return this.uploadpath + "inst/" + this.InstInfo.logo;
        } else {
            return this.uploadpath + "member/" + photo;
        }
    }

    logScrollStart() {
        console.log("logScrollStart");
    }
    logScrolling(e) {
        console.log(e);
        this.scrolltop = e.detail.scrollTop;
    }
    logScrollEnd() {
        console.log("logScrollEnd");
    }
    gotoDiv(id) {
        var target = document.querySelector('#' + id);
        target.scrollIntoView();
    }

    tryLogin() {
        this.showModal("MobileloginPage", {});
    }


    setWechatShare(title=undefined,desc=undefined){
        if(title==undefined){
            title=this.InstInfo.h5sharetitle;
        }
        if(desc==undefined){
            desc=this.InstInfo.h5sharedesc;
        }
        AppBase.wechatApi.gensign({url:window.location.href}).then((config)=>{
            var json={
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.InstInfo.h5appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            wx.config(json);
            var that=this;
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc,
                        link: window.location.href,
                        imgUrl: that.uploadpath+"inst/"+ that.InstInfo.h5sharelogo,
                        trigger: function (res) {
                            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                            //alert('用户点击发送给朋友');
                        },
                        success: function (res) {
                            //alert('已分享');
                        },
                        cancel: function (res) {
                            //alert('已取消');
                        },
                        fail: function (res) {
                            //alert("onMenuShareAppMessage" + JSON.stringify(res));
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: title,
                        link: window.location.href,
                        imgUrl: that.uploadpath+"inst/"+ that.InstInfo.h5sharelogo,
                        trigger: function (res) {
                            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                            //alert('用户点击分享到朋友圈');
                        },
                        success: function (res) {
                            //alert('已分享');
                        },
                        cancel: function (res) {
                            //alert('已取消');
                        },
                        fail: function (res) {
                            // alert("onMenuShareTimeline" + JSON.stringify(res));
                        }
                    });
                
            });
        

    });
	}
}