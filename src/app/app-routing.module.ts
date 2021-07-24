import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/services/auth/admin.guard';
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
    path: 'admin', canActivate: [AdminGuard],
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
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
