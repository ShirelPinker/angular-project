import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, filter, Subscription, switchMap } from 'rxjs';
import { CartState } from 'src/app/models/cartState';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


enum CartStatus {
  NoCart,
  ActiveCart,
  InActiveCart
}

@UntilDestroy()
@Component({
  selector: 'app-logged-in-notification',
  templateUrl: './logged-in-notification.component.html',
  styleUrls: ['./logged-in-notification.component.css']
})
export class LoggedInNotificationComponent implements OnInit {
  newUserName: string;
  cartStatus: CartStatus;
  cartCreatedDate: string;
  cartTotalPrice: number;
  lastOrderDate: number;
  CartStatus = CartStatus;

  constructor(private cartStateService: CartStateService, private loginStateService: LoginStateService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    const cartStateSub = this.cartStateService.getCartState().pipe(filter(Boolean), untilDestroyed(this))
      .subscribe(cartState => {
        if (!(cartState!.cart)) {
          this.handleNewUser()
        } else {
          cartState!.cart.isActive ? this.handleUserWithActiveCart(cartState) : this.handleUserWithInactiveCart()
        }
      })
  }


  handleNewUser() {
    this.loginStateService.getLoggedInCustomerState().pipe(untilDestroyed(this)).pipe(
      filter(Boolean)).subscribe(loggedInCustomer => {
        this.newUserName = loggedInCustomer!.firstName;
      })
    this.cartStatus = CartStatus.NoCart;
  }

  handleUserWithActiveCart(cartState: CartState) {
    this.cartStatus = CartStatus.ActiveCart
    this.cartCreatedDate = cartState!.cart.createdAt;
    this.cartTotalPrice = this.getCartItemsTotalPrice(cartState!.cartItems)

  }
  getCartItemsTotalPrice(cartItems): number {
    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.unitPrice * item.quantity
    }
    return totalPrice

  }

  handleUserWithInactiveCart() {
    this.loginStateService.getLoggedInCustomerState().pipe(
      filter(Boolean),
      untilDestroyed(this),
      switchMap(customer => this.ordersService.getCustomerLastOrder(customer!.id)))
      .subscribe(order => {
        this.lastOrderDate = order.orderDate
      })
    this.cartStatus = CartStatus.InActiveCart
  }
}
