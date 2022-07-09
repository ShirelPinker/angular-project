import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartState } from '../../models/cartState';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartState: CartState = null;
  private cartStateSubject = new BehaviorSubject<CartState>(this.cartState)
  constructor() { }

  getCartState() :Observable<CartState> {
    return this.cartStateSubject.asObservable();
  }

  updateCartState(newCartState: CartState) {
    this.cartState = newCartState;
    this.cartStateSubject.next(this.cartState)
    console.log(`cart state: ${JSON.stringify(this.cartState)}`);
  }

  deActivateCart() {
    const newCartState = { ...this.cartState }
    newCartState.cart!.isActive = false;
    this.updateCartState(newCartState);
  }

  addCartItem(cartItem) {
    const newCartState = { ...this.cartState }
    newCartState.cartItems!.push(cartItem)
    this.updateCartState(newCartState);
  }

  updateCartItem(cartItemId, quantity) {
    const newCartState = { ...this.cartState }
    newCartState.cartItems = newCartState.cartItems!.map(cartItem => {
      const newCartItem = { ...cartItem }
      if (newCartItem.id == cartItemId) {
        newCartItem.quantity = quantity;
      }
      return newCartItem
    })
    this.updateCartState(newCartState);
  }

  deleteCartItem(cartItemId) {
    const newCartState = { ...this.cartState }
    newCartState.cartItems = newCartState.cartItems!.filter((item) => item.id != cartItemId)
    this.updateCartState(newCartState);
  }

  deleteAllCartItems() {
    const newCartState = { ...this.cartState }
    newCartState.cartItems = [];
    this.updateCartState(newCartState);
  }
}
