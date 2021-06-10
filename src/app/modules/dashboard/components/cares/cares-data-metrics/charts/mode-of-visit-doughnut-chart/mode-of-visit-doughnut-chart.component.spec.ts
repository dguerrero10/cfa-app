import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOfVisitDoughnutChartComponent } from './mode-of-visit-doughnut-chart.component';

describe('ModeOfVisitDoughnutChartComponent', () => {
  let component: ModeOfVisitDoughnutChartComponent;
  let fixture: ComponentFixture<ModeOfVisitDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeOfVisitDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOfVisitDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
