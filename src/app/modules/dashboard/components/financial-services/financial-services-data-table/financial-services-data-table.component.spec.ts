import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialServicesDataTableComponent } from './financial-services-data-table.component';

describe('FinancialServicesDataTableComponent', () => {
  let component: FinancialServicesDataTableComponent;
  let fixture: ComponentFixture<FinancialServicesDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialServicesDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialServicesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
