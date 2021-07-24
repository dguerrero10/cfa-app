import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresMobileComponent } from './cares-mobile.component';

describe('CaresMobileComponent', () => {
  let component: CaresMobileComponent;
  let fixture: ComponentFixture<CaresMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaresMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
