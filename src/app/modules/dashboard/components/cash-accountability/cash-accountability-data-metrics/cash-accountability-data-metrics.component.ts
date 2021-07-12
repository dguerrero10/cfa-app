import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-accountability-data-metrics',
  templateUrl: './cash-accountability-data-metrics.component.html',
  styleUrls: ['./cash-accountability-data-metrics.component.scss']
})
export class CashAccountabilityDataMetricsComponent implements OnInit {
  public timeFrame: string = <string>('1 Month');
  public timeFrames = [
    {value: 31, name: '1 Month'},
    {value: 93, name: '3 Months'},
    {value: 186, name: '6 Months'},
    {value: 279, name: '9 Months'},
    {value: 365, name: '12 Months'},
  ];

  getData(event: any) {
    switch(event.value) {
      case 31:
        this.timeFrame = '1 Month';
        break;
      case 93: 
        this.timeFrame = '3 Months';
        break;
      case 186:
        this.timeFrame = '6 Months';
        break;
      case 279:
        this.timeFrame = '9 Months';
        break;
      case 365:
        this.timeFrame = '12 Months';
        break;
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

}
