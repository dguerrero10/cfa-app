import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderMobileComponent } from './item-order-mobile.component';

describe('ItemOrderMobileComponent', () => {
  let component: ItemOrderMobileComponent;
  let fixture: ComponentFixture<ItemOrderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrderMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
