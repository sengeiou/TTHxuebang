import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TuiguanguizePage } from './tuiguanguize.page';

const routes: Routes = [
  {
    path: '',
    component: TuiguanguizePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TuiguanguizePage]
})
export class TuiguanguizePageModule {}
