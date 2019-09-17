import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KcyaoqinPage } from './kcyaoqin.page';

const routes: Routes = [
  {
    path: '',
    component: KcyaoqinPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KcyaoqinPage]
})
export class KcyaoqinPageModule {}
