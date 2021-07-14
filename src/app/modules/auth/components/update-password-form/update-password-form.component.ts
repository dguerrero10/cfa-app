import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/core/services/auth/reset-password.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {
  public hide: boolean = true;
  public updatePasswordForm: FormGroup = <FormGroup>{};
  public isLoading: boolean = false;
  public email: string = <string>('');
  public noMatch: boolean = false;

  constructor(private resetPasswordService: ResetPasswordService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.resetPasswordService.emailListener.subscribe(email => this.email = email.email);
    this.createForm();
  }

  createForm() {
    this.updatePasswordForm = this.fb.group({
      'newPassword': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['']
    })
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'newPassword':
        if (this.updatePasswordForm.controls['newPassword'].hasError('required')) {
          return 'New password is required.';
        }
        if (this.updatePasswordForm.controls['newPassword'].hasError('minlength')) {
          return 'New password must be at least 5 characters';
        }
        else return;
      case 'confirmPassword':
        if (this.updatePasswordForm.controls['confirmPassword'].hasError('required')) {
          return 'Confirm password is required.'
        }
        else return;
      default:
        return;
    }
  }

  passwordsMatch() {
    if (this.updatePasswordForm.controls['newPassword'].value !== this.updatePasswordForm.controls['confirmPassword'].value) {
      this.noMatch = true;
      this.updatePasswordForm.controls['newPassword'].setErrors({ 'incorrect': true })
      this.updatePasswordForm.controls['confirmPassword'].setErrors({ 'incorrect': true })
      setTimeout(() => {
        this.noMatch = false;
        this.updatePasswordForm.controls['newPassword'].setErrors(null)
        this.updatePasswordForm.controls['confirmPassword'].setErrors(null);
      }, 2000);
      return false;
    }
    return true;
  }

  onSubmit(formData: FormGroup) {
    if (this.updatePasswordForm.invalid) {
      return;
    }
    if (this.passwordsMatch() === false) {
      return;
    }
    this.isLoading = true;
    this.updatePasswordForm.controls['email'].setValue(this.email);
    this.resetPasswordService.updatePassword(formData.value);
  }
}
