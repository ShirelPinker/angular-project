import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedInCustomer } from '../../models/loggedInCustomer';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {
  private loggedInCustomerState = new BehaviorSubject<LoggedInCustomer>(null);
  

  constructor() { }

  getLoggedInCustomerState(): Observable<LoggedInCustomer> {
    return this.loggedInCustomerState.asObservable();
  }

  updateCustomerState(customer: LoggedInCustomer) {
    this.loggedInCustomerState.next(customer)
  }

}
