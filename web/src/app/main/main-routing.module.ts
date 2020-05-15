import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ListComponent } from '../list/list.component';
import { DetailComponent } from '../detail/detail.component';
import { SettingComponent } from '../setting/setting.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UploadComponent } from '../upload/upload.component';
import { InfoboxComponent } from '../infobox/infobox.component';
import { SearchComponent } from '../search/search.component';
import { JigouComponent } from '../jigou/jigou.component';
import { KechenComponent } from '../kechen/kechen.component';
import { AddjigouComponent } from '../addjigou/addjigou.component';
import { AddkechenComponent } from '../addkechen/addkechen.component';
import { CopykechenComponent } from '../copykechen/copykechen.component';
import { OrderComponent } from '../order/order.component';
import { HexiaoComponent } from '../hexiao/hexiao.component';
import { OrderdetailComponent } from '../orderdetail/orderdetail.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // { path: "", component: DashboardComponent },
      { path: "", component: JigouComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "list", component: ListComponent },
      { path: "detail", component: DetailComponent },
      { path: "setting", component: SettingComponent },
      { path: "upload", component: UploadComponent },
      { path: "404", component: NotfoundComponent },
      { path: "infobox", component: InfoboxComponent },
      { path: "search", component: SearchComponent },
      { path: "infobox", component: InfoboxComponent },
      { path: "jigou", component: JigouComponent },
      { path: "kechen", component: KechenComponent },
      { path: "addjigou", component: AddjigouComponent },
      { path: "addkechen", component: AddkechenComponent },
      { path: "copykechen", component: CopykechenComponent },
      { path: "order", component: OrderComponent },
      { path: "hexiao", component: HexiaoComponent },
      { path: "orderdetail", component: OrderdetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
