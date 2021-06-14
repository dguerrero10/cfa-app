import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccountabilityDataMetricsComponent } from './cash-accountability-data-metrics.component';

describe('CashAccountabilityDataMetricsComponent', () => {
  let component: CashAccountabilityDataMetricsComponent;
  let fixture: ComponentFixture<CashAccountabilityDataMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashAccountabilityDataMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccountabilityDataMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
