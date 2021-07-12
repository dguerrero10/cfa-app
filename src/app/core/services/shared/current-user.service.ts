import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const userId = localStorage.getItem('userId');
    return this.http.get<User>(`http://localhost:3000/api/users/current-user/${userId}`);
  }
  
}
