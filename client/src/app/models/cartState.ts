import { Cart } from "./cart";
import { CartItem } from "./cartItem";
export type CartState = CartStateObject | null

interface CartStateObject {
    cart: Cart,
    cartItems: CartItem[]
}