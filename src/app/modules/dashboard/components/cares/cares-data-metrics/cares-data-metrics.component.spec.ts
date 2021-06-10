import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresDataMetricsComponent } from './cares-data-metrics.component';

describe('CaresDataMetricsComponent', () => {
  let component: CaresDataMetricsComponent;
  let fixture: ComponentFixture<CaresDataMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaresDataMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresDataMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
