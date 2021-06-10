import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Component({
  selector: 'app-food-quality-bar-chart',
  templateUrl: './food-quality-bar-chart.component.html',
  styleUrls: ['./food-quality-bar-chart.component.scss']
})
export class FoodQualityBarChartComponent implements OnInit {
  public barChartLabels: Label[] = ['Food Cold', 'Food Undercooked', 'Food Overcooked', 'Poor Taste', 'Other'];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Food Quality Issues' }];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
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

  public foodColdCounter: number = 0;
  public foodUndercookedCounter: number = 0;
  public foodOvercookedCounter: number = 0;
  public poorTasteCounter: number = 0;
  public otherCounter: number = 0;

  constructor(private shareChartDataService: ShareChartDataService) { }

  getValue(value: string) {
    switch (value) {
      case 'Food Cold':
        this.foodColdCounter++;
        break;
      case 'Food Undercooked':
        this.foodUndercookedCounter++;
        break;
      case 'Food Overcooked':
        this.foodOvercookedCounter++;
        break;
      case 'Poor Taste':
        this.poorTasteCounter++;
        break;
      case 'Other':
        this.otherCounter++;
        break;
    }
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: Care) => {
        if (item.category === 'Food Quality') {
          for (let i = 0; i < item.issue.length; i++) {
            this.getValue(item.issue[i]);
          }
        }
      });
      this.barChartData[0].data?.push(
        this.foodColdCounter,
        this.foodUndercookedCounter,
        this.foodOvercookedCounter,
        this.poorTasteCounter,
        this.otherCounter
      );
    });
  }
}
