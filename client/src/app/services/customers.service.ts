import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, Observable, switchMap, of, delay } from 'rxjs';
import { LoggedInCustomer } from '../models/loggedInCustomer';
import jwt_decode from "jwt-decode";
import { LoggedInCustomerResponse } from '../models/loggedInCustomerResponse';
import { LoginStateService } from './states/login-state.service';
import { CartService } from './cart.service';
import { CartState } from '../models/cartState';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private loginStateService: LoginStateService, private cartService: CartService) { }

  addUser(customerRegistrationData): Observable<CartState> {
    return this.http.post<LoggedInCustomerResponse>("http://localhost:3001/api/customers/", customerRegistrationData)
      .pipe(switchMap((customerResponse: LoggedInCustomerResponse) => this.updateLoginUser(customerResponse)))

  }

  login(customerLoginData: object): Observable<CartState> {
    return this.http.post<LoggedInCustomerResponse>("http://localhost:3001/api/customers/login", customerLoginData)
      .pipe(switchMap((customerResponse: LoggedInCustomerResponse) => this.updateLoginUser(customerResponse)))
  }

  loginByToken(): Observable<CartState> {
    return this.http.get<LoggedInCustomerResponse>("http://localhost:3001/api/customers/loginByToken")
      .pipe(switchMap((customerResponse: LoggedInCustomerResponse) => this.updateLoginUser(customerResponse)))
  }

  private updateLoginUser(customerResponse: LoggedInCustomerResponse): Observable<CartState> {
    return of(customerResponse)
      .pipe(
        tap((customerResponse) => localStorage.setItem('token', customerResponse.token)),
        map(customerResponse => {
          const decodedToken: any = jwt_decode(customerResponse.token)
          return {
            id: decodedToken.customerId,
            isAdmin: decodedToken.isAdmin,
            firstName: customerResponse.firstName,
            lastName: customerResponse.lastName
          } as LoggedInCustomer
        }),
        tap(customer => this.loginStateService.updateCustomerState(customer)),
        switchMap(customer => customer!.isAdmin ? of(null) : this.cartService.updateCartStateByCustomerId(customer!.id)))
  }


  isUniqueGovernmentId(governmentId): Observable<boolean> {
    return this.http.get<LoggedInCustomerResponse>(`http://localhost:3001/api/customers/?governmentId=${governmentId}`).pipe(
      map((customer) => customer ? false : true)
    )

  }
  isEmailTaken(email): Observable<boolean> {
    return this.http.get<LoggedInCustomerResponse>(`http://localhost:3001/api/customers/?email=${email}`).pipe(
      map((customer) => customer ? true : false)
    )
  }
  getCustomerAddress(customerId): Observable<any> {
    return this.http.get(`http://localhost:3001/api/customers/${customerId}/?addressOnly=true`)
  }
}
