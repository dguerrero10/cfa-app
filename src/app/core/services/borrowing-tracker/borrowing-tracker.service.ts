import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { BorrowingTracker } from 'src/app/shared/models/form-table/borrowing-tracker.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingTrackerService {
  private endpoint: string = "http://localhost:3000/api/borrowing-tracker";

  constructor(private http: HttpClient) { }

  addBorrowingTrackerItem(borrowingTracker: BorrowingTracker) {
    return this.http.post<{ success: boolean }>(this.endpoint, borrowingTracker);
  }

  getBorrowingTrackerItems(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get
          <{ success: boolean; borrowingTrackerData: BorrowingTracker[], itemCount: number 
           }>(this.endpoint + queryParams);
  }

  deleteBorrowingTrackerData(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpoint + '/delete', rowIds)
  }

}
