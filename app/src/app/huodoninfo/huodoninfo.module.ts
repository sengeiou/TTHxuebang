import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HuodoninfoPage } from './huodoninfo.page';

const routes: Routes = [
  {
    path: '',
    component: HuodoninfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HuodoninfoPage]
})
export class HuodoninfoPageModule {}
