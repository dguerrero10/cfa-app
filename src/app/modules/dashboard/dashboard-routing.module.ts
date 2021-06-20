import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowingTrackerComponent } from './components/borrowing-tracker/borrowing-tracker.component';
import { CaresComponent } from './components/cares/cares.component';
import { CashAccountabilityComponent } from './components/cash-accountability/cash-accountability.component';
import { FinancialServicesComponent } from './components/financial-services/financial-services.component';
import { ItemOrderComponent } from './components/item-order/item-order.component';
import { TeamAttendanceComponent } from './components/team-attendance/team-attendance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'team-attendance',
        component: TeamAttendanceComponent,
      },
      {
        path: 'cares',
        component: CaresComponent,
      },
      {
        path: 'item-order',
        component: ItemOrderComponent, // another child route component that the router renders
      },
      {
        path: 'financial-services',
        component: FinancialServicesComponent, // another child route component that the router renders
      },
      {
        path: 'borrowing-tracker',
        component: BorrowingTrackerComponent,
      },
      {
        path: 'cash-accountability',
        component: CashAccountabilityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
