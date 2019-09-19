import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PingjiawanchenPage } from './pingjiawanchen.page';

const routes: Routes = [
  {
    path: '',
    component: PingjiawanchenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PingjiawanchenPage]
})
export class PingjiawanchenPageModule {}
