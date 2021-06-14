import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccountabilityDataTableComponent } from './cash-accountability-data-table.component';

describe('CashAccountabilityDataTableComponent', () => {
  let component: CashAccountabilityDataTableComponent;
  let fixture: ComponentFixture<CashAccountabilityDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashAccountabilityDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccountabilityDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
