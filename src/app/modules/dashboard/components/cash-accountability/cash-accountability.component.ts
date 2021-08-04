import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { ErrorHandlerService } from 'src/app/core/services/shared/helpers/error-handler.service';
import { MobileViewService } from 'src/app/core/services/shared/mobile-view.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { CashAccountabilityFormModalComponent } from '../modals/cash-accountability-form-modal/cash-accountability-form-modal.component';

@Component({
  selector: 'app-cash-accountability',
  templateUrl: './cash-accountability.component.html',
  styleUrls: ['./cash-accountability.component.scss']
})
export class CashAccountabilityComponent implements OnInit, OnDestroy {
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
  
  constructor(private errorHandlerService: ErrorHandlerService,
              public mobileViewService: MobileViewService,
              public currentUserService: CurrentUserService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.errorHandlerSub$ = this.errorHandlerService.errorListener.subscribe(errorState => this.isError = errorState);
    this.onMobileSub$ = this.mobileViewService.onMobileViewListener.subscribe(value => this.onMobile = value);
    this.userServiceSub$ = this.currentUserService.getCurrentUser().subscribe(userData => {
      this.isAdmin = (Object.values(userData)[0].adminPrivilege);
    });
   this.metricSerivceSub$ = this.metricService.currentMetricState.subscribe(data => this.metricDisabled = data);
   this.deleteStateServiceSub$ = this.deleteStateService.deleteVisibleListener.subscribe(data => {
      this.deleteState = data;
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

  openTeamAttendanceFormModal() {
    this.dialog.open(CashAccountabilityFormModalComponent, {width: '550px'});
  }

  ngOnDestroy() {
    this.errorHandlerService.errorOccured(false);
    this.userServiceSub$.unsubscribe();
    this.metricSerivceSub$.unsubscribe();
    this.deleteStateServiceSub$.unsubscribe();
    this.onMobileSub$.unsubscribe();
    this.errorHandlerSub$.unsubscribe();
  }
}
