import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { XuanzedizhiPage } from './xuanzedizhi.page';

const routes: Routes = [
  {
    path: '',
    component: XuanzedizhiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [XuanzedizhiPage]
})
export class XuanzedizhiPageModule {}
