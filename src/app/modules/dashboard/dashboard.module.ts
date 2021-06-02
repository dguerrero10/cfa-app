import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TeamAttendanceComponent } from './components/team-attendance/team-attendance.component';
import { AttendanceDataTableComponent } from './components/team-attendance/attendance-data-table/attendance-data-table.component';
import { AttendenceDataMetricsComponent } from './components/team-attendance/attendence-data-metrics/attendence-data-metrics.component';
import { AttendanceFormModalComponent } from './components/modals/attendance-form-modal/attendance-form-modal.component';
import { CaresComponent } from './components/cares/cares.component';
import { ItemOrderComponent } from './components/item-order/item-order.component';
import { FinancialServicesComponent } from './components/financial-services/financial-services.component';
import { BorrowingTrackerComponent } from './components/borrowing-tracker/borrowing-tracker.component';
import { CaresDataTableComponent } from './components/cares/cares-data-table/cares-data-table.component';
import { CaresFormModalComponent } from './components/modals/cares-form-modal/cares-form-modal.component';
import { ItemOrderDataTableComponent } from './components/item-order/item-order-data-table/item-order-data-table.component';
import { ItemOrderFormModalComponent } from './components/modals/item-order-form-modal/item-order-form-modal.component';
import { FinancialServicesDataTableComponent } from './components/financial-services/financial-services-data-table/financial-services-data-table.component';
import { FinancialServicesFormModalComponent } from './components/modals/financial-services-form-modal/financial-services-form-modal.component';
import { BorrowingTrackerDataTableComponent } from './components/borrowing-tracker/borrowing-tracker-data-table/borrowing-tracker-data-table.component';
import { BorrowingTrackerFormModalComponent } from './components/modals/borrowing-tracker-form-modal/borrowing-tracker-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    TeamAttendanceComponent,
    AttendanceDataTableComponent,
    AttendenceDataMetricsComponent,
    AttendanceFormModalComponent,
    CaresComponent,
    ItemOrderComponent,
    FinancialServicesComponent,
    BorrowingTrackerComponent,
    CaresDataTableComponent,
    CaresFormModalComponent,
    ItemOrderDataTableComponent,
    ItemOrderFormModalComponent,
    FinancialServicesDataTableComponent,
    FinancialServicesFormModalComponent,
    BorrowingTrackerDataTableComponent,
    BorrowingTrackerFormModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
