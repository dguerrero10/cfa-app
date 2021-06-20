import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberAttendanceService {
  private endpoint = "http://localhost:3000/api/team-members-attendance";
  private endpointDelete = "http://localhost:3000/api/team-members-attendance/delete";

  constructor(private http: HttpClient) { }

  addTeamMemberAttendance(teamMemberAttendance: TeamMemberAttendance) {
    return this.http.post<{ success: boolean }>(this.endpoint, teamMemberAttendance);
  }

  getTeamMemberAttendance() {
    return this.http.get<{ success: boolean; teamMemberAttendanceData: TeamMemberAttendance[] }>(this.endpoint);
  }

  deleteTeamMemberAttendanceData(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpointDelete, rowIds)
  }
}
