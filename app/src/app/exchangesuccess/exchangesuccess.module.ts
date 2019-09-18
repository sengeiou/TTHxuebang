import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExchangesuccessPage } from './exchangesuccess.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangesuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExchangesuccessPage]
})
export class ExchangesuccessPageModule {}
