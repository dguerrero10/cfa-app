import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Injectable({
  providedIn: 'root'
})
export class CaresService {
  private endpoint: string = "http://localhost:3000/api/cares";

  constructor(private http: HttpClient) { }

  addCare(care: Care) {
    return this.http.post<{ success: boolean }>(this.endpoint, care);
  }

  getCares(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get
          <{ success: boolean; caresData: Care[], itemCount: number 
           }>(this.endpoint + queryParams);
  }

  deleteCares(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpoint + '/delete', rowIds)
  }

}
