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
  public barChartLabels: Label[] = ['Entrees', 'Drinks', 'Sides', 'Napkins', 'Sauces', 'Other'];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Missing Items Issues' }];
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
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
    },
  ];

  public entreesCounter: number = 0;
  public drinksCounter: number = 0;
  public sidesCounter: number = 0;
  public napkinsCounter: number = 0;
  public saucesCounter: number = 0;
  public otherCounter: number = 0;

  constructor(private shareChartDataService: ShareChartDataService) { }

  getValue(value: string) {
    switch (value) {
      case 'Entree':
        this.entreesCounter++;
        break;
      case 'Drink':
        this.drinksCounter++;
        break;
      case 'Side':
        this.sidesCounter++;
        break;
      case 'Napkins':
        this.napkinsCounter++;
        break;
      case 'Sauces':
        this.napkinsCounter++;
        break;
      case 'Other':
        this.otherCounter++;
        break;
    }
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        if (item.category === 'Missing Items') {
          for (let i = 0; i < item.issue.length; i++) {
            this.getValue(item.issue[i]);
          }
        }
      });
    });
    this.barChartData[0].data?.push(
      this.entreesCounter,
      this.drinksCounter,
      this.sidesCounter,
      this.napkinsCounter,
      this.saucesCounter,
      this.otherCounter
    );
  }
}
