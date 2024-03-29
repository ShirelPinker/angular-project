import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  isLoggedInCustomer: boolean = false;
  productsCount: number;
  ordersCount: number;

  constructor(private loginStateService:LoginStateService, private productsService: ProductsService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().pipe(untilDestroyed(this)).subscribe(loggedInCustomer => this.isLoggedInCustomer = Boolean(loggedInCustomer))
    this.productsService.getProductsCount().subscribe(count => this.productsCount = count.productsCount)
    this.ordersService.getOrdersCount().subscribe(count => this.ordersCount = count.ordersCount)
  }
}
