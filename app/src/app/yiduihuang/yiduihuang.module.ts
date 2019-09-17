import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { YiduihuangPage } from './yiduihuang.page';

const routes: Routes = [
  {
    path: '',
    component: YiduihuangPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YiduihuangPage]
})
export class YiduihuangPageModule {}
