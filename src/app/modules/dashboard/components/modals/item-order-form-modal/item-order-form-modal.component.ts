import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-order-form-modal',
  templateUrl: './item-order-form-modal.component.html',
  styleUrls: ['./item-order-form-modal.component.scss']
})
export class ItemOrderFormModalComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  areaCtrl = new FormControl();
  itemCtrl = new FormControl();
  filteredAreas: Observable<string[]>;
  filteredItems: Observable<string[]>;
  areas: string[] = [];
  items: string[] = [];
  allAreas: string[] = [];
  allItems: string[] = [];

  @ViewChild('areaInput') areaInput?: ElementRef<HTMLInputElement>;
  @ViewChild('itemInput') itemInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor() {
    this.filteredAreas = this.areaCtrl.valueChanges.pipe(
      startWith(null),
      map((area: string | null) => area ? this._filterArea(area) : this.allAreas.slice()));

    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filterItem(item) : this.allItems.slice()));
  }

  ngOnInit(): void { }

  addArea(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.areas.push(value);
    }

    event.chipInput!.clear();

    this.areaCtrl.setValue(null);
  }

  addItem(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.items.push(value);
    }

    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  removeArea(area: string): void {
    const index = this.areas.indexOf(area);

    if (index >= 0) {
      this.areas.splice(index, 1);
    }
  }

  removeItem(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selectedAreas(event: MatAutocompleteSelectedEvent): void {
    this.areas.push(event.option.viewValue);
    // this.areaInput.nativeElement.value = '' ;
    this.areaCtrl.setValue(null);
  }

  selectedItems(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    // this.areaInput.nativeElement.value = '' ;
    this.itemCtrl.setValue(null);
  }

  private _filterArea(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAreas.filter(area => area.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterItem(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }
}
