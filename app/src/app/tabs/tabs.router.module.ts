import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'baoma',
        children: [
          {
            path: '',
            loadChildren: '../baoma/baoma.module#BaomaPageModule'
          }
        ]
      },
      {
        path: 'teacher',
        children: [
          {
            path: '',
            loadChildren: '../teacher/teacher.module#TeacherPageModule'
          }
        ]
      },
      {
        path: 'xianxia',
        children: [
          {
            path: '',
            loadChildren: '../xianxia/xianxia.module#XianxiaPageModule'
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: '../mine/mine.module#MinePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
