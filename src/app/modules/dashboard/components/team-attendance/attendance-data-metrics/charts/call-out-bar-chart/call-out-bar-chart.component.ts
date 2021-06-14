import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { TeamMemberAttendance } from 'src/app/shared/models/form-table/team-member-attendance.model';

@Component({
  selector: 'app-call-out-bar-chart',
  templateUrl: './call-out-bar-chart.component.html',
  styleUrls: ['./call-out-bar-chart.component.scss']
})
export class CallOutBarChartComponent implements OnInit {
  public endpoint: string = 'http://localhost:3000/api/team-members-attendance';
  public barChartLabels: Label[] = ['Personal Reasons', 'Sick', 'Emergency', 'Other'];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Call Outs' }];
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

  public personalReasonsCounter: number = 0;
  public sickCounter: number = 0;
  public sickEmergencyCounter: number = 0;
  public otherCounter: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<TeamMemberAttendance>(this.endpoint).
      subscribe(data => {
        console.log(data)
        Object.values(data)[1].forEach((item: TeamMemberAttendance) => {
          if (item.issue === 'Personal Reasons') {
            this.personalReasonsCounter++;
          }
          if (item.issue === 'Sick') {
            this.sickCounter++;
          }
          if (item.issue === 'Emergency') {
            this.sickEmergencyCounter++;
          }
          if (item.issue === 'Other') {
            this.otherCounter++;
          }
        });
        this.barChartData[0].data?.push(
          this.personalReasonsCounter,
          this.sickCounter,
          this.sickEmergencyCounter,
          this.otherCounter
        );
      });
  }
}
