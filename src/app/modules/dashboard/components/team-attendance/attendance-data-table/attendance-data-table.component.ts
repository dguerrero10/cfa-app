import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { DeleteStateService } from 'src/app/core/services/shared/delete-state.service';
import { DisableMetricTabService } from 'src/app/core/services/shared/disable-metric-tab.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { TeamMemberAttendanceService } from 'src/app/core/services/team-attendance/team-member-attendance.service';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Component({
  selector: 'app-attendance-data-table',
  templateUrl: './attendance-data-table.component.html',
  styleUrls: ['./attendance-data-table.component.scss']
})
export class AttendanceDataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'Date', 'Team Member', 'Issue', 'Work Area', 'Reported Symptoms', 'Leader', 'Notes'];
  public teamMemberAttendanceData: TeamMemberAttendance[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<TeamMemberAttendance>();
  public rowIds: string[] = [];
  public deleteDataForm: FormGroup = <FormGroup>{};

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private teamMemberAttendanceService: TeamMemberAttendanceService) { }


  ngOnInit(): void {
    this.createForm();
    this.deleteStateService.deleteDataListener.subscribe(deleteStatus => {
      if (deleteStatus) {
        this.deleteData(true)
      }
    });
    this.teamMemberAttendanceService.getTeamMemberAttendance()
      .subscribe(data => {
        this.teamMemberAttendanceData = data.teamMemberAttendanceData;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.teamMemberAttendanceData);
        if (this.teamMemberAttendanceData.length === 0) {
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
    this.teamMemberAttendanceService.getTeamMemberAttendance()
      .pipe(first())
      .subscribe(data => {
        this.teamMemberAttendanceData = data.teamMemberAttendanceData;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.teamMemberAttendanceData);
        if (this.teamMemberAttendanceData.length === 0) {
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
      this.teamMemberAttendanceService.deleteTeamMemberAttendanceData(this.deleteDataForm.value)
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
