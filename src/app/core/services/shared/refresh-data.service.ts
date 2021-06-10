import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {
  private _refresh = new BehaviorSubject<boolean>(false);
  public refreshData = this._refresh.asObservable();

  constructor() { }

  refresh(value: boolean) {
    this._refresh.next(value)
  }

}
