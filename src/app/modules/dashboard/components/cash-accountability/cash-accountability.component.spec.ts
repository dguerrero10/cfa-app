import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccountabilityComponent } from './cash-accountability.component';

describe('CashAccountabilityComponent', () => {
  let component: CashAccountabilityComponent;
  let fixture: ComponentFixture<CashAccountabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashAccountabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccountabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
