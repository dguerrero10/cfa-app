import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountOfItemBarChartComponent } from './amount-of-item-bar-chart.component';

describe('AmountOfItemBarChartComponent', () => {
  let component: AmountOfItemBarChartComponent;
  let fixture: ComponentFixture<AmountOfItemBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountOfItemBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountOfItemBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
