import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTrackerFormModalComponent } from './borrowing-tracker-form-modal.component';

describe('BorrowingTrackerFormModalComponent', () => {
  let component: BorrowingTrackerFormModalComponent;
  let fixture: ComponentFixture<BorrowingTrackerFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingTrackerFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingTrackerFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
