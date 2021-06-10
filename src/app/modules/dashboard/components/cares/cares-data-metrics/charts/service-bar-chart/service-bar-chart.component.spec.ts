import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBarChartComponent } from './service-bar-chart.component';

describe('ServiceBarChartComponent', () => {
  let component: ServiceBarChartComponent;
  let fixture: ComponentFixture<ServiceBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
