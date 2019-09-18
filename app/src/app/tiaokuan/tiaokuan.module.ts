import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TiaokuanPage } from './tiaokuan.page';

const routes: Routes = [
  {
    path: '',
    component: TiaokuanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TiaokuanPage]
})
export class TiaokuanPageModule {}
