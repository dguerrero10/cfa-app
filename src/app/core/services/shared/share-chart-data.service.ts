import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Injectable({
  providedIn: 'root'
})
export class ShareChartDataService {
  private dataSource = new BehaviorSubject<Care[]>([]);
  public currentData = this.dataSource.asObservable();

  constructor() { }

  shareData(data: any) {
    this.dataSource.next(data);
  }

}
