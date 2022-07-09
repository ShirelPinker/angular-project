import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsState } from 'src/app/models/productsState';
import { LoggedInCustomer } from '../../models/loggedInCustomer';

@Injectable({
  providedIn: 'root'
})
export class ProductsStateService {
  private productsState: ProductsState = { products: [], productToEdit: null, productsShownBy: null, searchValue: null };

  private productsStateSubject = new BehaviorSubject<ProductsState>(this.productsState);

  constructor() { }

  getProductsState(): Observable<ProductsState> {
    return this.productsStateSubject.asObservable();
  }

  updateProductsState(newProductState: ProductsState) {
    this.productsState = newProductState;
    this.productsStateSubject.next(this.productsState)
    console.log(`product state: ${JSON.stringify(this.productsState)}`);
  }

  setProducts(products: Product[], productsShownBy, searchValue) {
    const newProductState = { ...this.productsState }
    newProductState.products = products;
    newProductState.productsShownBy = productsShownBy;
    newProductState.searchValue = searchValue;
    this.updateProductsState(newProductState)
  }

  setProductToEdit(productToEdit: Product) {
    const newProductState = { ...this.productsState }
    newProductState.productToEdit = productToEdit;
    this.updateProductsState(newProductState)
  }

  updateProduct(editedProduct: Product) {
    const newProductState = { ...this.productsState }
    const updatedProducts = newProductState.products.map(product => {
      if (product.id == editedProduct.id) {
        return editedProduct
      } else { return product }
    })
    newProductState.products=updatedProducts
    this.updateProductsState(newProductState)
  }

}
