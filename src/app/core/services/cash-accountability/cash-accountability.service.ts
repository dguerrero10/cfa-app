import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CashAccountability } from 'src/app/shared/models/form-table/cash-accountability.model';

@Injectable({
  providedIn: 'root'
})
export class CashAccountabilityService {
  public endpoint: string = "http://localhost:3000/api/cash-accountability";

  constructor(private http: HttpClient) { }

  addCashAccountability(cashAccountability: CashAccountability) {
    return this.http.post<{ success: boolean }>(this.endpoint, cashAccountability);
  }

  getCashAccountability() {
    return this.http.get<{ success: boolean; cashAccountabilityData: CashAccountability[] }>(this.endpoint);
  }

  deleteData(t:any) {
    console.log('deleted')
  }
}
