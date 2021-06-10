import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingItemsBarChartComponent } from './missing-items-bar-chart.component';

describe('MissingItemsBarChartComponent', () => {
  let component: MissingItemsBarChartComponent;
  let fixture: ComponentFixture<MissingItemsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingItemsBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingItemsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
