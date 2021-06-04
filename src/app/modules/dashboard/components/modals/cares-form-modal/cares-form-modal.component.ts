import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaresService } from 'src/app/core/services/cares/cares.service';
import { CATEGORIES, FOOD_QUALITY, MISSING_ITEMS, MODES_OF_VISIT, SERVICES } from 'src/app/shared/data/forms/cares';

@Component({
  selector: 'app-cares-form-modal',
  templateUrl: './cares-form-modal.component.html',
  styleUrls: ['./cares-form-modal.component.scss']
})
export class CaresFormModalComponent implements OnInit {
  public caresForm: FormGroup = <FormGroup>{};
  public categories = CATEGORIES;
  public modesOfVisit = MODES_OF_VISIT;
  public foodQuality = FOOD_QUALITY;
  public services = SERVICES;
  public missingItems = MISSING_ITEMS;
  public selectedCategory: string = '';
  public other: boolean = false;

  constructor(private dialogRef: MatDialogRef<CaresFormModalComponent>,
              private fb: FormBuilder,
              public caresService: CaresService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.caresForm = this.fb.group({
      'guestName': [''],
      'guestPhoneNumber': [''],
      'category': ['', [Validators.required]],
      'issue': ['', [Validators.required]],
      'otherExplanation': [''],
      'modeOfVisit': ['', [Validators.required]],
      'teamMemberPosition': [''],
      'leaderName': ['', [Validators.required]]
    });
  }

  updateForm(control: string, value: boolean) {
    if (value === true) {
      this.caresForm.controls[control]?.setValidators(Validators.required);
      this.caresForm.controls[control]?.updateValueAndValidity();
    }
    if (value === false) {
      this.caresForm.controls[control]?.clearValidators();
      this.caresForm.controls[control]?.updateValueAndValidity();
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.value;
  }

  onIssueChange(event: any) {
    if (event.value.length === 0) {
      this.other = false;
      this.updateForm('otherExplanation', false);
    }
    for (let i = 0; i < event.value.length; i++) {
      if (event.value[i] === 'other') {
        this.other = true;
        this.updateForm('otherExplanation', true);
        break;
      }
      else {
        this.other = false;
        this.updateForm('otherExplanation', false);
      }
    }
  }
  
  getFormErrors(el: string) {
    switch (el) {
      case 'guestName':
        if (this.caresForm.controls['guestName'].hasError('required')) {
          return 'Guest name is required.';
        }
        else return;
      case 'category':
        if (this.caresForm.controls['category'].hasError('required')) {
          return 'Category is required.';
        }
        else return;
      case 'issue':
        if (this.caresForm.controls['issue'].hasError('required')) {
          return 'Issue is required.';
        }
        else return;
      case 'otherExplanation':
        if (this.caresForm.controls['otherExplanation'].hasError('required')) {
          return 'An explanation is required.';
        }
        else return;
      case 'modeOfVisit':
        if (this.caresForm.controls['modeOfVisit'].hasError('required')) {
          return 'Mode of visit is required.';
        }
        else return;
      case 'leaderName':
        if (this.caresForm.controls['leaderName'].hasError('required')) {
          return 'Leader name is required.';
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.caresForm.invalid) {
      return;
    }
    this.caresService.addCare(formData.value)
      .subscribe(data => {
        console.log(data)
        if (data.success) {
          this.dialogRef.close();
          this.snackBar.open('Data submitted successfully!', 'Dismiss', {
            duration: 3000
          });
        }
      }
    )
  }

}
