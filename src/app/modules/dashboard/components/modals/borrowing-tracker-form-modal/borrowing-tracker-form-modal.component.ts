import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs/operators';
import { BorrowingTrackerService } from 'src/app/core/services/borrowing-tracker/borrowing-tracker.service';
import { ErrorHandlerService } from 'src/app/core/services/shared/helpers/error-handler.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';

@Component({
  selector: 'app-borrowing-tracker-form-modal',
  templateUrl: './borrowing-tracker-form-modal.component.html',
  styleUrls: ['./borrowing-tracker-form-modal.component.scss']
})
export class BorrowingTrackerFormModalComponent implements OnInit {
  public borrowingTrackerForm: FormGroup = <FormGroup>{};
  public submitting: boolean = false;

  constructor(private fb: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
    public refreshDataService: RefreshDataService,
    public snackBar: MatSnackBar,
    public borrowingTrackerService: BorrowingTrackerService,
    private dialogRef: MatDialogRef<BorrowingTrackerFormModalComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.borrowingTrackerForm = this.fb.group({
      'itemBorrowed': ['', Validators.required],
      'amountOfItem': ['', Validators.required],
      'fromLocation': ['7809 Wadsworth Blvd, Arvada', Validators.required],
      'toLocation': ['', Validators.required],
      'notes': [''],
      'leaderFirstName': ['', Validators.required],
      'leaderLastName': ['', Validators.required]
    });
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'itemBorrowed':
        if (this.borrowingTrackerForm.controls['itemBorrowed'].hasError('required')) {
          return "Item borrowed is required."
        }
        else return;
      case 'amountOfItem':
        if (this.borrowingTrackerForm.controls['amountOfItem'].hasError('required')) {
          return "Amount of item is required."
        }
        else return;
      case 'fromLocation':
        if (this.borrowingTrackerForm.controls['fromLocation'].hasError('required')) {
          return 'From is required.'
        }
        else return;
      case 'toLocation':
        if (this.borrowingTrackerForm.controls['toLocation'].hasError('required')) {
          return 'To is required.'
        }
        else return;
      case 'leaderFirstName':
        if (this.borrowingTrackerForm.controls['leaderFirstName'].hasError('required')) {
          return "Leader's first name is required."
        }
        else return;

      case 'leaderLastName':
        if (this.borrowingTrackerForm.controls['leaderLastName'].hasError('required')) {
          return "Leader's last name is required."
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.borrowingTrackerForm.invalid) {
      return;
    }
    this.submitting = true;
    this.borrowingTrackerService.addBorrowingTrackerItem(formData.value)
      .pipe(
        retry(3)
      )
      .subscribe(data => {
        if (data.success) {
          this.refreshDataService.refreshData(true);
          this.dialogRef.close();
          this.snackBar.open('Data submitted successfully!', 'Dismiss', {
            duration: 1000
          });
        }
      }, 
      (error) => {
        this.submitting = false;
        this.errorHandlerService.handleSubmissionErrors(error);
      });
  }
}
