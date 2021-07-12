import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareChartDataService {
  private dataSource = new BehaviorSubject<[]>([]);
  public currentData = this.dataSource.asObservable();

  constructor() { }

  shareData(data: any) {
    this.dataSource.next(data);
  }

}
