import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loading: boolean;
  loadedCounter = 0;
  productsLen: number;
  products$: Observable<Product[]>;

  constructor(private productsStateService: ProductsStateService) { }

  ngOnInit(): void {
    this.products$ = this.productsStateService.getProductsState().pipe(
      filter(Boolean),
      distinctUntilChanged((prev, curr) => prev.products === curr.products),
      map(productsState => {
        this.loadedCounter = 0;
        this.productsLen = productsState.products.length;
        this.loading = this.productsLen > 0;
        return productsState.products
      }))
  }

  onPictureLoaded() {
    this.loadedCounter++;
    if (this.loadedCounter == this.productsLen) {
      this.loading = false;
    }

  }

}
