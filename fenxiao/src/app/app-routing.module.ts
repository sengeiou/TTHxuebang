import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'ketangdetails', loadChildren: './ketangdetails/ketangdetails.module#KetangdetailsPageModule' },
  { path: 'shipingoumai', loadChildren: './shipingoumai/shipingoumai.module#ShipingoumaiPageModule' },
  { path: 'videopurcsucc', loadChildren: './videopurcsucc/videopurcsucc.module#VideopurcsuccPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'problem', loadChildren: './problem/problem.module#ProblemPageModule' },
  { path: 'ketan', loadChildren: './ketan/ketan.module#KetanPageModule' },
  { path: 'ketaninfo', loadChildren: './ketaninfo/ketaninfo.module#KetaninfoPageModule' },  { path: 'wxauthlogin', loadChildren: './wxauthlogin/wxauthlogin.module#WxauthloginPageModule' },
  { path: 'zaixianketan', loadChildren: './zaixianketan/zaixianketan.module#ZaixianketanPageModule' },
  { path: 'kechen', loadChildren: './kechen/kechen.module#KechenPageModule' },
  { path: 'kcinfo', loadChildren: './kcinfo/kcinfo.module#KcinfoPageModule' },
  { path: 'searchword', loadChildren: './searchword/searchword.module#SearchwordPageModule' },
  { path: 'generate', loadChildren: './generate/generate.module#GeneratePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'kchaibao', loadChildren: './kchaibao/kchaibao.module#KchaibaoPageModule' },
  { path: 'zxkthaibao', loadChildren: './zxkthaibao/zxkthaibao.module#ZxkthaibaoPageModule' },
  { path: 'yindao', loadChildren: './yindao/yindao.module#YindaoPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule' },
  { path: 'tuiguanguize', loadChildren: './tuiguanguize/tuiguanguize.module#TuiguanguizePageModule' },
  { path: 'tuiguandindan', loadChildren: './tuiguandindan/tuiguandindan.module#TuiguandindanPageModule' },
  { path: 'mykehu', loadChildren: './mykehu/mykehu.module#MykehuPageModule' },
  { path: 'kehuinfo', loadChildren: './kehuinfo/kehuinfo.module#KehuinfoPageModule' },
  { path: 'tixian', loadChildren: './tixian/tixian.module#TixianPageModule' },
  { path: 'mingxi', loadChildren: './mingxi/mingxi.module#MingxiPageModule' },
  { path: 'mycollect', loadChildren: './mycollect/mycollect.module#MycollectPageModule' },
  { path: 'content', loadChildren: './content/content.module#ContentPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
