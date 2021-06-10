import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-time-issue-line-chart',
  templateUrl: './time-issue-line-chart.component.html',
  styleUrls: ['./time-issue-line-chart.component.scss']
})
export class TimeIssueLineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  lineChartData: ChartDataSets[] = [
    { data: [12, 9, 3, 8, 7], label: 'Issues by Time' },
  ];

  lineChartLabels: Label[] = ['8am', '12pm', '4pm', '8pm', 'Close'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(47, 139, 192, .28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  
}
