import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  introductionName: String;
  faSeedling= faSeedling;
  isLoggedIn;
  constructor(private loginStateService:LoginStateService,
     private productsStateService: ProductsStateService,
     private cartStateService : CartStateService,
     private router: Router) { }

  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().subscribe(loggedInCustomer => {
      if (loggedInCustomer == null) {
        this.introductionName = 'guest'
        this.isLoggedIn = false;
      } else {
        this.introductionName = loggedInCustomer.firstName
        this.isLoggedIn=true;
      }
    })
  }

  onLogoClicked(){
    this.router.navigate(['/main'])
  }
  
  onSignOutClicked(){
    this.cartStateService.updateCartState(null)
    this.productsStateService.updateProductsState(null)
    this.loginStateService.updateCustomerState(null);
    this.router.navigate(['/main']) 
    
  }
}
