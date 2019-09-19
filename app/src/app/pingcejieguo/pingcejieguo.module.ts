import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PingcejieguoPage } from './pingcejieguo.page';

const routes: Routes = [
  {
    path: '',
    component: PingcejieguoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PingcejieguoPage]
})
export class PingcejieguoPageModule {}
