import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JifenorderinfoPage } from './jifenorderinfo.page';

const routes: Routes = [
  {
    path: '',
    component: JifenorderinfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JifenorderinfoPage]
})
export class JifenorderinfoPageModule {}
