import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { ActivatedRoute } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Mode } from 'src/app/models/modeEnum';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnChanges {
  faTrash = faTrashCan;
  mode: Mode;
  Mode = Mode;
  @Input() cartItem: CartItem;
  @Input() searchedText: string;
  productName;
  price: number;
  constructor(private cartItemsService: CartItemsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })
    this.price = this.cartItem.unitPrice * this.cartItem.quantity;
    this.productName = this.cartItem.productName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['cartItem']) return
    const cartItem :CartItem = changes['cartItem'].currentValue
    this.price = cartItem.unitPrice * cartItem.quantity;
  }

  onDeleteCartItemClicked() {
    this.cartItemsService.deleteCartItem(this.cartItem.id).subscribe()
  }




}
