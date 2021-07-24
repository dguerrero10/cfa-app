import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { MobileViewService } from 'src/app/core/services/shared/mobile-view.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ItemOrderFormModalComponent } from '../modals/item-order-form-modal/item-order-form-modal.component';

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss']
})
export class ItemOrderComponent implements OnInit, OnDestroy {
  public onTableComponent: boolean = true;
  public deleteState: boolean = false;
  public isAdmin: boolean = false;
  public onMobile: boolean = false;
  public tooltipPositionArr: TooltipPosition[] = ['right', 'above'];
  public toolTipPosition = new FormControl(this.tooltipPositionArr[1]);
  private onMobileSub$ = new Subscription;
  private userServiceSub$ = new Subscription;
  private deleteStateServiceSub$ = new Subscription;
  
  constructor(public mobileViewService: MobileViewService,
              public currentUserService: CurrentUserService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onMobileSub$ = this.mobileViewService.onMobileViewListener.subscribe(value => this.onMobile = value);
    this.userServiceSub$ = this.currentUserService.getCurrentUser().subscribe(userData => {
      this.isAdmin = (Object.values(userData)[0].adminPrivilege);
    });
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

  openItemOrderFormModal() {
    this.dialog.open(ItemOrderFormModalComponent);
  }

  ngOnDestroy() {
    this.userServiceSub$.unsubscribe();
    this.deleteStateServiceSub$.unsubscribe();
    this.onMobileSub$.unsubscribe();
  }

}
