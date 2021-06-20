import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { ItemOrderService } from 'src/app/core/services/item-order/item-order.service';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { ItemOrder } from 'src/app/shared/models/form-table/item-order.model';

@Component({
  selector: 'app-item-order-data-table',
  templateUrl: './item-order-data-table.component.html',
  styleUrls: ['./item-order-data-table.component.scss']
})
export class ItemOrderDataTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'Date', 'For', 'Areas Searched', "Item's Needed", 'Submitted By'];
  public itemOrderData: ItemOrder[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<ItemOrder>();
  public rowIds: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private itemOrderService: ItemOrderService) { }

  ngOnInit(): void {
    this.createForm();
    this.deleteStateService.deleteDataListener.subscribe(data => {
      if (data) {
        this.deleteData(true)
      }
    });
    this.itemOrderService.getItemOrders()
      .subscribe(data => {
        this.itemOrderData = data.itemOrderData
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.itemOrderData);
        if (this.itemOrderData.length === 0) {
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
    this.itemOrderService.getItemOrders()
      .pipe(first())
      .subscribe(data => {
        this.itemOrderData = data.itemOrderData;
        // this.shareChartDataService.shareData(this.itemOrderData);
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.itemOrderData);
        if (this.itemOrderData.length === 0) {
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
      this.itemOrderService.deleteItemOrders(this.deleteDataForm.value)
        .subscribe(data => {
          if (data.success) {
            this.refreshData();
            this.snackBar.open('Data deleted succesfully!', 'Dismiss', { duration: 1000 });
          }
        });
    }
  }
  ngOnDestroy() {
    this.deleteStateService.changeDeleteState(false);
    this.deleteStateService.deleteData(false);

  }
}
