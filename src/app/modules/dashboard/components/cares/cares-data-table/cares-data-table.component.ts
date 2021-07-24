import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CaresService } from 'src/app/core/services/cares/cares.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-cares-data-table',
  templateUrl: './cares-data-table.component.html',
  styleUrls: ['./cares-data-table.component.scss']
})
export class CaresDataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
   'Index', 'Date', 'Guest Name', 'Guest #', 'Mode of Visit', 'Category', 'Issue(s)', 'Team Member Position', 'Leader'
  ];
  public caresData: Care[] = [];
  public chartData: Care[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<Care>();
  public rowIds: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};
  public pageSizeOptions: number[] = [10, 20, 40, 60, 120];
  public itemsPerPage: number = this.pageSizeOptions[2];
  public currentPage: number = 1;
  public itemCount: number = 0;
  private deleteStateSub$ = new Subscription;
  private careSub$ = new Subscription;
  private refreshDataSub$ = new Subscription;
  private deleteDataSub$ = new Subscription;
  private careRefreshSub$ = new Subscription;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private caresService: CaresService,
    public shareChartDataService: ShareChartDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.deleteStateSub$ = this.deleteStateService.deleteDataListener.subscribe(deleteStatus => {
      if (deleteStatus) {
        this.deleteData(true);
      }
    });
    this.careSub$ = this.caresService.getCares(this.itemsPerPage, this.currentPage)
      .subscribe(data => {
        this.caresData = data.caresData;
        this.shareChartDataService.shareData(this.caresData);
        this.itemCount = data.itemCount;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.caresData);
        if (this.caresData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
        }
        else {
          this.noData = false;
          this.disableMetricService.switchState(this.noData)
        }
      });
   this.refreshDataSub$ = this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.refreshData(this.itemsPerPage, this.currentPage);
      }
    });
  }

  refreshData(itemsPerPage: number, currentPage: number) {
   this.careRefreshSub$ = this.caresService.getCares(itemsPerPage, currentPage)
      .subscribe(data => {
        this.caresData = data.caresData;
        this.shareChartDataService.shareData(this.caresData);
        this.itemCount = data.itemCount;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.caresData);
        if (this.caresData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
          this.deleteStateService.changeDeleteState(false);
        }
        else {
          this.noData = false;
          this.disableMetricService.switchState(this.noData);
          this.deleteStateService.changeDeleteState(false);
          this.deleteStateService.deleteData(false);
          this.rowIds = [];
          this.clickedRows.clear();
        }
      });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    this.refreshData(this.itemsPerPage, this.currentPage);
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
    console.log(this.rowIds)
  }

  deleteData(deleteStatus: boolean) {
    if (deleteStatus) {
      this.deleteDataForm.controls['ids'].setValue(this.rowIds);
      this.careRefreshSub$ = this.caresService.deleteCares(this.deleteDataForm.value)
        .pipe(
          finalize(() => {
            this.snackBar.open('Data deleted succesfully!', 'Dismiss', { duration: 1000 });
          }))
        .subscribe(data => {
          if (data.success) {
            this.refreshData(this.itemsPerPage, this.currentPage);
            this.deleteStateService.changeDeleteState(false);
            this.deleteStateService.deleteData(false);
            this.rowIds = [];
            this.clickedRows.clear();
          }
        });
    }
  }
  ngOnDestroy() {
    this.deleteStateService.changeDeleteState(false);
    this.deleteStateService.deleteData(false);
    this.deleteStateSub$.unsubscribe();
    this.careSub$.unsubscribe();
    this.refreshDataSub$.unsubscribe();
    this.deleteDataSub$.unsubscribe();
    this.careRefreshSub$.unsubscribe();
  }
}
