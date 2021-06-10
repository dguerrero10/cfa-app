import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIssueLineChartComponent } from './time-issue-line-chart.component';

describe('TimeIssueLineChartComponent', () => {
  let component: TimeIssueLineChartComponent;
  let fixture: ComponentFixture<TimeIssueLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIssueLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIssueLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
