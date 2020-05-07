import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContentComponent } from './content/content.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'login', component: LoginComponent },
  { path: 'lockscreen', component: LockscreenComponent},
  { path: 'forgetpassword', component: ForgetPasswordComponent},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'content', component: ContentComponent},
  { path: '**', component: NotfoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
