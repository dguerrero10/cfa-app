import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {
  private refresh = new BehaviorSubject<boolean>(false);
  public dataRefreshed = this.refresh.asObservable();

  constructor() { }

  refreshData(value: boolean) {
    this.refresh.next(value)
  }

}
