import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterTrackerService {
  private routerTracker = new Subject;
  public routerTrackerListener = this.routerTracker.asObservable();

  constructor() { }

  currentRoute(route:string) {
    this.routerTracker.next(route);
  }

}
