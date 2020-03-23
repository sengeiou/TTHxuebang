import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'forcopy', loadChildren: './forcopy/forcopy.module#ForcopyPageModule' },
  { path: 'ketangdetails', loadChildren: './ketangdetails/ketangdetails.module#KetangdetailsPageModule' },
  { path: 'shipingoumai', loadChildren: './shipingoumai/shipingoumai.module#ShipingoumaiPageModule' },
  { path: 'videopurcsucc', loadChildren: './videopurcsucc/videopurcsucc.module#VideopurcsuccPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'ketaninfo', loadChildren: './ketaninfo/ketaninfo.module#KetaninfoPageModule' },
  { path: 'addmechanism', loadChildren: './addmechanism/addmechanism.module#AddmechanismPageModule' },
  { path: 'addressmanage', loadChildren: './addressmanage/addressmanage.module#AddressmanagePageModule' },
  { path: 'baoma', loadChildren: './baoma/baoma.module#BaomaPageModule' },
  { path: 'baomainfo', loadChildren: './baomainfo/baomainfo.module#BaomainfoPageModule' },
  { path: 'baomin', loadChildren: './baomin/baomin.module#BaominPageModule' },
  { path: 'city', loadChildren: './city/city.module#CityPageModule' },
  { path: 'content', loadChildren: './content/content.module#ContentPageModule' },
  { path: 'exchangesuccess', loadChildren: './exchangesuccess/exchangesuccess.module#ExchangesuccessPageModule' },
  { path: 'groupinfo', loadChildren: './groupinfo/groupinfo.module#GroupinfoPageModule' },
  { path: 'hexiao', loadChildren: './hexiao/hexiao.module#HexiaoPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'huiyuanfuwu', loadChildren: './huiyuanfuwu/huiyuanfuwu.module#HuiyuanfuwuPageModule' },
  { path: 'huodoninfo', loadChildren: './huodoninfo/huodoninfo.module#HuodoninfoPageModule' },
  { path: 'jgdetails', loadChildren: './jgdetails/jgdetails.module#JgdetailsPageModule' },
  { path: 'jiaoyixinxi', loadChildren: './jiaoyixinxi/jiaoyixinxi.module#JiaoyixinxiPageModule' },
  { path: 'jiemuxianqin', loadChildren: './jiemuxianqin/jiemuxianqin.module#JiemuxianqinPageModule' },
  { path: 'jifenorder', loadChildren: './jifenorder/jifenorder.module#JifenorderPageModule' },
  { path: 'jifenorderinfo', loadChildren: './jifenorderinfo/jifenorderinfo.module#JifenorderinfoPageModule' },
  { path: 'jifenshouzhi', loadChildren: './jifenshouzhi/jifenshouzhi.module#JifenshouzhiPageModule' },
  { path: 'kcdetails', loadChildren: './kcdetails/kcdetails.module#KcdetailsPageModule' },
  { path: 'kcyaoqin', loadChildren: './kcyaoqin/kcyaoqin.module#KcyaoqinPageModule' },
  { path: 'kehuinfo', loadChildren: './kehuinfo/kehuinfo.module#KehuinfoPageModule' },
  { path: 'ketan', loadChildren: './ketan/ketan.module#KetanPageModule' },
  { path: 'lianxikefu', loadChildren: './lianxikefu/lianxikefu.module#LianxikefuPageModule' },
  { path: 'liucheng', loadChildren: './liucheng/liucheng.module#LiuchengPageModule' },
  { path: 'maintain', loadChildren: './maintain/maintain.module#MaintainPageModule' },
  { path: 'messageinfo', loadChildren: './messageinfo/messageinfo.module#MessageinfoPageModule' },
  { path: 'mine', loadChildren: './mine/mine.module#MinePageModule' },
  { path: 'mingxi', loadChildren: './mingxi/mingxi.module#MingxiPageModule' },
  { path: 'mycollect', loadChildren: './mycollect/mycollect.module#MycollectPageModule' },
  { path: 'myinvite', loadChildren: './myinvite/myinvite.module#MyinvitePageModule' },
  { path: 'mykehu', loadChildren: './mykehu/mykehu.module#MykehuPageModule' },
  { path: 'mymessage', loadChildren: './mymessage/mymessage.module#MymessagePageModule' },
  { path: 'myorder', loadChildren: './myorder/myorder.module#MyorderPageModule' },
  { path: 'mypingce', loadChildren: './mypingce/mypingce.module#MypingcePageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'personaldata', loadChildren: './personaldata/personaldata.module#PersonaldataPageModule' },
  { path: 'pingcedati', loadChildren: './pingcedati/pingcedati.module#PingcedatiPageModule' },
  { path: 'pingceindex', loadChildren: './pingceindex/pingceindex.module#PingceindexPageModule' },
  { path: 'pingcejieguo', loadChildren: './pingcejieguo/pingcejieguo.module#PingcejieguoPageModule' },
  { path: 'pingjia', loadChildren: './pingjia/pingjia.module#PingjiaPageModule' },
  { path: 'pingjialist', loadChildren: './pingjialist/pingjialist.module#PingjialistPageModule' },
  { path: 'pingjiawanchen', loadChildren: './pingjiawanchen/pingjiawanchen.module#PingjiawanchenPageModule' },
  { path: 'pintuan', loadChildren: './pintuan/pintuan.module#PintuanPageModule' },
  { path: 'pintuanhaibao', loadChildren: './pintuanhaibao/pintuanhaibao.module#PintuanhaibaoPageModule' },
  { path: 'problem', loadChildren: './problem/problem.module#ProblemPageModule' },
  { path: 'promotion', loadChildren: './promotion/promotion.module#PromotionPageModule' },
  { path: 'purchase', loadChildren: './purchase/purchase.module#PurchasePageModule' },
  { path: 'review', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'searchword', loadChildren: './searchword/searchword.module#SearchwordPageModule' },
  { path: 'seek', loadChildren: './seek/seek.module#SeekPageModule' },
  { path: 'shopmall', loadChildren: './shopmall/shopmall.module#ShopmallPageModule' },
  { path: 'shopmalldetail', loadChildren: './shopmalldetail/shopmalldetail.module#ShopmalldetailPageModule' },
  { path: 'studentinfo', loadChildren: './studentinfo/studentinfo.module#StudentinfoPageModule' },
  { path: 'studentmsg', loadChildren: './studentmsg/studentmsg.module#StudentmsgPageModule' },
  { path: 'teacher', loadChildren: './teacher/teacher.module#TeacherPageModule' },
  { path: 'tiaokuan', loadChildren: './tiaokuan/tiaokuan.module#TiaokuanPageModule' },
  { path: 'tixian', loadChildren: './tixian/tixian.module#TixianPageModule' },
  { path: 'tuiguandindan', loadChildren: './tuiguandindan/tuiguandindan.module#TuiguandindanPageModule' },
  { path: 'tuiguanguize', loadChildren: './tuiguanguize/tuiguanguize.module#TuiguanguizePageModule' },
  { path: 'tuiguanxiaoxi', loadChildren: './tuiguanxiaoxi/tuiguanxiaoxi.module#TuiguanxiaoxiPageModule' },
  { path: 'tuikuan', loadChildren: './tuikuan/tuikuan.module#TuikuanPageModule' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' },
  { path: 'wuliu', loadChildren: './wuliu/wuliu.module#WuliuPageModule' },
  { path: 'xianxia', loadChildren: './xianxia/xianxia.module#XianxiaPageModule' },
  { path: 'xiton', loadChildren: './xiton/xiton.module#XitonPageModule' },
  { path: 'xuanzedizhi', loadChildren: './xuanzedizhi/xuanzedizhi.module#XuanzedizhiPageModule' },
  { path: 'xuebang', loadChildren: './xuebang/xuebang.module#XuebangPageModule' },
  { path: 'yaoqinhaibao', loadChildren: './yaoqinhaibao/yaoqinhaibao.module#YaoqinhaibaoPageModule' },
  { path: 'yiduihuang', loadChildren: './yiduihuang/yiduihuang.module#YiduihuangPageModule' },
  { path: 'zaixianketang', loadChildren: './zaixianketang/zaixianketang.module#ZaixianketangPageModule' },
  { path: 'jiaoyixinxi', loadChildren: './jiaoyixinxi/jiaoyixinxi.module#JiaoyixinxiPageModule' },
  { path: 'jifenorder', loadChildren: './jifenorder/jifenorder.module#JifenorderPageModule' },
  { path: 'jifenshouzhi', loadChildren: './jifenshouzhi/jifenshouzhi.module#JifenshouzhiPageModule' },
  { path: 'kehuinfo', loadChildren: './kehuinfo/kehuinfo.module#KehuinfoPageModule' },
  { path: 'lianxikefu', loadChildren: './lianxikefu/lianxikefu.module#LianxikefuPageModule' },
  { path: 'messageinfo', loadChildren: './messageinfo/messageinfo.module#MessageinfoPageModule' },
  { path: 'mycollect', loadChildren: './mycollect/mycollect.module#MycollectPageModule' },
  { path: 'mykehu', loadChildren: './mykehu/mykehu.module#MykehuPageModule' },
  { path: 'myorder', loadChildren: './myorder/myorder.module#MyorderPageModule' },
  { path: 'mypingce', loadChildren: './mypingce/mypingce.module#MypingcePageModule' },
  { path: 'pingcedati', loadChildren: './pingcedati/pingcedati.module#PingcedatiPageModule' },
  { path: 'pingjiawanchen', loadChildren: './pingjiawanchen/pingjiawanchen.module#PingjiawanchenPageModule' },
  { path: 'pintuan', loadChildren: './pintuan/pintuan.module#PintuanPageModule' },
  { path: 'purchase', loadChildren: './purchase/purchase.module#PurchasePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
