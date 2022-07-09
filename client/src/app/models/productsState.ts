
import { Product } from "./product";
export type ProductsState = ProductStateObject | null
export enum ProductsShownBy  {
    CategoryId,
    SearchText
}

interface ProductStateObject {
    productsShownBy: ProductsShownBy,
    searchValue: string| number
    products: Product[],
    productToEdit: Product | null        
}