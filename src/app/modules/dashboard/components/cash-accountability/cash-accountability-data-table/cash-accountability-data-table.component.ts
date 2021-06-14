import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { CashAccountabilityService } from 'src/app/core/services/cash-accountability/cash-accountability.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { CashAccountability } from 'src/app/shared/models/form-table/cash-accountability.model';

@Component({
  selector: 'app-cash-accountability-data-table',
  templateUrl: './cash-accountability-data-table.component.html',
  styleUrls: ['./cash-accountability-data-table.component.scss']
})
export class CashAccountabilityDataTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'Date', 'Leader', 'Team Member', "Shortage / Overage", 'Amount Missing', 'Mixed Drawer',
    'Mixed with Team Member', 'Notes'];
  public cashAccountabilityData: CashAccountability[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public deleteDataActivated: boolean = false;
  public refreshData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<CashAccountability>();
  public _idList: string[] = [];

  constructor(public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private cashAccountabilityService: CashAccountabilityService) { }

  ngOnInit(): void {
    this.deleteStateService.activateDeleteData.subscribe(data => {
      if (data) {
        this.deleteData(true);
      }
    });
    this.cashAccountabilityService.getCashAccountability()
      .subscribe(data => {
        console.log(data)
        this.cashAccountabilityData = data.cashAccountabilityData
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.cashAccountabilityData);
        if (this.cashAccountabilityData.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
        }
      });
    this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.cashAccountabilityService.getCashAccountability()
          .pipe(first())
          .subscribe(data => {
            this.cashAccountabilityData = data.cashAccountabilityData
            this.loading = false;
            this.dataSource = new MatTableDataSource(this.cashAccountabilityData);
            if (this.cashAccountabilityData.length === 0) {
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
  }

  deleteData(data: boolean) {
    if (data) {
      return;
      // this.itemOrderService.deleteData(this._idList);
    }
  }
}
