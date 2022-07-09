import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, Observable, of, switchMap } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { ReceiptService } from 'src/app/services/receipt.service';
import { CartStateService } from 'src/app/services/states/cart-state.service';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css']
})
export class ReceiptPageComponent implements OnInit {

  constructor(private router: Router, private cartStateService: CartStateService, private receiptService: ReceiptService) { }
  receiptItems: CartItem[] = [];
  receiptId: number;
  ngOnInit(): void {
    this.cartStateService.getCartState().pipe(
      tap((cartState) => this.receiptItems = cartState.cartItems),
      tap(() => this.receiptService.createReceipt(this.receiptItems).subscribe(
        id => this.receiptId = id
      ))
    )
  }

  onDownloadReceipt() {
    this.receiptService.getReceipt(this.receiptId).subscribe()

  }

  onOkClicked() {
    this.router.navigate(['/main'])
  }

}
