import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { CustomersService } from 'src/app/services/customers.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  mode;
  modalRef?: BsModalRef;


  @Input() productItem: Product = {} as Product;
  initProductQuantityInCart = 0;
  productQuantity: number;
  cartId: number;
  cartItemId: number | null
  faPencil = faPencil;

  constructor(private productsStateService: ProductsStateService,
    private loginStateService: LoginStateService,
    private cartStateService: CartStateService,
    private cartItemsService: CartItemsService,
    private activatedroute: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })

    this.loginStateService.getLoggedInCustomerState().subscribe(customer => {
      if (!customer?.isAdmin) {

        this.cartStateService.getCartState().subscribe(cartState => {
          this.cartId = cartState!.cart.id;

          const productCartItem = cartState!.cartItems.find((cartItem) => cartItem.productId == this.productItem.id)
          if (productCartItem) {
            this.productQuantity = productCartItem.quantity;
            this.cartItemId = productCartItem.id
          } else {
            this.productQuantity = 0;
            this.cartItemId = null
          }
        }

        )
      }
    })
  }

  onQuantityClicked() {
    this.modalRef.hide()

    if (this.productQuantity <= 0) {
      return
    }
    if (!this.cartItemId) {
      const addedProduct = {
        productId: this.productItem.id,
        quantity: this.productQuantity,
        cartId: this.cartId
      }

      this.cartItemsService.addCartItem(addedProduct).subscribe()
    } else {
      this.cartItemsService.updateCartItem(this.cartItemId, this.productQuantity).subscribe()
    }
  }
  onEditClicked() {
    this.productsStateService.setProductToEdit(this.productItem)
  }

  onOpenModal(modalTemplate: TemplateRef<any>) {
    if (this.mode != 'store') return
    this.modalRef = this.modalService.show(modalTemplate);
  }


}
