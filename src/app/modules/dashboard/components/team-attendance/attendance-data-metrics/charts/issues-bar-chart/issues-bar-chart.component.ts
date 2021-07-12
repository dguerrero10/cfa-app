import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ShareChartDataService } from 'src/app/core/services/shared/share-chart-data.service';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Component({
  selector: 'app-issues-bar-chart',
  templateUrl: './issues-bar-chart.component.html',
  styleUrls: ['./issues-bar-chart.component.scss']
})
export class IssuesBarChart implements OnInit {
  public barChartLabels: Label[] = ['CIP', 'CIS', 'LTW', 'NCNS', 
  'U', 'DNC', 'Other'];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Team Member Issues' }];
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

  public callInPersonalCounter: number = 0;
  public callInSickCounter: number = 0;
  public lateToWorkCounter: number = 0;
  public noCallNoShowCounter: number = 0;
  public uniformCounter: number = 0;
  public didNotCallInCounter: number = 0;
  public otherCounter: number = 0;

  constructor(public shareChartDataSerivce: ShareChartDataService) { }

  ngOnInit(): void {
    this.shareChartDataSerivce.currentData.subscribe(data => {
        Object.values(data).forEach((item: TeamMemberAttendance) => {
          if (item.issue === 'Call in personal') {
            this.callInPersonalCounter++;
          }
          if (item.issue === 'Call in sick') {
            this.callInSickCounter++;
          }
          if (item.issue === 'Late to work') {
            this.lateToWorkCounter++;
          }
          if (item.issue === 'No call no show') {
            this.noCallNoShowCounter++;
          }
          if (item.issue === 'Uniform') {
            this.uniformCounter++;
          }
          if (item.issue === 'Did not call in') {
            this.didNotCallInCounter++;
          }
          if (item.issue === 'Other') {
            this.otherCounter++;
          }
        });
        this.barChartData[0].data?.push(
          this.callInPersonalCounter,
          this.callInSickCounter,
          this.lateToWorkCounter,
          this.noCallNoShowCounter,
          this.uniformCounter,
          this.didNotCallInCounter,
          this.otherCounter
        );
      });
  }
}
