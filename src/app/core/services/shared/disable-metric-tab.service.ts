import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisableMetricTabService {
  private noData = new BehaviorSubject<boolean>(false);
  public currentMetricState = this.noData.asObservable();

  constructor() { }

  switchState(value: boolean) {
    this.noData.next(value);
  }
}
