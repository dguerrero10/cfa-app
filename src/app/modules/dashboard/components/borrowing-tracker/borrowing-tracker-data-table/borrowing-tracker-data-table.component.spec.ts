import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTrackerDataTableComponent } from './borrowing-tracker-data-table.component';

describe('BorrowingTrackerDataTableComponent', () => {
  let component: BorrowingTrackerDataTableComponent;
  let fixture: ComponentFixture<BorrowingTrackerDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingTrackerDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingTrackerDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
