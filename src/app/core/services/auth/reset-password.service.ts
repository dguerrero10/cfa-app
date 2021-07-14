import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormListenerService } from './form-listener.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  public endpoint: string = "http://localhost:3000/api/users/password-reset";
  public passwordIsReset: boolean = false;
  private email = new BehaviorSubject({} as any);
  public emailListener = this.email.asObservable();

  constructor(private snackBar: MatSnackBar,
              private formListenerService: FormListenerService,
              private router: Router,
              private http: HttpClient) { }

  getIsPasswordReset() {
    return this.passwordIsReset;
  }

  shareEmail(email: FormGroup) {
    this.email.next(email);
  }

  passwordReset(email: FormGroup) {
    return this.http.post<{ success: boolean, token: string }>(this.endpoint, email)
      .subscribe(res => {
        if (res.success) {
          this.passwordIsReset = true;
          this.email.next(email);
          this.router.navigate(['login', 'reset-password']);
        }
    });
  }

  validatePasscode(formData: FormGroup) {
    return this.http.post<{success: boolean}>(this.endpoint + '/' + 'validate-passcode', formData);
  }

  updatePassword(formData: FormGroup) {
    return this.http.post<{success: boolean}>(this.endpoint + '/' + 'update-password', formData)
      .subscribe(res => {
        if (res.success) {
          this.formListenerService.onResetPasswordForm(false);
          this.router.navigate(['login'])
            .then(() => this.snackBar.open('Password reset successfully!', 'Dismiss', {duration: 2000}));
        }
      });
  }
}
