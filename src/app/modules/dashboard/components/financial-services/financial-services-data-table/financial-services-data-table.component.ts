import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { FsService } from 'src/app/core/services/financial-services/fs.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { FinancialService } from 'src/app/shared/models/form-table/financial-services.model';

@Component({
  selector: 'app-financial-services-data-table',
  templateUrl: './financial-services-data-table.component.html',
  styleUrls: ['./financial-services-data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FinancialServicesDataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Index', 'Date', 'Receipt Purpose', 'Receipt Image', 'Submitted by'];
  public financialServiceData: FinancialService[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<FinancialService>();
  public rowIds: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private fsService: FsService,
    public shareChartDataService: ShareChartDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.deleteStateService.deleteDataListener.subscribe(data => {
      if (data) {
        this.deleteData(true);
      }
    });
    this.fsService.getFinancialServices()
      .subscribe(data => {
        this.financialServiceData = data.financialServiceData
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.financialServiceData);
        if (this.financialServiceData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
        }
        else {
          this.noData = false;
          this.disableMetricService.switchState(this.noData);
        }
      });
    this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.refreshData();
      }
    });
  }

  refreshData() {
    this.fsService.getFinancialServices()
      .subscribe(data => {
        this.financialServiceData = data.financialServiceData;
        this.shareChartDataService.shareData(this.financialServiceData);
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.financialServiceData);
        if (this.financialServiceData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
          this.deleteStateService.changeDeleteState(false);
        }
        else {
          this.noData = false;
          this.disableMetricService.switchState(this.noData);
        }
      });
  }

  createForm() {
    this.deleteDataForm = this.fb.group({
      'ids': ['']
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRow(newRow: any) {
    if (this.clickedRows.has(newRow)) {
      this.clickedRows.delete(newRow);
      this.removeDataToDelete(newRow);
    }
    else {
      this.clickedRows.add(newRow);
      this.addDataToDelete(newRow);
    }
    if (this.clickedRows.size === 0) {
      this.deleteStateService.changeDeleteState(false);
    }
    else {
      this.deleteStateService.changeDeleteState(true);
    }
  }

  addDataToDelete(row: any) {
    if (this.rowIds.includes(row._id)) return;
    this.rowIds.push(row._id);
  }

  removeDataToDelete(row: any) {
    this.rowIds = this.rowIds.filter(x => x !== row._id);
  }

  deleteData(deleteStatus: boolean) {
    if (deleteStatus) {
      this.deleteDataForm.controls['ids'].setValue(this.rowIds);
      this.fsService.deleteFinancialServices(this.deleteDataForm.value)
        .pipe(
          finalize(() => {
            this.snackBar.open('Data deleted succesfully!', 'Dismiss', { duration: 1000 });
          }))
        .subscribe(data => {
          if (data.success) {
            this.refreshData();
            this.deleteStateService.changeDeleteState(false);
            this.deleteStateService.deleteData(false);
            this.rowIds = [];
          }
        });
    }
  }
  ngOnDestroy() {
    this.deleteStateService.changeDeleteState(false);
    this.deleteStateService.deleteData(false);
  }
}
