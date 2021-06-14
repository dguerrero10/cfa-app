import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutLineChartComponent } from './call-out-line-chart.component';

describe('CallOutLineChartComponent', () => {
  let component: CallOutLineChartComponent;
  let fixture: ComponentFixture<CallOutLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallOutLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
