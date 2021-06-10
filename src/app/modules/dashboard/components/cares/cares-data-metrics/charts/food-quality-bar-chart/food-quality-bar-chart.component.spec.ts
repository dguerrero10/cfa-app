import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodQualityBarChartComponent } from './food-quality-bar-chart.component';

describe('FoodQualityBarChartComponent', () => {
  let component: FoodQualityBarChartComponent;
  let fixture: ComponentFixture<FoodQualityBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodQualityBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodQualityBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
