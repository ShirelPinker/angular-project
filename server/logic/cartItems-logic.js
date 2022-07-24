const cartItemsDal = require("../dal/cartItems-dal");
const productsDal = require("../dal/products-dal");
const ServerError = require("../errors/ServerError");


async function addProductToCart(addedProduct) {
    validateQuantity(addedProduct.quantity)
    const productPrice = await productsDal.getProductPriceById(addedProduct.productId)
    const cartItemId = await cartItemsDal.addProductToCart(addedProduct, productPrice.price);
    const cartItem =  await cartItemsDal.getCartItemById(cartItemId);
    return cartItem;
}

async function editProductQuantity(editedProductId, newQuantity) {
    validateQuantity(newQuantity)
    await cartItemsDal.editProductQuantity(editedProductId, newQuantity);
}

async function deleteCartItem(deletedCartItemId) {
    await cartItemsDal.deleteCartItem(deletedCartItemId);
}

function validateQuantity(quantity){
    if (quantity < 0){
        throw new ServerError("quantity can't be negative")
    }
}
module.exports = {
    addProductToCart,
    editProductQuantity,
    deleteCartItem,
};