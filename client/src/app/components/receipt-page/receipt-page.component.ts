import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css']
})
export class ReceiptPageComponent implements OnInit {

  constructor(private router: Router, private cartStateService: CartStateService) { }
  receiptItems: CartItem[] = [];

  ngOnInit(): void {
    this.cartStateService.getCartState().subscribe((cartState) => this.receiptItems = cartState.cartItems)   
  }

  onDownloadReceipt() {
    const id = Math.random().toString().replace('0.', '')
    let str = '<h1> Receipt No. ' + id + '</h1>'
    str+= '<ul>'
    for (const item of this.receiptItems) {
        const price = item.unitPrice * item.quantity
        str += `<li>
        ${item.productName} || ${price}$
        </li>`
    }
    str+= '</ul> <br><br> <div>Thank you for buying!</div>'
      const blob = new Blob([str], { type: 'text/html' });
      saveAs(blob, `Receipt_${id}.html`);
  }
  

  onOkClicked() {
    this.router.navigate(['/main'])
  }

}
