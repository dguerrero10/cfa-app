import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDoughnutChartComponent } from './categories-doughnut-chart.component';

describe('CategoriesDoughnutChartComponent', () => {
  let component: CategoriesDoughnutChartComponent;
  let fixture: ComponentFixture<CategoriesDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
