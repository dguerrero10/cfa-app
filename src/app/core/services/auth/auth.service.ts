import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Auth } from 'src/app/shared/models/auth/auth.model';
import { RegisterUser } from 'src/app/shared/models/auth/register-user.model';
import { User } from 'src/app/shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endpointRegister: string = "http://localhost:3000/api/users/register";
  public endpointLogin: string = "http://localhost:3000/api/users/login";
  private authStatusListener = new Subject<boolean>();
  private authErrorListener = new Subject<boolean>();
  private userRegisteredListener = new Subject<{ success: boolean, email: string, password: string }>()
  private registerErrorListener = new Subject<{ error: {message: string}}>();
  public isAuthenticated: boolean = false;
  private token: string | null | undefined = <string>('');
  private user: User = <User>{};
  private tokenTimer: any;

  constructor(
    private router: Router,
    private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  getUserData() {
    return this.user;
  }

  getUserId() {
    return this.user._id;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthErrorListener() {
    return this.authErrorListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserRegisteredListener() {
    return this.userRegisteredListener.asObservable();
  }

  getRegisterError() {
    return this.registerErrorListener.asObservable();
  }

  createUser(registerUser: RegisterUser) {
    const newUser: RegisterUser = {
      firstName: registerUser.firstName,
      lastName: registerUser.lastName,
      employeeId: registerUser.employeeId,
      email: registerUser.email,
      password: registerUser.password
    };
    return this.http.post<{ success: boolean }>(this.endpointRegister, newUser)
      .subscribe(res => {
        if (res.success) {
          this.userRegisteredListener.next
            ({
              success: true,
              email: newUser.email,
              password: newUser.password
            })
        }
      }, error => {
        this.registerErrorListener.next(error);
      });
  };

  loginUser(loginUser: Auth) {
    const authUser: Auth = { email: loginUser.email, password: loginUser.password }
    this.http.post<{ token: string, expiresIn: number, user: User }>(this.endpointLogin, authUser)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.user = res.user;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.user._id);
          this.router.navigate(['dashboard']);
        }
      }, error => {
        this.authErrorListener.next(error);
        this.authStatusListener.next(false);
      }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation?.expirationDate.getTime()! - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation?.token;
      this.isAuthenticated = true;
      this.user._id = authInformation.userId!;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.user._id = null!;
    this.router.navigate(['login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
