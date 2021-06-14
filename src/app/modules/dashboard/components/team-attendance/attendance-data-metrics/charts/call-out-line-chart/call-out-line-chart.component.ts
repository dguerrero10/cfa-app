import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-call-out-line-chart',
  templateUrl: './call-out-line-chart.component.html',
  styleUrls: ['./call-out-line-chart.component.scss']
})
export class CallOutLineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lineChartData: ChartDataSets[] = [
    { data: [8, 2, 3, 8, 1], label: 'Call Outs by Time' },
  ];

  lineChartLabels: Label[] = ['5:30', '8am', '12pm', '4pm'];

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
