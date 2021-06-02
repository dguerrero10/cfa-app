import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDataTableComponent } from './attendance-data-table.component';

describe('AttendanceDataTableComponent', () => {
  let component: AttendanceDataTableComponent;
  let fixture: ComponentFixture<AttendanceDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
