import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongItemsBarChartComponent } from './wrong-items-bar-chart.component';

describe('WrongItemsBarChartComponent', () => {
  let component: WrongItemsBarChartComponent;
  let fixture: ComponentFixture<WrongItemsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongItemsBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongItemsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
