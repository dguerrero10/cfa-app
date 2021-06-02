import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTrackerComponent } from './borrowing-tracker.component';

describe('BorrowingTrackerComponent', () => {
  let component: BorrowingTrackerComponent;
  let fixture: ComponentFixture<BorrowingTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
