import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresDataTableComponent } from './cares-data-table.component';

describe('CaresDataTableComponent', () => {
  let component: CaresDataTableComponent;
  let fixture: ComponentFixture<CaresDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaresDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
