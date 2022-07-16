import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, filter, map, Observable, of } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { CartState } from 'src/app/models/cartState';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { ActivatedRoute } from '@angular/router';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Mode } from 'src/app/models/modeEnum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() searchedText: string;
  faShoppingCart= faShoppingCart;
  mode: Mode;
  Mode = Mode;
  cartItems$: Observable<CartItem[]> = of([]);
  totalPrice: number;
  cartId: number;
  constructor(private cartItemsService: CartItemsService, private router: Router, private cartStateService: CartStateService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })

    this.cartItems$ = this.cartStateService.getCartState().pipe(
      filter(Boolean),
      tap((cartState: CartState) => { this.cartId = cartState!.cart.id }),
      map((cartState: CartState) => cartState!.cartItems))

    this.cartItems$.subscribe(cartItems => {
      this.totalPrice = 0;
      for (let item of cartItems) {
        this.totalPrice += item.unitPrice * item.quantity
      }
    })
  }


  onCheckoutClicked() {
    this.router.navigate(['/checkout'])
  }

  onEmptyCartClicked() {
    this.cartItemsService.deleteAllCartItems(this.cartId).subscribe()
  }
}
