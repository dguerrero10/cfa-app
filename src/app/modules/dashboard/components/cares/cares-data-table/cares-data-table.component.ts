import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
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
export class CaresDataTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'Date', 'Guest Name', 'Guest #', 'Mode of Visit', 'Category', 'Issue(s)', 'Team Member Position', 'Leader'
  ];
  public caresData: Care[] = [];
  public chartData: Care[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<Care>();
  public _idList: string[] = [];

  constructor(public shareChartDataService: ShareChartDataService,
              public disableMetricService: DisableMetricTabService,
              public deleteStateService: DeleteStateService,
              public refreshDataService: RefreshDataService,
              private caresService: CaresService) { }

  ngOnInit(): void {
    this.caresService.getCares()
      .subscribe(data => {
        this.caresData = data.care;
        console.log(data.care)
        this.shareChartDataService.shareData(this.caresData);
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.caresData);
        if (this.caresData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
        }
      });
    this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.caresService.getCares()
          .subscribe(data => {
            this.caresData = data.care;
            this.shareChartDataService.shareData(this.caresData);
            this.loading = false;
            this.dataSource = new MatTableDataSource(this.caresData);
            if (this.caresData.length === 0) {
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
      this.caresService.deleteData(this._idList);
    }
  }
  
}
