import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-checkout-preview',
  templateUrl: './cart-checkout-preview.component.html',
  styleUrls: ['./cart-checkout-preview.component.css']
})
export class CartCheckoutPreviewComponent implements OnInit {
  searchedText: string;
  faShoppingCart= faShoppingCart;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  onBackClicked(){
    this.router.navigate(['/shopping'])
  }
 
}
