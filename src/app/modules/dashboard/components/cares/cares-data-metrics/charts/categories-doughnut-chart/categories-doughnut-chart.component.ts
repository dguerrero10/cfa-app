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
  public doughnutChartLabels: Label[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public dataRefreshed: boolean = false;
  public doughnutChartData: MultiDataSet = [];
  public dictCategories: any = <any>{};
  public chartData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(78, 137, 174, .9)',
        'rgba(67, 101, 139, .9)',
        'rgba(237, 102, 99, .9)',
        'rgba(255, 163, 114, .9)',
        'rgba(123, 17, 58, .9)'
      ]
    }
  ];

  constructor(public shareChartDataService: ShareChartDataService) { }

  getValues(value: string) {
    this.dictCategories[value] = (this.dictCategories[value] || 0) + 1;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        this.getValues(item.category)
      });
      for (const [key, value] of Object.entries(this.dictCategories) as any) {
        this.chartData.push(value)
        this.doughnutChartLabels.push(key + " Issues")
      }
    });
    this.doughnutChartData.push(this.chartData);
  }
}