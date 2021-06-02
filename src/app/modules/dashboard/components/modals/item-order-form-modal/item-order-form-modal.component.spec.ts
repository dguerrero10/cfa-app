import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderFormModalComponent } from './item-order-form-modal.component';

describe('ItemOrderFormModalComponent', () => {
  let component: ItemOrderFormModalComponent;
  let fixture: ComponentFixture<ItemOrderFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrderFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrderFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
