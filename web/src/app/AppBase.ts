import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit, ElementRef,EventEmitter } from '@angular/core';
import { InstApi } from '../providers/inst.api';
import { UserbApi } from '../providers/userb.api';
import {Buffer} from 'buffer';

declare let Chart: any;

export class AppBase implements OnInit {

    public right="ABC";
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal = false;

    isLoginPage = false;

    public static StaticMemberInfo=null;

    //public devicename="";

    public static devicename = "";
    public static Lang = null;
    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static Current: AppBase = null;
    public static myapp: AppComponent = null;
    public static UNICODE = "tthxb";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public localpath: string = ApiConfig.getLocalPath();
    public uploadapi: string = ApiConfig.getFileUploadAPI();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name: "", tel: '', logo: '' ,version:'',copyright:'',agreement:"",kefuerweima:"",agreementfile:"" ,yufukuan:''};


    public options = null;
    public params: Params = null;


    public memberinfo = null;

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }

    position = ''
    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi: InstApi,
        public userbApi: UserbApi,
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];

        this.memberinfo=JSON.parse( window.sessionStorage.getItem("memberinfo"));
    }


    setStatusBar() {
        //  this.statusBar.styleLightContent();
        console.log('123123')
    }
    ngOnInit() {
        console.log('456456')
        this.bfscrolltop = document.body.scrollTop;
        ApiConfig.SetUnicode(AppBase.UNICODE);


        this.CheckPermission();
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();


    }
    CheckPermission() {
        if (this.isLoginPage == false) {
            var token = window.sessionStorage.getItem("token");

            console.log("token", '--', token);

            if (token == null) {
                this.navigate("login");
            } else {
                ApiConfig.SetToken(token);
                this.userbApi.userinfo({}).then((info: any) => {
                    console.log(info)
                    if (info != null && info.kehumanpower!="") {
                        window.sessionStorage.setItem("memberinfo",JSON.stringify(info));
                        
                        if(this.memberinfo==null){
                            this.memberinfo=info;
                        }
                    } else {
                        this.navigate("login");
                    }

                })
            }
        }
    }
    checktime() {
        if (this.isLoginPage == true) {
            let nowtime = (new Date()).getTime();
            let oldtime = window.localStorage.getItem("oldtime");

            if (nowtime > Number(oldtime)) {
                // var al = alert("长时间不操作，请重新登录！")
                // this.navigate('/login');
            }
        }


    }
   
    onMyLoad() {


    }

    lang: any = {};

    langcode = "ch";

    getInstInfo() {

        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo: any) => {
                AppBase.StaticInstInfo = instinfo;
                instinfo.agreement=this.util.HtmlDecode(instinfo.agreement);
                this.InstInfo = instinfo;
                
                console.log(instinfo, 'inst');
                this.instLoaded();
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
            this.instLoaded();
        }
    }

    instLoaded(){

    }

    getMemberInfo() {

    }
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit() {

        this.onMyShow();
    }

    onMyShow() {

    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    back() {
        window.history.back();
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
    logout() {
        this.navigate("/login")
        window.sessionStorage.removeItem("token");
        window.localStorage.removeItem("token");
    }



    showAlert(content, title = "提示") {


    }

    changedate(page) {
        if (page < 1 || page > this.pages) return;

        if (page > 2) {
            var newpageList = [];
            for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        this.selPage = page;
        this.setData();
        this.isActivePage(page);
    }
    isActivePage(page) {
        return this.selPage == page;
    }

    Previous() {
        this.changedate(this.selPage - 1);
    }

    Next() {
        this.changedate(this.selPage + 1);
    }
    pageSize = 10;
    pages = null;
    newPage = null;
    selPage = null;
    data = null;
    pageList = [];
    setData = null;
    pagination(list, length) {

        this.pages = Math.ceil(length / this.pageSize);
        this.newPage = this.pages > 5 ? 5: this.pages;
        this.selPage = 1;

        this.setData = function () {
            this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
        }
        this.data = list.slice(0, this.pageSize);


        for (var i = 0; i < this.newPage; i++) {
            this.pageList.push(i + 1);
        }

    }

    querySelector(str) {
        return document.querySelector(str);
    }
    upload(key,module,callback){
      Chart.upload(ApiConfig.getFileUploadAPI(),key,module,callback);
    }

    checkMailFormat(email){
        //^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
			return true;
		}else{
			return false;
		}
    }

    base64encode(str){
        return new Buffer(str).toString("base64");
    }
    base64decode(str){

        return new Buffer(str,'base64').toString()
    }
    warning(title,body){
        Chart.warning("警告",title,body);
    }
    toast(com){
        Chart.toast(com);
    }
    saveing(){
        Chart.saveing();
    }
    hidemodel(){
        Chart.hidemodel();
    }
    succ(con){
        Chart.succ(con);
    }
}
