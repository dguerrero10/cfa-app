import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteStateService {
  private deleteVisible = new BehaviorSubject<boolean>(false);
  public deleteVisibleListener = this.deleteVisible.asObservable();

  private _deleteData = new BehaviorSubject<boolean>(false);
  public deleteDataListener = this._deleteData.asObservable();

  constructor() { }

  changeDeleteState(value: boolean) {
    this.deleteVisible.next(value);
  }

  deleteData(value: boolean) {
    this._deleteData.next(value);
  }

}
