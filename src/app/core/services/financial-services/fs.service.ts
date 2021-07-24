import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialService } from 'src/app/shared/models/form-table/financial-services.model';

@Injectable({
  providedIn: 'root'
})
export class FsService {
  private endpoint: string = "http://localhost:3000/api/financial-services";

  constructor(private http: HttpClient) { }

  addFinancialService(receiptPurpose: string, receiptImg: File, 
                      imgName: string, firstName: string, lastName: string) {
    const fsFormData = new FormData();
    fsFormData.append('receiptPurpose', receiptPurpose);
    fsFormData.append('receiptImg', receiptImg);
    fsFormData.append('imgName', imgName);
    fsFormData.append('firstName', firstName);
    fsFormData.append('lastName', lastName);
    return this.http.post<{ success: boolean }>(this.endpoint, fsFormData);
  }

  getFinancialServices(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get
          <{ success: boolean; financialServiceData: FinancialService[], itemCount: number 
           }>(this.endpoint + queryParams);
  }

  deleteFinancialServices(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpoint + '/delete', rowIds)
  }

}
