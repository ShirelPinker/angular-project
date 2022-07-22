import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { NewOrder } from '../models/newOrder';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getCustomerLastOrder(customerId: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3001/api/customers/${customerId}/orders?mostRecent=true`)
  }
  
  getOrdersCount(): Observable<any> {
    return this.http.get(`http://localhost:3001/api/orders/?countOnly=true`)

  }

  getOrdersByDeliveryDate(deliveryDate): Observable<any> {
    return this.http.get(`http://localhost:3001/api/orders/?deliveryDate=${deliveryDate}`)
  }

  addOrder(orderDetails): Observable<any> {
    const currentDate = new Date().toLocaleDateString()
    const newOrder: NewOrder = { ...orderDetails, orderDate: currentDate  }
    return this.http.post(`http://localhost:3001/api/orders/`, newOrder)
  }
}
