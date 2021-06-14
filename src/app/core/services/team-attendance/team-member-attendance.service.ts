import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberAttendanceService {
  endpoint = "http://localhost:3000/api/team-members-attendance";

  constructor(private http: HttpClient) { }

  addTeamMemberAttendance(teamMemberAttendance: TeamMemberAttendance) {
    return this.http.post<{ success: boolean }>(this.endpoint, teamMemberAttendance);
  }

  getTeamMemberAttendance() {
    return this.http.get<{ success: boolean; teamAttendance: TeamMemberAttendance[] }>(this.endpoint);
  }

  deleteData(id: string[]) {
    id.forEach(e => {
      return this.http.delete<{ teamAttendance: TeamMemberAttendance[] }>(this.endpoint+"/"+ e);
    })
  }
}
