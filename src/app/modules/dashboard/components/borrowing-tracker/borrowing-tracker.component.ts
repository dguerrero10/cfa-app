import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { RouterTrackerService } from 'src/app/core/services/shared/router-tracker.service';
import { BorrowingTrackerFormModalComponent } from '../modals/borrowing-tracker-form-modal/borrowing-tracker-form-modal.component';

@Component({
  selector: 'app-borrowing-tracker',
  templateUrl: './borrowing-tracker.component.html',
  styleUrls: ['./borrowing-tracker.component.scss']
})
export class BorrowingTrackerComponent implements OnInit {
  public metricDisabled: boolean = false;
  public onTableComponent: boolean = true;
  public deleteState: boolean = false;
  public tooltipPositionArr: TooltipPosition[] = ['right', 'above'];
  public toolTipPosition = new FormControl(this.tooltipPositionArr[1]);

  constructor(private router: Router,
              public routerTrackerService: RouterTrackerService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.routerTrackerService.currentRoute(this.router.url);
    this.metricService.currentMetricState.subscribe(data => this.metricDisabled = data);
    this.deleteStateService.deleteVisibleListener.subscribe(data => {
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

  openBorrowingTrackerFormModal() {
    this.dialog.open(BorrowingTrackerFormModalComponent);
  }
}
