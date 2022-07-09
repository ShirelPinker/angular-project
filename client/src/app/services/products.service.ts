import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, Observable, switchMap, tap , take} from 'rxjs';
import { NewProduct } from '../models/newProduct';
import { Product } from '../models/product';
import { ProductsStateService } from './states/products-state.service';
import { ProductsShownBy } from '../models/productsState'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient, private productsStateService: ProductsStateService) { }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3001/api/products/?categoryId=${categoryId}`)
      .pipe(tap((products: Product[]) => this.productsStateService.setProducts(products, ProductsShownBy.CategoryId, categoryId)))
  }

  getProductsBySearchName(searchedProduct: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3001/api/products/?searchedProduct=${searchedProduct}`)
      .pipe(tap((products: Product[]) => this.productsStateService.setProducts(products, ProductsShownBy.SearchText, searchedProduct)))
  }

  getProductsCount(): Observable<any> {
    return this.http.get(`http://localhost:3001/api/products/?countOnly=true`)
  }


  addNewProduct(newProduct: NewProduct): Observable<any> {
    return this.http.post<Product[]>(`http://localhost:3001/api/products/`, newProduct)
      .pipe(
        switchMap(() => this.productsStateService.getProductsState()),
        take(1),
        switchMap((productsState) => {
          if (productsState.productsShownBy == ProductsShownBy.CategoryId) {
            return this.getProductsByCategoryId(productsState.searchValue as number)
          } else {
            return this.getProductsBySearchName(productsState.searchValue as string)
          }
        })
      )
  }

  updateProduct(editedProduct: Product) {
    return this.http.put<Product[]>(`http://localhost:3001/api/products/${editedProduct.id}`, editedProduct)
      .pipe(tap(() => this.productsStateService.setProductToEdit(null)),
        tap(() => this.productsStateService.updateProduct(editedProduct))
      )


  }
}
