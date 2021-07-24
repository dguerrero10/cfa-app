import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaresService } from 'src/app/core/services/cares/cares.service';
import { CATEGORIES, FOOD_QUALITY, MISSING_ITEMS, MODES_OF_VISIT, SERVICES } from 'src/app/shared/data/forms/cares';

@Component({
  selector: 'app-cares-mobile',
  templateUrl: './cares-mobile.component.html',
  styleUrls: ['./cares-mobile.component.scss']
})
export class CaresMobileComponent implements OnInit {
  public caresForm: FormGroup = <FormGroup>{};
  public categories = CATEGORIES;
  public modesOfVisit = MODES_OF_VISIT;
  public foodQuality = FOOD_QUALITY;
  public services = SERVICES;
  public missingItems = MISSING_ITEMS;
  public selectedCategory: string = '';
  public other: boolean = false;
  public submitting: boolean = false;

  constructor(private fb: FormBuilder,
              public caresService: CaresService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.caresForm = this.fb.group({
      'guestName': ['', [Validators.required]],
      'guestPhoneNumber': [''],
      'category': ['', [Validators.required]],
      'issue': ['', [Validators.required]],
      'otherExplanation': ['', [Validators.required]],
      'modeOfVisit': ['', [Validators.required]],
      'teamMemberPosition': [''],
      'leaderFirstName': ['', [Validators.required]],
      'leaderLastName': ['', [Validators.required]]
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
      case 'leaderFirstName':
        if (this.caresForm.controls['leaderFirstName'].hasError('required')) {
          return "Leader's first name is required.";
        }
        else return;
      case 'leaderLastName':
        if (this.caresForm.controls['leaderLastName'].hasError('required')) {
          return "Leader's last name is required.";
        }
        else return;
      default:
        return;
    }
  }

  prepareData(formData: FormGroup) {
    let items = ['category', 'modeOfVisit']
    // Control values that need data transformed
    for (let i = 0; i < items.length; i++) {
      // Call prepString function on control items
      let stringArray = formData.value[items[i]].split('_');
      let transformedString = stringArray.join(' ');
      // Set form data with transformed data
      formData.controls[items[i]].setValue(transformedString);
    }
    // Iterate through array of issues of issue control and transform them
    const transformedIssues = [];
    for (let i = 0; i < formData.value.issue.length; i++) {
      // Transform each item in array
      let stringArray = formData.value.issue[i].split('_');
      let transformedString = stringArray.join(' ');
      // Push to new array
      transformedIssues.push(transformedString)
    }
    // Switch old issue array with transformed issue array
    formData.controls.issue.setValue(transformedIssues);
    return formData;
  }


  onSubmit(formData: FormGroup) {
    if (this.caresForm.invalid) {
      return;
    }
    this.submitting = true;
    this.prepareData(formData);
    if (!formData.value.teamMemberPosition.length) {
      formData.controls.teamMemberPosition.setValue('N/A');
    }
    this.caresService.addCare(formData.value).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Data submitted successfully!', 'Dismiss', {
          duration: 1000
        });
      }
    });
  }
}
