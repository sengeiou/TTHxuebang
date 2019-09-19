import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PintuanhaibaoPage } from './pintuanhaibao.page';

const routes: Routes = [
  {
    path: '',
    component: PintuanhaibaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PintuanhaibaoPage]
})
export class PintuanhaibaoPageModule {}
