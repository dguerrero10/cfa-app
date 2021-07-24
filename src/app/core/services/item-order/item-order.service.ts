import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemOrder } from 'src/app/shared/models/form-table/item-order.model';

@Injectable({
  providedIn: 'root'
})
export class ItemOrderService {
  private endpoint = "http://localhost:3000/api/item-orders";

  constructor(private http: HttpClient) { }

  addItemOrder(itemOrder: ItemOrder) {
    return this.http.post<{ success: boolean }>(this.endpoint, itemOrder);
  }

  getItemOrders(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get
          <{ success: boolean; itemOrderData: ItemOrder[], itemCount: number 
           }>(this.endpoint + queryParams);
  }

  deleteItemOrders(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpoint + '/delete', rowIds)
  }

}
