import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemOrder } from 'src/app/shared/models/form-table/item-order.model';

@Injectable({
  providedIn: 'root'
})
export class ItemOrderService {
  private endpoint = "http://localhost:3000/api/item-orders";
  private endpointDelete = "http://localhost:3000/api/item-orders/delete";

  constructor(private http: HttpClient) { }

  addItemOrder(itemOrder: ItemOrder) {
    return this.http.post<{ success: boolean }>(this.endpoint, itemOrder);
  }

  getItemOrders() {
    return this.http.get<{ success: boolean; itemOrderData: ItemOrder[] }>(this.endpoint);
  }

  deleteItemOrders(rowIds: any) {
    return this.http.post<{ success: boolean }>(this.endpointDelete, rowIds)
  }

}
