import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordGuard } from 'src/app/core/services/auth/reset-password-guard';
import { AuthComponent } from './pages/auth/auth.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'reset-password', canActivate: [ResetPasswordGuard],
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResetPasswordGuard]
})
export class AuthRoutingModule { }
