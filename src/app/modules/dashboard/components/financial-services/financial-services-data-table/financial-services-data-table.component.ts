import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { ViewImageService } from 'src/app/core/services/shared/view-image.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageModalComponent } from '../../modals/view-image-modal/view-image-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-services-data-table',
  templateUrl: './financial-services-data-table.component.html',
  styleUrls: ['./financial-services-data-table.component.scss'],
})

export class FinancialServicesDataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Index', 'Date', 'Receipt Purpose', 'Receipt Image', 'Submitted by'];
  public financialServiceData: FinancialService[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<FinancialService>();
  public rowIds: string[] = [];
  public imgPaths: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};
  public pageSizeOptions: number[] = [10, 20, 40, 60, 120];
  public itemsPerPage: number = this.pageSizeOptions[2];
  public currentPage: number = 1;
  public itemCount: number = 0;
  private deleteStateSub$ = new Subscription;
  private financialServiceSub$ = new Subscription;
  private refreshDataSub$ = new Subscription;
  private deleteDataSub$ = new Subscription;
  private viewImgSub$ = new Subscription;
  private financialServiceRefreshSub$ = new Subscription;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public viewImgService: ViewImageService,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private fsService: FsService,
    public shareChartDataService: ShareChartDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.deleteStateSub$ = this.deleteStateService.deleteDataListener.subscribe(deleteStatus => {
      if (deleteStatus) {
        this.deleteData(true);
      }
    });
    this.viewImgSub$ = this.viewImgService.viewImgListener.subscribe(viewImgState => {
      if (viewImgState) {
        this.viewImg(true);
      }
    });
    this.financialServiceSub$ = this.fsService.getFinancialServices(this.itemsPerPage, this.currentPage)
      .subscribe(data => {
        this.financialServiceData = data.financialServiceData;
        this.itemCount = data.itemCount;
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
    this.refreshDataSub$ = this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.refreshData(this.itemsPerPage, this.currentPage);
      }
    });
  }

  refreshData(itemsPerPage: number, currentPage: number) {
   this.financialServiceRefreshSub$ = this.fsService.getFinancialServices(itemsPerPage, currentPage)
      .subscribe(data => {
        this.financialServiceData = data.financialServiceData;
        this.itemCount = data.itemCount;
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

  addRowViewImage(newRow: any) {;
    if (this.clickedRows.has(newRow)) {
      this.clickedRows.delete(newRow);
      this.removeDataToDelete(newRow);
      this.removeImgToView(newRow);
    }
    else {
      this.clickedRows.add(newRow);
      this.addDataToDelete(newRow);
      this.addImgToView(newRow);
    }
    if (this.clickedRows.size === 0) {
      this.deleteStateService.changeDeleteState(false);
      this.viewImgService.changeViewImgState(false);
    }
    if (this.clickedRows.size > 1) {
      this.viewImgService.changeViewImgState(false);
    }
    else {
      this.deleteStateService.changeDeleteState(true);
      this.viewImgService.changeViewImgState(true);
    }
  }

  addImgToView(row: any) {
    if (this.imgPaths.includes(row.imgPath)) return;
    this.imgPaths.push(row.imgPath);
  }

  addDataToDelete(row: any) {
    if (this.rowIds.includes(row._id)) return;
    this.rowIds.push(row._id);
  }

  removeDataToDelete(row: any) {
    this.rowIds = this.rowIds.filter(x => x !== row._id);
  }

  removeImgToView(row: any) {
    this.imgPaths = this.imgPaths.filter(x => x !== row.imgPath);
  }

  viewImg(viewImgStatus: boolean) {
    if (viewImgStatus) {
      this.dialog.open(ViewImageModalComponent, {
        data: {
          img: this.imgPaths[0]
        }
      });
    }
  }

  deleteData(deleteStatus: boolean) {
    if (deleteStatus) {
      this.deleteDataForm.controls['ids'].setValue(this.rowIds);
      this.deleteDataSub$ = this.fsService.deleteFinancialServices(this.deleteDataForm.value)
        .pipe(
          finalize(() => {
            this.snackBar.open('Data deleted succesfully!', 'Dismiss', { duration: 1000 });
          }))
        .subscribe(data => {
          if (data.success) {
            this.refreshData(this.itemsPerPage, this.currentPage);
            this.deleteStateService.changeDeleteState(false);
            this.deleteStateService.deleteData(false);
            this.viewImgService.changeViewImgState(false);
            this.viewImgService.viewImg(false);
            this.rowIds = [];
            this.imgPaths = [];
          }
        });
    }
  }

  ngOnDestroy() {
    this.deleteStateService.changeDeleteState(false);
    this.deleteStateService.deleteData(false);
    this.deleteStateSub$.unsubscribe();
    this.financialServiceSub$.unsubscribe();
    this.refreshDataSub$.unsubscribe();
    this.deleteDataSub$.unsubscribe();
    this.viewImgSub$.unsubscribe();
    this.financialServiceRefreshSub$.unsubscribe();
  }
}
