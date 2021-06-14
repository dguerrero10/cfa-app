import { Component, OnInit } from '@angular/core';
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
export class AttendanceDataTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'Date', 'Team Member', 'Issue', 'Work Area', 'Reported Symptoms', 'Leader', 'Notes'];
  public teamMemberAttendance: TeamMemberAttendance[] = [];
  public loading: boolean = true;
  public noData: boolean = false;
  public deleteDataActivated: boolean = false;
  public refreshData: boolean = false;
  public dataSource: any;
  public clickedRows = new Set<TeamMemberAttendance>();
  public _idList: string[] = [];

  constructor(public deleteStateService: DeleteStateService,
    public refreshDataService: RefreshDataService,
    public disableMetricService: DisableMetricTabService,
    private teamMemberAttendanceService: TeamMemberAttendanceService) { }

  ngOnInit(): void {
    this.deleteStateService.activateDeleteData.subscribe(data => {
      if (data) {
        this.deleteData(true)
      }
    });
    this.teamMemberAttendanceService.getTeamMemberAttendance()
      .subscribe(data => {
        this.teamMemberAttendance = data.teamAttendance
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.teamMemberAttendance);
        if (this.teamMemberAttendance.length === 0) {
          this.noData = true;
          this.disableMetricService.switchState(this.noData);
        }
      });
    this.refreshDataService.dataRefreshed.subscribe(data => {
      if (data) {
        this.teamMemberAttendanceService.getTeamMemberAttendance()
          .pipe(first())
          .subscribe(data => {
            this.teamMemberAttendance = data.teamAttendance
            this.loading = false;
            this.dataSource = new MatTableDataSource(this.teamMemberAttendance);
            if (this.teamMemberAttendance.length === 0) {
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
      this.teamMemberAttendanceService.deleteData(this._idList);
    }
  }
}
