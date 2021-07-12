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
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public chartData: number[] = [];
  public dictModeOfVisit: any = <any>{};
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(78, 137, 174, .8)',
        'rgba(67, 101, 139, .8)',
        'rgba(237, 102, 99, .8)',
        'rgba(255, 163, 114, .8)',
        'rgba(123, 17, 58, .8)'
      ]
    }
  ];

  constructor(public shareChartDataService: ShareChartDataService) { }

  getValues(value: string) {
    this.dictModeOfVisit[value] = (this.dictModeOfVisit[value] || 0) + 1;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        this.getValues(item.modeOfVisit);
      });
      for (const [key, value] of Object.entries(this.dictModeOfVisit) as any) {
        this.chartData.push(value);
        this.doughnutChartLabels.push(key + " Issues");
      }
    });
    this.doughnutChartData.push(this.chartData);
  }
}
