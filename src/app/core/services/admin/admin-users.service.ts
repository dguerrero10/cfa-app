import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  public endpoint = "http://localhost:3000/api/users/all-users";
  public endPointDelete = "http://localhost:3000/api/users/delete";

  private userSource = new BehaviorSubject<User[]>([]);
  public userSourceListener = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<{users: User[]}>(this.endpoint);
  }

  shareUserData(userData: any) {
    this.userSource.next(userData);
  }

  deleteUser(id: string) {
    return this.http.delete<{success: true}>(this.endPointDelete + '/' + id)
  }

}
