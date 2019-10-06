import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { YaoqinhaibaoPage } from './yaoqinhaibao.page';

const routes: Routes = [
  {
    path: '',
    component: YaoqinhaibaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ] ,  declarations: [YaoqinhaibaoPage]
})
export class YaoqinhaibaoPageModule {}
