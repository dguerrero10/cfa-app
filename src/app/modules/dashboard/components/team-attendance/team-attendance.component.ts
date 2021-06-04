import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamAttendanceService } from 'src/app/core/services/team-attendance/team-attendance.service';
import { TeamAttendance } from 'src/app/shared/models/form-table/team-attendance.model';
import { AttendanceFormModalComponent } from '../modals/attendance-form-modal/attendance-form-modal.component';

@Component({
  selector: 'app-team-attendance',
  templateUrl: './team-attendance.component.html',
  styleUrls: ['./team-attendance.component.scss']
})
export class TeamAttendanceComponent implements OnInit {
  public teamAttendanceData: TeamAttendance[] = [];

  constructor(public dialog: MatDialog,
    private teamAttendanceService: TeamAttendanceService) { }

  ngOnInit(): void {
    this.teamAttendanceService.getTeamAttendance()
      .subscribe(data => {
        this.teamAttendanceData = data.teamAttendance;
      });
  }

  openTeamAttendanceFormModal() {
    this.dialog.open(AttendanceFormModalComponent, { width: '400px' });
  }
}
