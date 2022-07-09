import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, switchMap, of, forkJoin, map } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CartState } from '../models/cartState';
import { NewCart } from '../models/newCart';
import { CartStateService } from './states/cart-state.service';

type JoinedResponse = Record<string, Observable<any>>

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private cartStateService: CartStateService) { }

  createNewCart(customerId: number): any {
    const currentDate = new Date().toLocaleDateString()
    const newCart: NewCart = {
      customerId: customerId,
      createdAt: currentDate,
      isActive: true
    }
    return this.http.post(`http://localhost:3001/api/carts`, newCart).pipe(
      tap((newCartId: number) => {
        const cart: Cart = { ...newCart, id: newCartId }
        this.cartStateService.updateCartState({ cart, cartItems: [] })
      }))
  }

  updateCartStateByCustomerId(customerId: number): Observable<CartState> {
    return this.getCartsByCustomerId(customerId)
      .pipe(
        switchMap((carts: Cart[]) => {
          const cartItems$: Observable<CartItem[]> = carts.length < 1 ? of([]) : this.getCartItemsByCartId(carts[0].id)
          const joinedObject: JoinedResponse = { cartItems: cartItems$, cart: of(carts[0]) }
          return forkJoin(joinedObject)
        }),
        tap((cartState: CartState) => {
          this.cartStateService.updateCartState(cartState)
        }))
  }

  deActivateCart(cartId:number) {
    return this.http.put(`http://localhost:3001/api/carts/${cartId}`, { isActive: false }).pipe(
      tap(() => {
          this.cartStateService.deActivateCart()
      }))

  }

  private getCartsByCustomerId(customerId): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:3001/api/customers/${customerId}/carts?mostRecent=true`)
  }

  private getCartItemsByCartId(cartId): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`http://localhost:3001/api/carts/${cartId}/cartItems`)
  }

}
