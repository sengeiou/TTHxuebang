import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HuiyuanfuwuPage } from './huiyuanfuwu.page';

const routes: Routes = [
  {
    path: '',
    component: HuiyuanfuwuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HuiyuanfuwuPage]
})
export class HuiyuanfuwuPageModule {}
