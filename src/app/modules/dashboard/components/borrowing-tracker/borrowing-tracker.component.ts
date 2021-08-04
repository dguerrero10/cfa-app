import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { BorrowingTrackerFormModalComponent } from '../modals/borrowing-tracker-form-modal/borrowing-tracker-form-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MobileViewService } from 'src/app/core/services/shared/mobile-view.service';
import { ErrorHandlerService } from 'src/app/core/services/shared/helpers/error-handler.service';

@Component({
  selector: 'app-borrowing-tracker',
  templateUrl: './borrowing-tracker.component.html',
  styleUrls: ['./borrowing-tracker.component.scss']
})
export class BorrowingTrackerComponent implements OnInit, OnDestroy {
  public metricDisabled: boolean = false;
  public onTableComponent: boolean = true;
  public deleteState: boolean = false;
  public isAdmin: boolean = false;
  public isError: boolean = false;
  public tooltipPositionArr: TooltipPosition[] = ['right', 'above'];
  public toolTipPosition = new FormControl(this.tooltipPositionArr[1]);
  public onMobile: boolean = false;
  private onMobileSub$ = new Subscription;
  private userServiceSub$ = new Subscription;
  private metricSerivceSub$ = new Subscription;
  private deleteStateServiceSub$ = new Subscription;
  private errorHandlerSub$ = new Subscription;

  constructor(public mobileViewService: MobileViewService,
              public errorHandlerService: ErrorHandlerService,
              public breakpointObserver: BreakpointObserver,
              public deleteStateService: DeleteStateService,
              public currentUserService: CurrentUserService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.errorHandlerSub$ = this.errorHandlerService.errorListener.subscribe(errorState => this.isError = errorState);
    this.onMobileSub$ = this.mobileViewService.onMobileViewListener.subscribe(value => this.onMobile = value);
    this.userServiceSub$ = this.currentUserService.getCurrentUser().subscribe(userData => {
      this.isAdmin = (Object.values(userData)[0].adminPrivilege);
    });
   this.metricSerivceSub$ = this.metricService.currentMetricState.subscribe(value => this.metricDisabled = value);
   this.deleteStateServiceSub$ = this.deleteStateService.deleteVisibleListener.subscribe(value => {
      this.deleteState = value;
      if (this.deleteState === true) this.toolTipPosition = new FormControl(this.tooltipPositionArr[1]);
      else this.toolTipPosition = new FormControl(this.tooltipPositionArr[0]);
    });
  }

  refreshData() {
    this.refreshDataService.refreshData(true);
  }

  deleteData() {
    this.deleteStateService.deleteData(true);
  }

  tabChanged(event: any) {
    if (event.index === 1) {
      this.onTableComponent = false;
    }
    else this.onTableComponent = true; 
  }

  openBorrowingTrackerFormModal() {
    this.dialog.open(BorrowingTrackerFormModalComponent);
  }

  ngOnDestroy() {
    this.errorHandlerService.errorOccured(false);
    this.errorHandlerSub$.unsubscribe();
    this.userServiceSub$.unsubscribe();
    this.metricSerivceSub$.unsubscribe();
    this.deleteStateServiceSub$.unsubscribe();
    this.onMobileSub$.unsubscribe();
  }

}
