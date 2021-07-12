import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { BorrowingTracker } from 'src/app/shared/models/form-table/borrowing-tracker.model';

@Component({
  selector: 'app-item-kind-doughnut-chart',
  templateUrl: './item-kind-doughnut-chart.component.html',
  styleUrls: ['./item-kind-doughnut-chart.component.scss']
})
export class ItemKindDoughnutChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public dataRefreshed: boolean = false;
  public doughnutChartData: MultiDataSet = [];
  public chartData: number[] = [];
  public dictKindOfItems: any = <any>{};

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
    this.dictKindOfItems[value] = (this.dictKindOfItems[value] || 0) + 1;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: BorrowingTracker) => {
        this.getValues(item.itemBorrowed);
      });
      for (const [key, value] of Object.entries(this.dictKindOfItems) as any) {
        this.chartData.push(value)
        this.doughnutChartLabels.push(key + " Item")
      }
    });
    this.doughnutChartData.push(this.chartData);
  }
}