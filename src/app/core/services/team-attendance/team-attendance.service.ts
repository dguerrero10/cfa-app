import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamAttendance } from 'src/app/shared/models/form-table/team-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class TeamAttendanceService {
  endpoint = "http://localhost:3000/api/team-attendance";

  constructor(private http: HttpClient) { }

  addTeamMemberAbsent(teamMemberAbsent: TeamAttendance) {
    return this.http.post<{ success: boolean }>(this.endpoint, teamMemberAbsent);
  }

  getTeamAttendance() {
    return this.http.get<{ success: boolean; teamAttendance: TeamAttendance[] }>(this.endpoint);
  }

  deleteData(id: string[]) {
    id.forEach(e => {
      return this.http.delete<{ teamAttendance: TeamAttendance[] }>(this.endpoint+"/"+ e);
    })
  }
}
