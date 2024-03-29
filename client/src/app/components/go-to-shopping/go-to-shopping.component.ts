import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, filter, map, Observable, switchMap } from 'rxjs';
import { CartState } from 'src/app/models/cartState';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { LoggedInCustomer } from 'src/app/models/loggedInCustomer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-go-to-shopping',
  templateUrl: './go-to-shopping.component.html',
  styleUrls: ['./go-to-shopping.component.css']
})
export class GoToShoppingComponent implements OnInit {
  isActiveCart = false;
  customerState$: Observable<LoggedInCustomer>
  constructor(private loginStateService: LoginStateService, private cartService: CartService, private cartStateService: CartStateService, private router: Router) { }
  
  ngOnInit(): void {
    this.customerState$ = this.loginStateService.getLoggedInCustomerState()
    this.cartStateService.getCartState().pipe(
      untilDestroyed(this),
      filter(Boolean),
      map((cartState: CartState) => cartState!.cart))
      .subscribe(cart => {
        this.isActiveCart = cart ? cart.isActive : false
      })
  }

  manageStoreClicked(){
    this.router.navigate(['/shopping/admin'])
  }

  onStartShoppingClicked() {
    this.loginStateService.getLoggedInCustomerState().pipe(take(1),
      switchMap(customer => {
        return this.cartService.createNewCart(customer!.id)
      }
      )).subscribe(() => this.router.navigate(['/shopping']))
  }

  onResumeShoppingClicked() {
    this.router.navigate(['/shopping'])

  }
}
