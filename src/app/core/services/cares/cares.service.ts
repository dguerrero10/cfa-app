import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Care } from 'src/app/shared/models/form-table/cares.model';

@Injectable({
  providedIn: 'root'
})
export class CaresService {
  endpoint = "http://localhost:3000/api/cares";

  constructor(private http: HttpClient) { }

  addCare(care: Care) {
    return this.http.post<{ success: boolean }>(this.endpoint, care);
  }

  getCares() {
    return this.http.get<{ success: boolean; care: Care[] }>(this.endpoint);
  }

}
