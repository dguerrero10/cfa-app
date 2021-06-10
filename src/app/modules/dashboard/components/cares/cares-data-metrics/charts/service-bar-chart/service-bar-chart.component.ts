import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-service-bar-chart',
  templateUrl: './service-bar-chart.component.html',
  styleUrls: ['./service-bar-chart.component.scss']
})
export class ServiceBarChartComponent implements OnInit {
  public barChartLabels: Label[] = ['Bad Customer Interaction', 'Order Wrong', 'Slow Service', 'Other'];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Service Issues' }];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          },
          // gridLines: { color: 'rgba(255,255,255,0.1)' }
      }]
   }
  };
  barChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgb(50, 165, 88, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(50, 165, 88)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 3
    }
  ];

  constructor(private shareChartDataService: ShareChartDataService) { }

  public badCustomerInteractionCounter: number = 0;
  public orderWrongCounter: number = 0;
  public slowServiceCounter: number = 0;
  public otherCounter: number = 0;

  getValue(value: string) {
    switch (value) {
      case 'Bad CustomerInteraction':
        this.badCustomerInteractionCounter++;
        break;
      case 'Order Wrong':
        this.orderWrongCounter++;
        break;
      case 'Slow Service':
        this.slowServiceCounter++;
        break;
      case 'Other':
        this.otherCounter++;
        break;
    }
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        if (item.category === 'Service') {
          for (let i = 0; i < item.issue.length; i++) {
            this.getValue(item.issue[i]);
          }
        }
      });
      this.barChartData[0].data?.push(
        this.badCustomerInteractionCounter,
        this.orderWrongCounter,
        this.slowServiceCounter,
        this.otherCounter
      );
    });
  }
}
