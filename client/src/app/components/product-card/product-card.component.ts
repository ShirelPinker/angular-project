import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filter, Observable, Subscription, take, tap } from 'rxjs';
import { Mode } from 'src/app/models/modeEnum';
import { Product } from 'src/app/models/product';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Output() pictureLoaded = new EventEmitter();

  @Input() productItem: Product = {} as Product;
  hideStream: Observable<any> =this.modalService.onHide.pipe(take(1))
  mode: Mode;
  Mode = Mode;
  modalRef?: BsModalRef;
  productQuantity: number;
  productQuantityInput: number;
  cartId: number;
  cartItemId: number | null
  faPencil = faPencil;

  constructor(private productsStateService: ProductsStateService,
    private cartStateService: CartStateService,
    private cartItemsService: CartItemsService,
    private activatedroute: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })

    this.cartStateService.getCartState().pipe(
      filter(cartState => Boolean(cartState?.cart)),
      tap(cartState => {
        this.cartId = cartState!.cart.id;
        const productCartItem = cartState!.cartItems.find((cartItem) => cartItem.productId == this.productItem.id)
        if (productCartItem) {
          this.productQuantity = productCartItem.quantity;
          this.cartItemId = productCartItem.id
        } else {
          this.productQuantity = 0;
          this.cartItemId = null
        }
        this.productQuantityInput = this.productQuantity
      })).subscribe()
  }

  onQuantityClicked() {
    this.modalRef?.hide()

    if (this.productQuantityInput == 0) {
      if (this.cartItemId) {
        this.cartItemsService.deleteCartItem(this.cartItemId).subscribe()
      } else {
        return
      }
    }
    else if (!this.cartItemId) {
      const addedProduct = {
        productId: this.productItem.id,
        quantity: this.productQuantityInput,
        cartId: this.cartId
      }

      this.cartItemsService.addCartItem(addedProduct).subscribe()
    } else {
      this.cartItemsService.updateCartItem(this.cartItemId, this.productQuantityInput).subscribe()
    }
  }

  onEditClicked() {
    this.productsStateService.setProductToEdit(this.productItem)
  }

  onOpenModal(modalTemplate: TemplateRef<any>) {
    if (this.mode != Mode.Store) return
    this.hideStream.subscribe(()=>this.handleClose())
    this.modalRef = this.modalService.show(modalTemplate);
  }

  onXClicked(){
    this.modalRef?.hide()
    this.handleClose()
  }

  handleClose(){
    this.productQuantityInput = this.productQuantity
  }

  onPictureLoaded() {
    this.pictureLoaded.emit();
  }
}
