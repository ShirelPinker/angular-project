import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsState, ProductToEdit } from 'src/app/models/productsState';

@Injectable({
  providedIn: 'root'
})
export class ProductsStateService {
  private productsState: ProductsState = null;

  private productsStateSubject = new BehaviorSubject<ProductsState>(this.productsState);

  constructor() { }

  getProductsState(): Observable<ProductsState> {
    return this.productsStateSubject.asObservable();
  }

  updateProductsState(newProductState: ProductsState) {
    this.productsState = newProductState;
    this.productsStateSubject.next(this.productsState)
    console.count(`product state has: ${this.productsState?.products.length} items`);
  }

  setProducts(products: Product[], productsShownBy, searchValue) {
    let newProductState: ProductsState;
    if (this.productsState) {
      newProductState = { ...this.productsState }
      newProductState.products = products;
      newProductState.productsShownBy = productsShownBy;
      newProductState.searchValue = searchValue;
    } else {
      newProductState = {
        products: products,
        productsShownBy: productsShownBy,
        searchValue: searchValue,
        productToEdit: null
      }
    }
    this.updateProductsState(newProductState)
  }

  setProductToEdit(productToEdit: ProductToEdit) {
    if (!this.productsState) return;

    const newProductState = { ...this.productsState }
    newProductState.productToEdit = productToEdit;
    this.updateProductsState(newProductState)
  }

  updateProduct(editedProduct: ProductToEdit) {
    if (!this.productsState) return;

    const newProductState = { ...this.productsState }
    const updatedProducts = newProductState.products.map(product => {
      if (product.id == editedProduct?.id) {
        return editedProduct
      } else { return product }
    })
    newProductState.products = updatedProducts
    this.updateProductsState(newProductState)
  }

}
