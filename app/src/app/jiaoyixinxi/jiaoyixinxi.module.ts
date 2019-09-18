import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JiaoyixinxiPage } from './jiaoyixinxi.page';

const routes: Routes = [
  {
    path: '',
    component: JiaoyixinxiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JiaoyixinxiPage]
})
export class JiaoyixinxiPageModule {}
