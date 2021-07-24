import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccountabilityMobileComponent } from './cash-accountability-mobile.component';

describe('CashAccountabilityMobileComponent', () => {
  let component: CashAccountabilityMobileComponent;
  let fixture: ComponentFixture<CashAccountabilityMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashAccountabilityMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccountabilityMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
