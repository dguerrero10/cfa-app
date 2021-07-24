import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TeamAttendanceComponent } from './components/team-attendance/team-attendance.component';
import { AttendanceDataTableComponent } from './components/team-attendance/attendance-data-table/attendance-data-table.component';
import { CaresComponent } from './components/cares/cares.component';
import { ItemOrderComponent } from './components/item-order/item-order.component';
import { FinancialServicesComponent } from './components/financial-services/financial-services.component';
import { BorrowingTrackerComponent } from './components/borrowing-tracker/borrowing-tracker.component';
import { CaresDataTableComponent } from './components/cares/cares-data-table/cares-data-table.component';
import { ItemOrderDataTableComponent } from './components/item-order/item-order-data-table/item-order-data-table.component';
import { FinancialServicesDataTableComponent } from './components/financial-services/financial-services-data-table/financial-services-data-table.component';
import { BorrowingTrackerDataTableComponent } from './components/borrowing-tracker/borrowing-tracker-data-table/borrowing-tracker-data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { CategoriesDoughnutChartComponent } from './components/cares/cares-data-metrics/charts/categories-doughnut-chart/categories-doughnut-chart.component';
import { ModeOfVisitDoughnutChartComponent } from './components/cares/cares-data-metrics/charts/mode-of-visit-doughnut-chart/mode-of-visit-doughnut-chart.component';
import { FoodQualityBarChartComponent } from './components/cares/cares-data-metrics/charts/food-quality-bar-chart/food-quality-bar-chart.component';
import { MissingItemsBarChartComponent } from './components/cares/cares-data-metrics/charts/missing-items-bar-chart/missing-items-bar-chart.component';
import { TimeIssueLineChartComponent } from './components/cares/cares-data-metrics/charts/time-issue-line-chart/time-issue-line-chart.component';
import { CallOutLineChartComponent } from './components/team-attendance/attendance-data-metrics/charts/call-out-line-chart/call-out-line-chart.component';
import { CashAccountabilityComponent } from './components/cash-accountability/cash-accountability.component';
import { CashAccountabilityDataTableComponent } from './components/cash-accountability/cash-accountability-data-table/cash-accountability-data-table.component';
import { AttendanceFormModalComponent } from './components/modals/attendance-form-modal/attendance-form-modal.component';
import { CaresFormModalComponent } from './components/modals/cares-form-modal/cares-form-modal.component';
import { ItemOrderFormModalComponent } from './components/modals/item-order-form-modal/item-order-form-modal.component';
import { FinancialServicesFormModalComponent } from './components/modals/financial-services-form-modal/financial-services-form-modal.component';
import { BorrowingTrackerFormModalComponent } from './components/modals/borrowing-tracker-form-modal/borrowing-tracker-form-modal.component';
import { CashAccountabilityFormModalComponent } from './components/modals/cash-accountability-form-modal/cash-accountability-form-modal.component';
import { BohFohDoughnutChartComponent } from './components/team-attendance/attendance-data-metrics/charts/boh-foh-doughnut-chart/boh-foh-doughnut-chart.component';
import { IssuesBarChart } from './components/team-attendance/attendance-data-metrics/charts/issues-bar-chart/issues-bar-chart.component';
import { CaresDataMetricsComponent } from './components/cares/cares-data-metrics/cares-data-metrics.component';
import { BorrowingTrackerDataMetricsComponent } from './components/borrowing-tracker/borrowing-tracker-data-metrics/borrowing-tracker-data-metrics.component';
import { CashAccountabilityDataMetricsComponent } from './components/cash-accountability/cash-accountability-data-metrics/cash-accountability-data-metrics.component';
import { AttendanceDataMetricsComponent } from './components/team-attendance/attendance-data-metrics/attendance-data-metrics.component';
import { TeamMemberIssueBarChartComponent } from './components/cares/cares-data-metrics/charts/tm-issue-bar-chart/tm-bar-chart.component';
import { WrongItemsBarChartComponent } from './components/cares/cares-data-metrics/charts/wrong-items-bar-chart/wrong-items-bar-chart.component';
import { ItemKindDoughnutChartComponent } from './components/borrowing-tracker/borrowing-tracker-data-metrics/charts/item-kind-doughnut-chart/item-kind-doughnut-chart.component';
import { AmountOfItemBarChartComponent } from './components/borrowing-tracker/borrowing-tracker-data-metrics/charts/amount-of-item-bar-chart/amount-of-item-bar-chart.component';
import { ShortageOverageDoughnutChartComponent } from './components/cash-accountability/cash-accountability-data-metrics/charts/shortage-overage-doughnut-chart/shortage-overage-doughnut-chart.component';
import { ViewImageModalComponent } from './components/modals/view-image-modal/view-image-modal.component';
import { MobileSideNavComponent } from './components/navigation/mobile-side-nav/mobile-side-nav.component';
import { TeamAttendanceMobileComponent } from './components/team-attendance/team-attendance-mobile/team-attendance-mobile.component';
import { CaresMobileComponent } from './components/cares/cares-mobile/cares-mobile.component';
import { ItemOrderMobileComponent } from './components/item-order/item-order-mobile/item-order-mobile.component';
import { BorrowingTrackerMobileComponent } from './components/borrowing-tracker/borrowing-tracker-mobile/borrowing-tracker-mobile.component';
import { CashAccountabilityMobileComponent } from './components/cash-accountability/cash-accountability-mobile/cash-accountability-mobile.component';

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
    IssuesBarChart,
    CaresDataMetricsComponent,
    CategoriesDoughnutChartComponent,
    ModeOfVisitDoughnutChartComponent,
    FoodQualityBarChartComponent,
    TeamMemberIssueBarChartComponent,
    MissingItemsBarChartComponent,
    TimeIssueLineChartComponent,
    CallOutLineChartComponent,
    BorrowingTrackerDataMetricsComponent,
    CashAccountabilityComponent,
    CashAccountabilityDataMetricsComponent,
    CashAccountabilityDataTableComponent,
    CashAccountabilityFormModalComponent,
    BohFohDoughnutChartComponent,
    WrongItemsBarChartComponent,
    ItemKindDoughnutChartComponent,
    AmountOfItemBarChartComponent,
    ShortageOverageDoughnutChartComponent,
    ViewImageModalComponent,
    MobileSideNavComponent,
    TeamAttendanceMobileComponent,
    CaresMobileComponent,
    ItemOrderMobileComponent,
    BorrowingTrackerMobileComponent,
    CashAccountabilityMobileComponent,
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
