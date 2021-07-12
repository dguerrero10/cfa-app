import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-missing-items-bar-chart',
  templateUrl: './missing-items-bar-chart.component.html',
  styleUrls: ['./missing-items-bar-chart.component.scss']
})
export class MissingItemsBarChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Missing Items Issues',
    },

  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartPlugins = [];
  public dictMissingItems: any = <any>{};
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
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

  getValues(value: string) {
    this.dictMissingItems[value] = (this.dictMissingItems[value] || 0) + 1;
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        if (item.category === 'Missing items') {
          for (let i = 0; i < item.issue.length; i++) {
            this.getValues(item.issue[i]);
          }
        }
      });
      for (const [key, value] of Object.entries(this.dictMissingItems) as any) {
        this.barChartData[0].data?.push(value);
        this.barChartLabels.push(key)
        if (Object.keys(this.dictMissingItems).length <= 4) {
          this.barChartData[0].barPercentage = .4;
        }
        if (Object.keys(this.dictMissingItems).length <= 2) {
          this.barChartData[0].barPercentage = .2;
        }
      }
    });
  }
}
