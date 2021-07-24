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
