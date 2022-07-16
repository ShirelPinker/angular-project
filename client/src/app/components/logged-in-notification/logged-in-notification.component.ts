import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, filter, Subscription, switchMap } from 'rxjs';
import { CartState } from 'src/app/models/cartState';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { OrdersService } from 'src/app/services/orders.service';

enum CartStatus {
  NoCart,
  ActiveCart,
  InActiveCart
}

@Component({
  selector: 'app-logged-in-notification',
  templateUrl: './logged-in-notification.component.html',
  styleUrls: ['./logged-in-notification.component.css']
})
export class LoggedInNotificationComponent implements OnInit, OnDestroy {
  newUserName: string;
  cartStatus: CartStatus;
  cartCreatedDate: string;
  cartTotalPrice: number;
  lastOrderDate: number;
  CartStatus = CartStatus;
  subsricptions: Subscription[] = [];

  constructor(private cartStateService: CartStateService, private loginStateService: LoginStateService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    const cartStateSub = this.cartStateService.getCartState().pipe(filter(Boolean))
      .subscribe(cartState => {
        if (!(cartState!.cart)) {
          this.handleNewUser()
        } else {
          cartState!.cart.isActive ? this.handleUserWithActiveCart(cartState) : this.handleUserWithInactiveCart()
        }
      })
      this.subsricptions.push(cartStateSub)
  } 

  ngOnDestroy(): void {
    this.subsricptions.forEach(subcription => subcription.unsubscribe())
  }

  handleNewUser() {
    this.loginStateService.getLoggedInCustomerState().subscribe(loggedInCustomer => {
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
    const loginStateSubscription = this.loginStateService.getLoggedInCustomerState().pipe(
      filter(Boolean),
      switchMap(customer => this.ordersService.getCustomerLastOrder(customer!.id)))
      .subscribe(order => {
        this.lastOrderDate = order.orderDate
      })
    this.cartStatus = CartStatus.InActiveCart
    this.subsricptions.push(loginStateSubscription)
  }
}
