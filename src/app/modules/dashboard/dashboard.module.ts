import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TeamAttendanceComponent } from './components/team-attendance/team-attendance.component';
import { AttendanceDataTableComponent } from './components/team-attendance/attendance-data-table/attendance-data-table.component';
import { AttendanceDataMetricsComponent } from './components/team-attendance/attendance-data-metrics/attendance-data-metrics.component';
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
import { CallOutBarChartComponent } from './components/team-attendance/attendance-data-metrics/charts/call-out-bar-chart/call-out-bar-chart.component';
import { CaresDataMetricsComponent } from './components/cares/cares-data-metrics/cares-data-metrics.component';
import { CategoriesDoughnutChartComponent } from './components/cares/cares-data-metrics/charts/categories-doughnut-chart/categories-doughnut-chart.component';
import { ModeOfVisitDoughnutChartComponent } from './components/cares/cares-data-metrics/charts/mode-of-visit-doughnut-chart/mode-of-visit-doughnut-chart.component';
import { FoodQualityBarChartComponent } from './components/cares/cares-data-metrics/charts/food-quality-bar-chart/food-quality-bar-chart.component';
import { ServiceBarChartComponent } from './components/cares/cares-data-metrics/charts/service-bar-chart/service-bar-chart.component';
import { MissingItemsBarChartComponent } from './components/cares/cares-data-metrics/charts/missing-items-bar-chart/missing-items-bar-chart.component';
import { TimeIssueLineChartComponent } from './components/cares/cares-data-metrics/charts/time-issue-line-chart/time-issue-line-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    TeamAttendanceComponent,
    AttendanceDataTableComponent,
    AttendanceDataMetricsComponent,
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
    CallOutBarChartComponent,
    CaresDataMetricsComponent,
    CategoriesDoughnutChartComponent,
    ModeOfVisitDoughnutChartComponent,
    FoodQualityBarChartComponent,
    ServiceBarChartComponent,
    MissingItemsBarChartComponent,
    TimeIssueLineChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ]
})
export class DashboardModule { }
