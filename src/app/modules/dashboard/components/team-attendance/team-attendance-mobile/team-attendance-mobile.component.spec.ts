import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceMobileComponent } from './team-attendance-mobile.component';

describe('TeamAttendanceMobileComponent', () => {
  let component: TeamAttendanceMobileComponent;
  let fixture: ComponentFixture<TeamAttendanceMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAttendanceMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
