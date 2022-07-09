import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedInCustomer } from '../../models/loggedInCustomer';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {
  private loggedInCustomerState = new BehaviorSubject<LoggedInCustomer>(null);
  // defaultCustumer = {
  //   id: 4,
  //   firstName: "Shir",
  //   lastName: "Pink",
  //   isAdmin: true
  // }
  // default for development
  // private loggedInCustomerState = new BehaviorSubject<LoggedInCustomer>(this.defaultCustumer);
  constructor() { }
  
  getLoggedInCustomerState(): Observable<LoggedInCustomer> {
    return this.loggedInCustomerState.asObservable();
  }

  updateCustomerState(customer: LoggedInCustomer) {
    this.loggedInCustomerState.next(customer)

    console.log(`login state: ${JSON.stringify(customer)}`);
  }

}
