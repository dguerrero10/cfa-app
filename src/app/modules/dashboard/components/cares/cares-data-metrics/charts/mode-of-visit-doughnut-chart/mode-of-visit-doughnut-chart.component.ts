import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-mode-of-visit-doughnut-chart',
  templateUrl: './mode-of-visit-doughnut-chart.component.html',
  styleUrls: ['./mode-of-visit-doughnut-chart.component.scss']
})
export class ModeOfVisitDoughnutChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Drive Through Issues', 'Dine In Issues', 'Delivery Issues'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public chartData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgb(50, 165, 88, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }
  ];

  public driveThroughCounter: number = 0;
  public dineInCounter: number = 0;
  public deliveryCounter: number = 0;

  getValues(value: string) {
    switch(value) {
      case 'Drive Through':
        this.driveThroughCounter++;
        break;
      case 'Dine In':
          this.dineInCounter++;
        break;
      case 'Delivery':
        this.dineInCounter++;
        break;
    }
  }

 constructor(public shareChartDataService: ShareChartDataService) { }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        this.getValues(item.modeOfVisit);
      });
      this.chartData.push(
        this.driveThroughCounter,
        this.dineInCounter,
        this.deliveryCounter
      );
    });
    this.doughnutChartData.push(this.chartData);
  }
}
