import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup = <FormGroup>{};
  public hide: boolean = true;

  constructor(public authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'employeeId': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(5)]],
      'confirmPassword': ['', [Validators.required]]
    });
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'firstName':
        if (this.registerForm.controls['firstName'].hasError('required')) {
          return 'First name is required';
        }
        else return;
      case 'lastName':
        if (this.registerForm.controls['lastName'].hasError('required')) {
          return 'Last name is required';
        }
        else return;
      case 'employeeId':
        if (this.registerForm.controls['employeeId'].hasError('required')) {
          return 'Employee ID is required';
        }
        if (this.registerForm.controls['employeeId'].hasError('minlength')) {
          return 'Employee ID is too short';
        }
        if (this.registerForm.controls['employeeId'].hasError('maxlength')) {
          return 'Employee ID is too long';
        }
        else return;
      case 'email':
        if (this.registerForm.controls['email'].hasError('required')) {
          return 'Email is required';
        }
        if (this.registerForm.controls['email'].hasError('email')) {
          return 'Email is invalid';
        }
        else return;
      case 'password':
        if (this.registerForm.controls['password'].hasError('required')) {
          return 'Password is required';
        }
        if (this.registerForm.controls['password'].hasError('minlength')) {
          return 'Password must be at least 5 characters';
        }
        else return;
      case 'confirmPassword':
        if (this.registerForm.controls['confirmPassword'].hasError('required')) {
          return 'Confirm password is required';
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.createUser(formData.value)
  }
}
