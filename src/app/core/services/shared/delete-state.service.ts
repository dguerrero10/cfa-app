import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteStateService {
  private deleteVisible = new BehaviorSubject<boolean>(false);
  public deleteState = this.deleteVisible.asObservable();

  private delete = new BehaviorSubject<boolean>(false);
  public activateDeleteData = this.delete.asObservable();

  constructor() { }

  changeDeleteState(value: boolean) {
    this.deleteVisible.next(value);
  }

  deleteData(value: boolean) {
    this.delete.next(value);
  }

}
