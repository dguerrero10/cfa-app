import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Component({
  selector: 'app-boh-foh-doughnut-chart',
  templateUrl: './boh-foh-doughnut-chart.component.html',
  styleUrls: ['./boh-foh-doughnut-chart.component.scss']
})
export class BohFohDoughnutChartComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['BOH Call In', 'FOH Call In'];
  public doughnutChartType: ChartType = 'doughnut';
  public dataRefreshed: boolean = false;
  public doughnutChartData: MultiDataSet = [];
  public chartData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgb(50, 165, 88, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ]
    }
  ];

  public bohCallInCounter: number = 0;
  public fohCallInCounter: number = 0;

  constructor(public shareChartDataService: ShareChartDataService) { }

  getValue(value: string) {
    switch(value) {
      case 'BOH':
        this.bohCallInCounter++;
        break;
      case 'FOH':
        this.fohCallInCounter++;
        break;
    }
  }

  ngOnInit(): void {
    this.shareChartDataService.currentData.subscribe(data => {
      Object.values(data).forEach((item: TeamMemberAttendance) => {
       this.getValue(item.workArea);
      });
      this.chartData.push(
        this.bohCallInCounter,
        this.fohCallInCounter
      )
    });
    this.doughnutChartData.push(this.chartData);
  }
}
