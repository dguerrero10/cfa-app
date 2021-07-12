import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AdminComponent } from './pages/admin.component';
import { AdminSideNavComponent } from './components/navigation/admin-side-nav/admin-side-nav.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RecordExpirationComponent } from './components/record-expiration/record-expiration.component';
import { DeleteUserWarningModalComponent } from './components/modals/delete-user-warning-modal/delete-user-warning-modal.component';
import { ElevatePrivilegesWarningModalComponent } from './components/modals/elevate-privileges-warning-modal/elevate-privileges-warning-modal.component';
import { AddEmployeeIdComponent } from './components/add-employee-id/add-employee-id.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSideNavComponent,
    UserListComponent,
    RecordExpirationComponent,
    DeleteUserWarningModalComponent,
    ElevatePrivilegesWarningModalComponent,
    AddEmployeeIdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MaterialModule
  ]
})
export class AdminModule { }
