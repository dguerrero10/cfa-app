import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { CashAccountabilityFormModalComponent } from '../modals/cash-accountability-form-modal/cash-accountability-form-modal.component';

@Component({
  selector: 'app-cash-accountability',
  templateUrl: './cash-accountability.component.html',
  styleUrls: ['./cash-accountability.component.scss']
})
export class CashAccountabilityComponent implements OnInit {
  public metricDisabled: boolean = false;
  public deleteState: boolean = false;
  public tooltipPositionArr: TooltipPosition[] = ['right', 'above'];
  public toolTipPosition = new FormControl(this.tooltipPositionArr[1]);
  
  constructor(public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
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

  openTeamAttendanceFormModal() {
    this.dialog.open(CashAccountabilityFormModalComponent, {width: '550px'});
  }
}
