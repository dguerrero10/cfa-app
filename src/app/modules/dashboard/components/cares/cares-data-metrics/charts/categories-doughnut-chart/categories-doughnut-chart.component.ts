import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts'
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-categories-doughnut-chart',
  templateUrl: './categories-doughnut-chart.component.html',
  styleUrls: ['./categories-doughnut-chart.component.scss']
})
export class CategoriesDoughnutChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Food Quality Issues', 'Service Issues', 'Missing Items Issues'];
  public doughnutChartType: ChartType = 'doughnut';
  public dataRefreshed: boolean = false;
  public doughnutChartData: MultiDataSet = [];
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

  public foodQualityCounter: number = 0;
  public serviceCounter: number = 0;
  public missingItemsCounter: number = 0;

  constructor(public shareChartDataService: ShareChartDataService) { }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        if (item.category === 'Food Quality') {
          this.foodQualityCounter++;
        }
        if (item.category === 'Service') {
          this.serviceCounter++;
        }
        if (item.category === 'Missing Items') {
          this.missingItemsCounter++;
        }
      });
      this.chartData.push(
        this.foodQualityCounter,
        this.serviceCounter,
        this.missingItemsCounter)
 
    });
    this.doughnutChartData.push(this.chartData);
  }
}