import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { CashAccountability } from 'src/app/shared/models/form-table/cash-accountability.model';

@Component({
  selector: 'app-shortage-overage-doughnut-chart',
  templateUrl: './shortage-overage-doughnut-chart.component.html',
  styleUrls: ['./shortage-overage-doughnut-chart.component.scss']
})
export class ShortageOverageDoughnutChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public dataRefreshed: boolean = false;
  public doughnutChartData: MultiDataSet = [];
  public chartData: number[] = [];
  public dictShortageOverage: any = <any>{};
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(78, 137, 174, .9)',
        'rgba(237, 102, 99, .9)',
        'rgba(255, 163, 114, .9)',
        'rgba(123, 17, 58, .9)'
      ]
    }
  ];

  constructor(public shareChartDataService: ShareChartDataService) { }

  getValues(value: string) {
    this.dictShortageOverage[value] = (this.dictShortageOverage[value] || 0) + 1;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: CashAccountability) => {
        console.log(data)
        this.getValues(item.shortageOverage);
      });
      for (const [key, value] of Object.entries(this.dictShortageOverage) as any) {
        this.chartData.push(value);
        this.doughnutChartLabels.push(key);
      }
    });
    this.doughnutChartData.push(this.chartData);
  }
}

