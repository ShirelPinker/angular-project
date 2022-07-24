import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, pipe } from 'rxjs';
import { LoggedInCustomer } from '../models/loggedInCustomer';
import { LoginStateService } from '../services/states/login-state.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private loginStateService: LoginStateService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.loginStateService.getLoggedInCustomerState().pipe(map((customer: LoggedInCustomer) => {

      if (!customer) {
        this.router.navigate(["/main"])
      } else if (!customer.isAdmin) {
        this.router.navigate(["/shopping"])
      }
      return true
    }))
  }
}
