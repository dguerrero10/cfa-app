import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public endpoint = "http://localhost:3000/api/users/all-users";

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<{users: User[]}>(this.endpoint);
  }

}
