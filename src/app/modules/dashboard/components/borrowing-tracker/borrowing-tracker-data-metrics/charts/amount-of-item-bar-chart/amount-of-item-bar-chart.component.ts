import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { BorrowingTracker } from 'src/app/shared/models/form-table/borrowing-tracker.model';

@Component({
  selector: 'app-amount-of-item-bar-chart',
  templateUrl: './amount-of-item-bar-chart.component.html',
  styleUrls: ['./amount-of-item-bar-chart.component.scss']
})
export class AmountOfItemBarChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], 
      label: 'Amount of Item Borrowed',
      barPercentage: 0.5
     }];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public dictamountOfItems: any = <any>{};
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(78, 137, 174, .7)',
        'rgba(67, 101, 139, .7)',
        'rgba(237, 102, 99, .7)',
        'rgba(255, 163, 114, .7)',
        'rgba(123, 17, 58, .7)',
        'rgba(0, 168, 204, .7)'
      ],
      borderColor: [
        'rgba(78, 137, 174)',
        'rgba(67, 101, 139)',
        'rgba(237, 102, 99)',
        'rgba(255, 163, 114)',
        'rgba(123, 17, 58)',
        'rgb(0, 168, 204)'
      ],
      borderWidth: 3
    }
  ];

  constructor(private shareChartDataService: ShareChartDataService) { }

  getValues(value: number, itemBorrowed: string) {
    this.dictamountOfItems[itemBorrowed] = (this.dictamountOfItems[itemBorrowed] || 0) + value;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: BorrowingTracker) => {
        this.getValues(item.amountOfItem, item.itemBorrowed)
      });
      for (const [key, value] of Object.entries(this.dictamountOfItems) as any) {
        this.barChartData[0].data?.push(value);
        this.barChartLabels.push(key);
        if (Object.keys(this.dictamountOfItems).length <= 4) {
          this.barChartData[0].barPercentage = .4;
        }
        if (Object.keys(this.dictamountOfItems).length <= 2) {
          this.barChartData[0].barPercentage = .2;
        }
      }
    });
  }
}

