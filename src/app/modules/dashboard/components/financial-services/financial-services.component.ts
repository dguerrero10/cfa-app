import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ViewImageService } from 'src/app/core/services/shared/view-image.service';
import { FinancialServicesFormModalComponent } from '../modals/financial-services-form-modal/financial-services-form-modal.component';

@Component({
  selector: 'app-financial-services',
  templateUrl: './financial-services.component.html',
  styleUrls: ['./financial-services.component.scss']
})
export class FinancialServicesComponent implements OnInit {
  public metricDisabled: boolean = false;
  public viewImgState: boolean = false;
  public deleteState: boolean = false;
  public tooltipPositionArr: TooltipPosition[] = ['right', 'above'];
  public toolTipPosition = new FormControl(this.tooltipPositionArr[1]);
  private metricSerivceSub$ = new Subscription;
  private deleteStateServiceSub$ = new Subscription;
  private viewImageServiceSub$ = new Subscription;

  constructor(public viewImgService: ViewImageService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              public metricService: DisableMetricTabService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
   this.metricSerivceSub$ = this.metricService.currentMetricState.subscribe(data => this.metricDisabled = data);
   this.viewImageServiceSub$ = this.viewImgService.viewImgVisibleListener.subscribe(data => this.viewImgState = data);
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

  viewImg() {
    this.viewImgService.viewImg(true);
  }

  openFinancialServicesFormModal() {
    this.dialog.open(FinancialServicesFormModalComponent, {width: '400px'});
  }

  ngOnDestroy() {
    this.metricSerivceSub$.unsubscribe();
    this.deleteStateServiceSub$.unsubscribe();
    this.viewImageServiceSub$.unsubscribe();
  }

}
