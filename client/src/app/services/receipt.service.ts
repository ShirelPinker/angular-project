import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { NewOrder } from '../models/newOrder';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  createReceipt(receiptItems): Observable<any> {
    return this.http.post(`http://localhost:3001/api/receipt`, receiptItems)
  }
  getReceipt(id:number): Observable<any> {
    return this.http.get(`http://localhost:3001/api/receipt/${id}`)
  }


}
