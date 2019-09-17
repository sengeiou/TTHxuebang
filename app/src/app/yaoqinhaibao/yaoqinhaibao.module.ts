import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { YaoqinhaibaoPage } from './yaoqinhaibao.page';

const routes: Routes = [
  {
    path: '',
    component: YaoqinhaibaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YaoqinhaibaoPage]
})
export class YaoqinhaibaoPageModule {}
