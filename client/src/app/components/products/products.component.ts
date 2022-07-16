import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productsStateService: ProductsStateService) { }

  ngOnInit(): void {
    this.products$ = this.productsStateService.getProductsState().pipe(filter(Boolean),map(productsState=>productsState.products))
  }
}
