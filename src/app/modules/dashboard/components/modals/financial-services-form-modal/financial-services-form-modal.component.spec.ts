import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialServicesFormModalComponent } from './financial-services-form-modal.component';

describe('FinancialServicesFormModalComponent', () => {
  let component: FinancialServicesFormModalComponent;
  let fixture: ComponentFixture<FinancialServicesFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialServicesFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialServicesFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
