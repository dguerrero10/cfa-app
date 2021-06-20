import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule) 
  },
  {
    path: 'dashboard', canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule) 
  },
  {
    path: 'admin', canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule) 
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
