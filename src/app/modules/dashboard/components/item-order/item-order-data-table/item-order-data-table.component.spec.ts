import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderDataTableComponent } from './item-order-data-table.component';

describe('ItemOrderDataTableComponent', () => {
  let component: ItemOrderDataTableComponent;
  let fixture: ComponentFixture<ItemOrderDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrderDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrderDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
