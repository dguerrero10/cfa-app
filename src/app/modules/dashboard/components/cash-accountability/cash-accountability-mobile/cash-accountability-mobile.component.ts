import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CashAccountabilityService } from 'src/app/core/services/cash-accountability/cash-accountability.service';

@Component({
  selector: 'app-cash-accountability-mobile',
  templateUrl: './cash-accountability-mobile.component.html',
  styleUrls: ['./cash-accountability-mobile.component.scss']
})
export class CashAccountabilityMobileComponent implements OnInit {
  public cashAccountabilityForm: FormGroup = <FormGroup>{};
  public submitting: boolean = false;
  public mixedDrawer: boolean = false;
  public amount: number = 0;

  constructor(public cashAccountabilityService: CashAccountabilityService,
              public snackBar: MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.cashAccountabilityForm = this.fb.group({
      'leaderFirstName': ['', [Validators.required]],
      'leaderLastName': ['', [Validators.required]],
      'teamMemberFirstName': ['', [Validators.required]],
      'teamMemberLastName': ['', [Validators.required]],
      'shortageOverage': ['Shortage'],
      'amountMissing': ['', [Validators.required]],
      'mixedDrawer': ['No'],
      'mixedDrawerTeamMemberFirstName': [''],
      'mixedDrawerTeamMemberLastName': [''],
      'notes': ['']
    });
  }

  onRadioButtonChange(event: any) {
    if (event.value === 'Yes') {
      this.mixedDrawer = true;
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].setValidators(Validators.required);
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].updateValueAndValidity();
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberLastName'].setValidators(Validators.required);
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberLastName'].updateValueAndValidity();
    }
    if (event.value === 'No') {
      this.mixedDrawer = false;
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].clearValidators();
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].updateValueAndValidity();
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberLastName'].clearValidators();
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberLastName'].updateValueAndValidity();
    }     
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'leaderFirstName':
        if (this.cashAccountabilityForm.controls['leaderFirstName'].hasError('required')) {
          return "Leader's first name is required."
        }
        else return;

      case 'leaderLastName':
        if (this.cashAccountabilityForm.controls['leaderLastName'].hasError('required')) {
          return "Leader's last name is required."
        }
        else return;

      case 'teamMemberFirstName':
        if (this.cashAccountabilityForm.controls['teamMemberFirstName'].hasError('required')) {
          return "TM's first name is required."
        }
        else return;

      case 'teamMemberLastName':
        if (this.cashAccountabilityForm.controls['teamMemberLastName'].hasError('required')) {
          return "TM's last name is required."
        }
        else return;
      case 'amountMissing':
        if (this.cashAccountabilityForm.controls['amountMissing'].hasError('required')) {
          return "Amount missing is required."
        }
        else return;
      case 'mixedDrawerTeamMemberFirstName':
        if (this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].hasError('required')) {
          return "TM's first name is required (drawer)."
        }
        else return;
      case 'mixedDrawerTeamMemberLastName':
        if (this.cashAccountabilityForm.controls['mixedDrawerTeamMemberLastName'].hasError('required')) {
          return "TM's last name is required (drawer)."
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.cashAccountabilityForm.invalid) {
      return;
    }
    this.submitting = true;
    if (this.cashAccountabilityForm.controls['mixedDrawer'].value === 'No') {
      this.cashAccountabilityForm.controls['mixedDrawerTeamMemberFirstName'].setValue('N/A');
    }
    this.cashAccountabilityService.addCashAccountability(formData.value).subscribe(data => {
      if (data.success) {
        this.submitting = false;
        this.snackBar.open('Data submitted successfully!', 'Dismiss', {
          duration: 1000
        });
      }
    });
  }
}
