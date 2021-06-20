import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowingTracker } from 'src/app/shared/models/form-table/borrowing-tracker.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingTrackerService {
  private endpoint: string = "http://localhost:3000/api/borrowing-tracker";
  private endpointDelete: string = "http://localhost:3000/api/borrowing-tracker/delete";

  constructor(private http: HttpClient) { }

  addBorrowingTrackerItem(borrowingTracker: BorrowingTracker) {
    return this.http.post<{ success: boolean }>(this.endpoint, borrowingTracker);
  }

  getBorrowingTrackerItems() {
    return this.http.get<{ success: boolean; borrowingTrackerData: BorrowingTracker[] }>(this.endpoint);
  }

  deleteBorrowingTrackerData(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpointDelete, rowIds)
  }

}
