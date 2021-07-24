import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTrackerMobileComponent } from './borrowing-tracker-mobile.component';

describe('BorrowingTrackerMobileComponent', () => {
  let component: BorrowingTrackerMobileComponent;
  let fixture: ComponentFixture<BorrowingTrackerMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingTrackerMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingTrackerMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
