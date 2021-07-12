import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialService } from 'src/app/shared/models/form-table/financial-services.model';

@Injectable({
  providedIn: 'root'
})
export class FsService {
  private endpoint: string = "http://localhost:3000/api/financial-services";
  private endpointDelete: string = "http://localhost:3000/api/financial-services/delete";

  constructor(private http: HttpClient) { }

  addFinancialService(receiptPurpose: string, receiptImg: File, firstName: string, lastName: string) {
    const fsFormData = new FormData();
    fsFormData.append('receiptPurpose', receiptPurpose);
    fsFormData.append('receiptImg', receiptImg);
    fsFormData.append('firstName', firstName);
    fsFormData.append('lastName', lastName);
    return this.http.post<{ success: boolean }>(this.endpoint, fsFormData);
  }

  getFinancialServices() {
    return this.http.get<{ success: boolean; financialServiceData: FinancialService[] }>(this.endpoint);
  }

  deleteFinancialServices(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpointDelete, rowIds)
  }

}
