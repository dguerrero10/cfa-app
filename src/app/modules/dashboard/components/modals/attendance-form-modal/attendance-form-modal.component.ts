import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { TeamMemberAttendanceService } from 'src/app/core/services/team-attendance/team-member-attendance.service';
import { ISSUES, SYMPTOMS } from 'src/app/shared/data/forms/team-attendance';

@Component({
  selector: 'app-attendance-form-modal',
  templateUrl: './attendance-form-modal.component.html',
  styleUrls: ['./attendance-form-modal.component.scss']
})
export class AttendanceFormModalComponent implements OnInit {
  public teamAttendanceForm: FormGroup = <FormGroup>{};
  public issues = ISSUES;
  public symptoms = SYMPTOMS;
  public sick: boolean = false;
  public other: boolean = false;

  constructor(private fb: FormBuilder,
    public refreshDataService: RefreshDataService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AttendanceFormModalComponent>,
    public teamMemberAttendanceService: TeamMemberAttendanceService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.teamAttendanceForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'workArea': ['BOH'],
      'issue': ['', Validators.required],
      'reportedSymptoms': [''],
      'otherExplanation': [''],
      'notes': [''],
      'leaderFirstName': ['', Validators.required],
      'leaderLastName': ['', Validators.required]
    });
  }

  updateForm(control: string, value: boolean) {
    if (value === true) {
      this.teamAttendanceForm.controls[control]?.setValidators(Validators.required);
      this.teamAttendanceForm.controls[control]?.updateValueAndValidity();
    }
    if (value === false) {
      this.teamAttendanceForm.controls[control]?.clearValidators();
      this.teamAttendanceForm.controls[control]?.updateValueAndValidity();
    }
  }

  onIssueChange(event: any) {
    if (event.value === 'Call_in_sick') {
      this.sick = true;
      this.updateForm('reportedSymptoms', true);
    }
    else {
      this.sick = false;
      this.updateForm('reportedSymptoms', false);
    }
    if (event.value === 'Other') {
      this.other = true;
      this.updateForm('otherExplanation', true);
    }
    else {
      this.other = false;
      this.updateForm('otherExplanation', false);
    }
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'firstName':
        if (this.teamAttendanceForm.controls['firstName'].hasError('required')) {
          return "TM's first name is required."
        }
        else return;
      case 'lastName':
        if (this.teamAttendanceForm.controls['lastName'].hasError('required')) {
          return "TM's last name is required."
        }
        else return;
      case 'issue':
        if (this.teamAttendanceForm.controls['issue'].hasError('required')) {
          return 'Issue is required.'
        }
        else return;
      case 'reportedSymptoms':
        if (this.teamAttendanceForm.controls['reportedSymptoms'].hasError('required')) {
          return 'Reported symptoms are required.'
        }
        else return;
      case 'otherExplanation':
        if (this.teamAttendanceForm.controls['otherExplanation'].hasError('required')) {
          return 'An explanation is required.'
        }
        else return;
      case 'leaderFirstName':
        if (this.teamAttendanceForm.controls['leaderFirstName'].hasError('required')) {
          return "Leader's first name is required."
        }
        else return;

      case 'leaderLastName':
        if (this.teamAttendanceForm.controls['leaderFirstName'].hasError('required')) {
          return "Leader's last name is required."
        }
        else return;
      default:
        return;
    }
  }

  prepString(stringToTransform: string) {
    for (let i = 0; i < stringToTransform.length; i++) {
      // Find where to seperate string by uppercase letter
      if (stringToTransform[i] === stringToTransform[i].toUpperCase()) {
        // Seperate string by uppercase index
        let transformedString = stringToTransform.substring(0, i) + ' ' + stringToTransform.substring(i);
        // Split string into array to change first chracter to uppercase
        let stringArray = transformedString.split('');
        stringArray[0] = stringArray[0].toUpperCase();
        // Join array into string and return it
        return stringArray.join('');
      }
    }
    let stringArray = stringToTransform.split('');
    stringArray[0] = stringToTransform[0].toUpperCase();
    return stringArray.join('');
  }

  prepareData(formData: FormGroup) {
    let stringArray = formData.value.issue;
    if (formData.value.issue === 'Uniform') {
      return;
    }
    stringArray = stringArray.split('_');
    const transformedString = stringArray.join(' ');
    formData.controls.issue.setValue(transformedString);

    const transformedSymptoms = [];
    for (let i = 0; i < formData.value.reportedSymptoms.length; i++) {
      // Transform each item in array
      let transformedString = this.prepString(formData.value.reportedSymptoms[i]);
      // Push to new array
      transformedSymptoms.push(transformedString)
    }
    // Switch old issue array with transformed issue array
    formData.controls.reportedSymptoms.setValue(transformedSymptoms);
  }

  onSubmit(formData: FormGroup) {
    if (this.teamAttendanceForm.invalid) {
      return;
    }
    this.prepareData(formData);
    if (!formData.value.reportedSymptoms.length) {
      formData.controls.reportedSymptoms.setValue('N/A');
    }
    this.teamMemberAttendanceService.addTeamMemberAttendance(formData.value)
      .subscribe(data => {
        if (data.success) {
          this.refreshDataService.refreshData(true);
          this.dialogRef.close();
          this.snackBar.open('Data submitted successfully!', 'Dismiss', {
            duration: 1000
          });
        }
      });
  }
}
