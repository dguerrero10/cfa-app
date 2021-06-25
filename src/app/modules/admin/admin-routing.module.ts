import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordExpirationComponent } from './components/record-expiration/record-expiration.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminComponent } from './pages/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, data: {bodyClass: 'dark'},
    children: [
      {
        path: 'manage-users',
        component: UserListComponent,  data: {bodyClass: 'dark'},
      },
      {
        path: 'manage-record-expirations',
        component: RecordExpirationComponent,  data: {bodyClass: 'dark'},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
