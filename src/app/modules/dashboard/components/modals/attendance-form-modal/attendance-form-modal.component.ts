import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
              private dialogRef: MatDialogRef<AttendanceFormModalComponent>,
              public teamAttendanceService: TeamAttendanceService,
              ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.teamAttendanceForm = this.fb.group({
      'teamMemberName': ['', Validators.required],
      'issue': ['', Validators.required],
      'reportedSymptoms': [''],
      'otherExplanation': [''],
      'notes': [''],
      'leaderName': ['', Validators.required]
    });
  }

  updateForm(control:string, value:boolean) {
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

  onSubmit(formData: FormGroup) {
    if (this.teamAttendanceForm.invalid) {
      return;
    }
    this.teamAttendanceService.addTeamMemberAbsent(formData.value)
    .subscribe(data => {
      if (data.success) {
        this.dialogRef.close();
      }
    });
  }
}