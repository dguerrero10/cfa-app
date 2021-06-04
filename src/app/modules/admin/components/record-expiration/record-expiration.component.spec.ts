import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordExpirationComponent } from './record-expiration.component';

describe('RecordExpirationComponent', () => {
  let component: RecordExpirationComponent;
  let fixture: ComponentFixture<RecordExpirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordExpirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
