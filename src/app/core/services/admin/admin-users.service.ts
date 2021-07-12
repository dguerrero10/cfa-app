import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeId } from 'src/app/shared/models/admin/employeeId.model';
import { User } from 'src/app/shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  public baseEndpoint: string = "http://localhost:3000/api/users";

  private userSource = new BehaviorSubject<User[]>([]);
  public userSourceListener = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<{users: User[]}>(this.baseEndpoint + "/all-users");
  }

  deleteUser(id: string) {
    return this.http.delete<{success: true}>(this.baseEndpoint + "/delete/" + id)
  }

  addEmployeeId(employeeId: EmployeeId) {
    return this.http.post<{ success: boolean }>(this.baseEndpoint + '/add-employee-id', employeeId )
  }

  shareUserData(userData: any) {
    this.userSource.next(userData);
  }
  
}
