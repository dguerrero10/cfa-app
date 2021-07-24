import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemOrderService } from 'src/app/core/services/item-order/item-order.service';

@Component({
  selector: 'app-item-order-mobile',
  templateUrl: './item-order-mobile.component.html',
  styleUrls: ['./item-order-mobile.component.scss']
})
export class ItemOrderMobileComponent implements OnInit {
  public visible: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public otherRadioSelected: boolean = false;
  public otherSelectSelected: boolean = false;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public itemCtrl = new FormControl(Validators.required);
  public filteredItems: Observable<string[]>;
  public items: string[] = [];
  public allItems: string[] = [];
  public areasSerched = [
    {
      value: 'Office',
      name: 'Office'
    },
    {
      value: 'Playground',
      name: 'Playground'
    },
    {
      value: 'Marketing_closet',
      name: 'Marketing closet'
    },
    {
      value: 'Other',
      name: 'Other area'
    }
  ];
  public itemOrderForm: FormGroup = <FormGroup>{};

  @ViewChild('itemInput') itemInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor(public itemOrderService: ItemOrderService,
              public snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filterItem(item) : this.allItems.slice()));
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.itemOrderForm = this.fb.group({
      'workAreaItem': ['BOH'],
      'other': [''],
      'areasSearched': ['', [Validators.required]],
      'otherArea': [''],
      'itemsNeeded': [''],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
    });
  }

  onRadioButtonChange(event: any) {
    if (event.value === 'Other') {
      this.otherRadioSelected = true;
      this.itemOrderForm.controls['other'].setValidators(Validators.required);
      this.itemOrderForm.controls['other'].updateValueAndValidity();
    }
    else {
      this.otherRadioSelected = false;
      this.itemOrderForm.controls['other'].clearValidators();
      this.itemOrderForm.controls['other'].updateValueAndValidity();
    }
  }

  onSelectionChange(event: any) {
    if (event.value.includes('Other')) {
      this.otherSelectSelected = true;
      this.itemOrderForm.controls['otherArea'].setValidators(Validators.required);
      this.itemOrderForm.controls['otherArea'].updateValueAndValidity();
    }
    else {
      this.otherSelectSelected = false;
      this.itemOrderForm.controls['otherArea'].clearValidators();
      this.itemOrderForm.controls['otherArea'].updateValueAndValidity();
    }
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'other':
        if (this.itemOrderForm.controls['other'].hasError('required')) {
          return 'This field is required';
        }
        else return;
      case 'areasSearched':
        if (this.itemOrderForm.controls['areasSearched'].hasError('required')) {
          return 'Areas searched is required.';
        }
        else return;
      case 'otherArea':
        if (this.itemOrderForm.controls['otherArea'].hasError('required')) {
          return 'This field is required.';
        }
        else return;
      case 'itemsNeeded':
          return 'Items needed is required.';
      case 'firstName':
        if (this.itemOrderForm.controls['firstName'].hasError('required')) {
          return 'Your first name is required.';
        }
        else return;
      case 'lastName':
        if (this.itemOrderForm.controls['lastName'].hasError('required')) {
          return 'Your last name is required.';
        }
        else return;
      default:
        return;
    }
  }

  addItem(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.items.push(value);
    }

    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  removeItem(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selectedItems(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemCtrl.setValue(null);
  }

  private _filterItem(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(formData: FormGroup) {
    if (this.items.length > 0) {
      this.itemOrderForm.controls['itemsNeeded'].setValue(this.items);
    }
    if (this.items.length === 0) {
      return;
    }
    if (this.itemOrderForm.invalid) {
      return;
    }
    this.itemOrderService.addItemOrder(formData.value).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Data submitted successfully!', 'Dismiss', {
          duration: 1000
        });
      }
    });
  }
}
