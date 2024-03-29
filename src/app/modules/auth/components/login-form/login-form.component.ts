import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormListenerService } from 'src/app/core/services/auth/form-listener.service';

export interface RegisterFormData {
  success: boolean;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public cfaLogo = '../../../../../assets/images/cfa-logo.svg';
  public onResetPasswordForm: boolean = false;
  public loginForm: FormGroup = <FormGroup>{};
  public isLoading: boolean = false;
  public hide: boolean = true;
  public dataInvalid: boolean = false;
  public registerFormData: RegisterFormData = {success: false, email: '', password: ''}
  private formSub$ = new Subscription;
  private authStatusSub$ = new Subscription;
  private authErrorSub$ = new Subscription;

  constructor(private formListnerService: FormListenerService,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
   this.formSub$ = this.formListnerService.onResetPasswordFormListener
      .subscribe(value => this.onResetPasswordForm = value);
    this.createForm();
   this.authStatusSub$ = this.authService.getAuthStatusListener()
      .subscribe(() => {
        this.isLoading = false;
      }
    );
   this.authErrorSub$ = this.authService.getAuthErrorListener()
      .subscribe(() => {
        this.dataInvalid = true;
        this.loginForm.controls['email'].setErrors({ 'incorrect': true })
        this.loginForm.controls['password'].setErrors({ 'incorrect': true })
        setTimeout(() => {
          this.dataInvalid = false;
          this.loginForm.controls['email'].setErrors(null)
          this.loginForm.controls['password'].setErrors(null);
        }, 2000);
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  resetPassword() {
    this.formListnerService.onResetPasswordForm(true);
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'email':
        if (this.loginForm.controls['email'].hasError('required')) {
          return 'Email is required.'
        }
        if (this.loginForm.controls['email'].hasError('email')) {
          return 'Email is invalid.'
        }
        else return;
      case 'password':
        if (this.loginForm.controls['password'].hasError('required')) {
          return 'Password is required.'
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(formData.value);
  }

  ngOnDestroy() {
    this.formSub$.unsubscribe();
    this.authStatusSub$.unsubscribe();
    this.authErrorSub$.unsubscribe();
  }

}
