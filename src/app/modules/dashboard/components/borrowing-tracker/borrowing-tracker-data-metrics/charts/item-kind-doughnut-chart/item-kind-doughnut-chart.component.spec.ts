import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemKindDoughnutChartComponent } from './item-kind-doughnut-chart.component';

describe('ItemKindDoughnutChartComponent', () => {
  let component: ItemKindDoughnutChartComponent;
  let fixture: ComponentFixture<ItemKindDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemKindDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemKindDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
