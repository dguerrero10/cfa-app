import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AdminComponent } from './pages/admin.component';
import { AdminSideNavComponent } from './components/navigation/admin-side-nav/admin-side-nav.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSideNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedComponentsModule,
    MaterialModule
  ]
})
export class AdminModule { }
