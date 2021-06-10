import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { TeamAttendanceService } from 'src/app/core/services/team-attendance/team-attendance.service';
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
    public teamAttendanceService: TeamAttendanceService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.teamAttendanceForm = this.fb.group({
      'teamMemberName': ['', Validators.required],
      'issue': ['', Validators.required],
      'workArea': ['BOH'],
      'reportedSymptoms': [''],
      'otherExplanation': [''],
      'notes': [''],
      'leaderName': ['', Validators.required]
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
    if (event.value === 'sick') {
      this.sick = true;
      this.updateForm('reportedSymptoms', true);
    }
    else {
      this.sick = false;
      this.updateForm('reportedSymptom', false);
    }
    if (event.value === 'other') {
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
      case 'teamMemberName':
        if (this.teamAttendanceForm.controls['teamMemberName'].hasError('required')) {
          return 'Team member name is required.'
        }
        else return
      case 'issue':
        if (this.teamAttendanceForm.controls['issue'].hasError('required')) {
          return 'Issue is required.'
        }
        else return
      case 'reportedSymptoms':
        if (this.teamAttendanceForm.controls['reportedSymptoms'].hasError('required')) {
          return 'Reported symptoms are required.'
        }
        else return
      case 'otherExplanation':
        if (this.teamAttendanceForm.controls['otherExplanation'].hasError('required')) {
          return 'An explanation is required.'
        }
        else return
      case 'leaderName':
        if (this.teamAttendanceForm.controls['leaderName'].hasError('required')) {
          return 'Leader name is required.'
        }
        else return
      default:
        return
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
    stringArray[0] = stringToTransform[0].toLocaleUpperCase();
    return stringArray.join('');
  }

  prepareData(formData: FormGroup) {
    let items = ['issue'];
    // Control values that need data transformed
    for (let i = 0; i < items.length; i++) {
      // Call prepString function on control items
      let transformedString = this.prepString(formData.value[items[i]]);
      // Set form data with transformed data
      formData.controls[items[i]].setValue(transformedString);
    }
    // Iterate through array of issues of issue control and transform them
    const transformedSymptoms = [];
    for (let i = 0; i < formData.value.reportedSymptoms.length; i++) {
      // Transform each item in array
      let transformedString = this.prepString(formData.value.reportedSymptoms[i]);
      // Push to new array
      transformedSymptoms.push(transformedString)
    }
    // Switch old issue array with transformed issue array
    formData.controls.reportedSymptoms.setValue(transformedSymptoms);
    return formData;
  }

  onSubmit(formData: FormGroup) {
    console.log(formData.value)
    if (this.teamAttendanceForm.invalid) {
      return;
    }
    this.prepareData(formData);
    if (!formData.value.reportedSymptoms.length){
      formData.controls.reportedSymptoms.setValue('N/A');
    }
    this.teamAttendanceService.addTeamMemberAbsent(formData.value)
      .subscribe(data => {
        if (data.success) {
          this.refreshDataService.refresh(true);
          this.dialogRef.close();
          this.snackBar.open('Data submitted successfully!', 'Dismiss', {
            duration: 3000
          });
        }
      });
  }
}
