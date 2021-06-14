import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTrackerDataMetricsComponent } from './borrowing-tracker-data-metrics.component';

describe('BorrowingTrackerDataMetricsComponent', () => {
  let component: BorrowingTrackerDataMetricsComponent;
  let fixture: ComponentFixture<BorrowingTrackerDataMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingTrackerDataMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingTrackerDataMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
