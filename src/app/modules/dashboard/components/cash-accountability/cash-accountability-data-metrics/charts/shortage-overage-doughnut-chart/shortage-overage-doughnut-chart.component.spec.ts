import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortageOverageDoughnutChartComponent } from './shortage-overage-doughnut-chart.component';

describe('ShortageOverageDoughnutChartComponent', () => {
  let component: ShortageOverageDoughnutChartComponent;
  let fixture: ComponentFixture<ShortageOverageDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortageOverageDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortageOverageDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
