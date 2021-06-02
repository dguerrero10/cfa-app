import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceDataMetricsComponent } from './attendence-data-metrics.component';

describe('AttendenceDataMetricsComponent', () => {
  let component: AttendenceDataMetricsComponent;
  let fixture: ComponentFixture<AttendenceDataMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceDataMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceDataMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
