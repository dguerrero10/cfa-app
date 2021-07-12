import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NumberValidationService } from 'src/app/shared/helpers/number-validation.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup = <FormGroup>{};
  public hide: boolean = true;
  public noMatch: boolean = false;
  public invalidEmployeeId: boolean = false;

  constructor(public authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'employeeId': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(5)]],
      'confirmPassword': ['', [Validators.required]]
    });
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'firstName':
        if (this.registerForm.controls['firstName'].hasError('required')) {
          return 'First name is required.';
        }
        else return;
      case 'lastName':
        if (this.registerForm.controls['lastName'].hasError('required')) {
          return 'Last name is required.';
        }
        else return;
      case 'employeeId':
        if (this.registerForm.controls['employeeId'].hasError('required')) {
          return 'Employee ID is required.';
        }
        if (this.registerForm.controls['employeeId'].hasError('range')) {
          return 'Employee ID must be 5 integers.';
        }
        else return;
      case 'email':
        if (this.registerForm.controls['email'].hasError('required')) {
          return 'Email is required.';
        }
        if (this.registerForm.controls['email'].hasError('email')) {
          return 'Email is invalid.';
        }
        else return;
      case 'password':
        if (this.registerForm.controls['password'].hasError('required')) {
          return 'Password is required.';
        }
        if (this.registerForm.controls['password'].hasError('minlength')) {
          return 'Password must be at least 5 characters';
        }
        else return;
      case 'confirmPassword':
        if (this.registerForm.controls['confirmPassword'].hasError('required')) {
          return 'Confirm password is required.';
        }
        else return;
      default:
        return;
    }
  }

  passwordsMatch() {
    if (this.registerForm.controls['password'].value !== this.registerForm.controls['confirmPassword'].value) {
      this.noMatch = true;
      this.registerForm.controls['password'].setErrors({ 'incorrect': true })
      this.registerForm.controls['confirmPassword'].setErrors({ 'incorrect': true })
      setTimeout(() => {
        this.noMatch = false;
        this.registerForm.controls['password'].setErrors(null)
        this.registerForm.controls['confirmPassword'].setErrors(null);
      }, 2000);
      return false;
    }
    return true;
  }

  onSubmit(formData: FormGroup) {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.passwordsMatch() === false) {
      return;
    }
    this.authService.getRegisterError()
     .subscribe(res => {
        if (res) {
          if (res.error.message === 'No employee ID found.') {
            this.invalidEmployeeId = true;
            this.registerForm.controls['employeeId'].setErrors({'incorrect': true})
            setTimeout(() => {
              this.invalidEmployeeId = false;
              this.registerForm.controls['employeeId'].setErrors(null);
            }, 2000);
          }
        }
     })
    this.authService.createUser(formData.value);
  }
}
