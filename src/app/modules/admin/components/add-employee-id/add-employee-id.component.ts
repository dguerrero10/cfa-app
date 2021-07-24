import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AdminUsersService } from 'src/app/core/services/admin/admin-users.service';

@Component({
  selector: 'app-add-employee-id',
  templateUrl: './add-employee-id.component.html',
  styleUrls: ['./add-employee-id.component.scss']
})
export class AddEmployeeIdComponent implements OnInit, OnDestroy {
  public addEmployeeIdForm: FormGroup = <FormGroup>{};
  private employeeIdSub$ = new Subscription;

  constructor(private snackBar: MatSnackBar,
              private adminUserService: AdminUsersService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addEmployeeIdForm = this.fb.group({
      'employeeId': ['', [Validators.required]],
      'adminPrivilege': [false]
    });
  }

  getFormErrors(el: string) {
    switch(el) {
      case 'employeeId':
        if (this.addEmployeeIdForm.controls['employeeId'].hasError('required')) {
          return 'Employee ID is required';
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.addEmployeeIdForm.invalid) {
      return;
    }
   this.employeeIdSub$ = this.adminUserService.addEmployeeId(formData.value).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Data submitted successfully!', 'Dismiss', {
          duration: 1000
        });
      }
    });
  }

  ngOnDestroy() {
    this.employeeIdSub$.unsubscribe();
  }

}
