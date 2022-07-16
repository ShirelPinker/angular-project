import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartStateService } from './states/cart-state.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http: HttpClient, private cartStateService: CartStateService) { }

  deleteCartItem(cartItemId: number) {
    return this.http.delete(`http://localhost:3001/api/cartItems/${cartItemId}`).pipe(
      tap(() => {
        this.cartStateService.deleteCartItem(cartItemId)
      }))
  }

  addCartItem(addedProduct) {
    return this.http.post(`http://localhost:3001/api/cartItems/`, addedProduct).pipe(
      tap((cartItem) => {
        this.cartStateService.addCartItem(cartItem)
      }))
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`http://localhost:3001/api/cartItems/${cartItemId}`, { quantity }).pipe(
      tap(()=> this.cartStateService.updateCartItem(cartItemId, quantity) )) 
  }

  deleteAllCartItems(cartId: number) {
    return this.http.delete(`http://localhost:3001/api/carts/${cartId}/cartItems`).pipe(
      tap(() => {
        this.cartStateService.deleteAllCartItems()
      }))
  }
}
