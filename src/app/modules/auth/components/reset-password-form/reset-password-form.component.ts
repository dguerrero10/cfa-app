import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormListenerService } from 'src/app/core/services/auth/form-listener.service';
import { ResetPasswordService } from 'src/app/core/services/auth/reset-password.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  public cfaLogo = '../../../../../assets/images/cfa-logo.svg';
  public resetPasswordForm: FormGroup = <FormGroup>{};
  public isLoading: boolean = false;

  constructor(private router: Router,
              private resetPasswordService: ResetPasswordService,
              private formListenerService: FormListenerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    })
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'email':
        if (this.resetPasswordForm.controls['email'].hasError('required')) {
          return 'Email is required.';
        }
        if (this.resetPasswordForm.controls['email'].hasError('email')) {
          return 'Email is invalid.';
        }
        else return;
      default:
        return
    }
  }

  goToLogin() {
    this.formListenerService.onResetPasswordForm(false);
  }

  onSubmit(formData: FormGroup) {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.router.navigate(['login', 'reset-password'])
    this.resetPasswordService.passwordReset(formData.value);
  }
}
