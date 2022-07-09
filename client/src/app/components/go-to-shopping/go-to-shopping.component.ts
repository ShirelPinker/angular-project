import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, filter, map } from 'rxjs';
import { CartState } from 'src/app/models/cartState';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';

@Component({
  selector: 'app-go-to-shopping',
  templateUrl: './go-to-shopping.component.html',
  styleUrls: ['./go-to-shopping.component.css']
})
export class GoToShoppingComponent implements OnInit {
  isActiveCart = false;
  constructor(private loginStateService: LoginStateService, private cartService: CartService, private cartStateService: CartStateService, private router: Router) { }

  ngOnInit(): void {
    this.cartStateService.getCartState().pipe(
      filter((cartState: CartState) => cartState != null),
      map((cartState: CartState) => cartState.cart))
      .subscribe(cart => {
        this.isActiveCart = cart ? cart.isActive : false
      })
  }

  onStartShoppingClicked() {
    this.loginStateService.getLoggedInCustomerState().pipe(
      concatMap(customer => {//we might be able to change to switch map - test that!
        return this.cartService.createNewCart(customer.id)
      }
      )).subscribe(() => this.router.navigate(['/shopping']))
  }


  onResumeShoppingClicked() {
    this.router.navigate(['/shopping'])

  }
}
