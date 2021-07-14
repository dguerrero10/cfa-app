import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormListenerService } from 'src/app/core/services/auth/form-listener.service';
import { ResetPasswordService } from 'src/app/core/services/auth/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public isLoading: boolean = false;
  public passcodeForm: FormGroup = <FormGroup>{};
  public formData: FormGroup = <FormGroup>{};
  public email: string = <string>('');
  public resetPasscode: string = <string>('');
  public displayUpdatePasswordForm: boolean = false;
  public resetPasscodeFailed: boolean = false;

  constructor(private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private formListenerService: FormListenerService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.resetPasswordService.emailListener.subscribe(email => this.email = email.email);
    this.passcodeForm.valueChanges.subscribe(num => {
      if (num.numOne !== null && num.numTwo !== null && num.numThree !== null && num.numFour !== null) {
        for (const field in this.passcodeForm.controls) {
          this.resetPasscode += this.passcodeForm.controls[field].value;
          if (this.resetPasscode.length === 4) {
            this.formData = this.fb.group({
              'email': [this.email],
              'resetPasscode': [this.resetPasscode]
            });
            this.submitPasscode(this.formData);
            this.passcodeForm.reset();
            this.resetPasscode = '';
          }
        };
      };
    });
  }

  createForm() {
    this.passcodeForm = this.fb.group({
      'numOne': [null, [Validators.required]],
      'numTwo': [null, [Validators.required]],
      'numThree': [null, [Validators.required]],
      'numFour': [null, [Validators.required]],
    })
  }

  cancel() {
    this.formListenerService.onResetPasswordForm(false);
    this.router.navigate(['login'])
  }

  submitPasscode(formData: FormGroup) {
    this.isLoading = true;
    this.resetPasswordService.validatePasscode(formData.value)
      .subscribe(res => {
        this.isLoading = false;
        if (res.success) {
          this.displayUpdatePasswordForm = true;
        }
      }, error => {
          this.resetPasscodeFailed = true;
          this.isLoading = false;
      });
  }
}
