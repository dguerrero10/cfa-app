import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresFormModalComponent } from './cares-form-modal.component';

describe('CaresFormModalComponent', () => {
  let component: CaresFormModalComponent;
  let fixture: ComponentFixture<CaresFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaresFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
