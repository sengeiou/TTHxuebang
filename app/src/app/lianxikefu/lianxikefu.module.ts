import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LianxikefuPage } from './lianxikefu.page';

const routes: Routes = [
  {
    path: '',
    component: LianxikefuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LianxikefuPage]
})
export class LianxikefuPageModule {}
