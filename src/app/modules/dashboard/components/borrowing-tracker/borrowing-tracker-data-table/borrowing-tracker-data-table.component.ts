import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, first, take } from 'rxjs/operators';
import { BorrowingTrackerService } from 'src/app/core/services/borrowing-tracker/borrowing-tracker.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { BorrowingTracker } from 'src/app/shared/models/form-table/borrowing-tracker.model';

@Component({
  selector: 'app-borrowing-tracker-data-table',
  templateUrl: './borrowing-tracker-data-table.component.html',
  styleUrls: ['./borrowing-tracker-data-table.component.scss']
})
export class BorrowingTrackerDataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'Date', 'Item Borrowed', 'Amount of Item', 'From', 'To', 'Leader', 'Notes'
  ];
  public borrowingTrackerData: BorrowingTracker[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<BorrowingTracker>();
  public rowIds: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private borrowingTrackerService: BorrowingTrackerService,
    public shareChartDataService: ShareChartDataService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.deleteStateService.deleteDataListener.subscribe(deleteStatus => {
      if (deleteStatus) {
        this.deleteData(true)
      }
    });
    this.borrowingTrackerService.getBorrowingTrackerItems()
      .subscribe(data => {
        this.borrowingTrackerData = data.borrowingTrackerData;
        this.shareChartDataService.shareData(this.borrowingTrackerData);
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.borrowingTrackerData);
        if (this.borrowingTrackerData.length === 0) {
          this.noData = true;
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
    this.borrowingTrackerService.getBorrowingTrackerItems()
      .pipe(first())
      .subscribe(data => {
        this.borrowingTrackerData = data.borrowingTrackerData;
        this.shareChartDataService.shareData(this.borrowingTrackerData);
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.borrowingTrackerData);
        if (this.borrowingTrackerData.length === 0) {
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
      this.borrowingTrackerService.deleteBorrowingTrackerData(this.deleteDataForm.value)
        .pipe(take(1),
          finalize(() => {
            this.snackBar.open('Data deleted succesfully!', 'Dismiss', { duration: 1000 });
          }))
        .subscribe(data => {
          if (data.success) {
            this.refreshData();
          }
        });
    }
  }

  ngOnDestroy() {
    this.deleteStateService.changeDeleteState(false);
    this.deleteStateService.deleteData(false);
  }

}

