import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserWarningModalComponent } from './delete-user-warning-modal.component';

describe('DeleteUserWarningModalComponent', () => {
  let component: DeleteUserWarningModalComponent;
  let fixture: ComponentFixture<DeleteUserWarningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserWarningModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
