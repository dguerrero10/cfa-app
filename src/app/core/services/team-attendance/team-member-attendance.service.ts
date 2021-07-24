import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberAttendanceService {
  private endpoint = "http://localhost:3000/api/team-members-attendance";

  constructor(private http: HttpClient) { }

  addTeamMemberAttendance(teamMemberAttendance: TeamMemberAttendance) {
    return this.http.post<{ success: boolean }>(this.endpoint, teamMemberAttendance);
  }

  getTeamMemberAttendance(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get
          <{ success: boolean; teamMemberAttendanceData: TeamMemberAttendance[], itemCount: number 
           }>(this.endpoint + queryParams);
  }

  deleteTeamMemberAttendanceData(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpoint + '/' + 'delete', rowIds)
  }

  updateExpiration() {
    return this.http.post<{ success: boolean }>(this.endpoint + '/' + 'update-expiration', 'test');
  } 
}
