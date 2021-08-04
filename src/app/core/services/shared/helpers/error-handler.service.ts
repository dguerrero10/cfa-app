import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private error = new BehaviorSubject<boolean>(false);
  public errorListener = this.error.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  errorOccured(value: boolean) {
    this.error.next(value);
  }

  handleSubmissionErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackBar.open('An connection error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    if (error.status === 500) {
      this.snackBar.open('An error occured submitting your data, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    else {
      this.snackBar.open('An unknown error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
  }

  handleDeleteDataErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackBar.open('An connection error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    if (error.status === 500) {
      this.snackBar.open('An error occured deleting your data, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    else {
      this.snackBar.open('An unknown error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
  }

  handleFetchingDataErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackBar.open('An connection error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    if (error.status === 500) {
      this.snackBar.open('An error occured retrieving your data, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
    else {
      this.snackBar.open('An unknown error occured, please try again later.', 'Dismiss', {
        duration: 2000
      });
    }
  }
}
