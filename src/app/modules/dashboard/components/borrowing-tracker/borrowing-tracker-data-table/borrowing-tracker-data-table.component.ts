import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
export class BorrowingTrackerDataTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'Date', 'Item Borrowed', 'Amount of Item', 'From', 'To', 'Leader', 'Notes'
  ];
  public borrowingTrackerData: BorrowingTracker[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<BorrowingTracker>();
  public _idList: string[] = [];

  constructor(public shareChartDataService: ShareChartDataService,
              public disableMetricService: DisableMetricTabService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              private borrowingTrackerService: BorrowingTrackerService) { }

  ngOnInit(): void {
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
            else {
              this.noData = false;
              this.disableMetricService.switchState(this.noData);
            }
          });
      }
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
    if (this._idList.includes(row._id)) return;
    this._idList.push(row._id);
  }

  removeDataToDelete(row: any) {
    this._idList = this._idList.filter(x => x !== row._id);
    console.log(this._idList)
  }

  deleteData(data: boolean) {
    if (data) {
      this.borrowingTrackerService.deleteData(this._idList);
    }
  }
  
}

