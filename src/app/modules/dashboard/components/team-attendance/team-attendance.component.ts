import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceFormModalComponent } from '../modals/attendance-form-modal/attendance-form-modal.component';

@Component({
  selector: 'app-team-attendance',
  templateUrl: './team-attendance.component.html',
  styleUrls: ['./team-attendance.component.scss']
})
export class TeamAttendanceComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openTeamAttendanceFormModal() {
    this.dialog.open(AttendanceFormModalComponent, {width: '400px'});
  }

}
