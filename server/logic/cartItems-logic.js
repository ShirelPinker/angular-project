const cartItemsDal = require("../dal/cartItems-dal");
const productsDal = require("../dal/products-dal");


async function addProductToCart(addedProduct) {
    const productPrice = await productsDal.getProductPriceById(addedProduct.productId)
    // validate positive qauntity-error or abs?

    cartItemId = await cartItemsDal.addProductToCart(addedProduct, productPrice.price);
    const cartItem =  await cartItemsDal.getCartItemById(cartItemId);
    return cartItem;
}

async function editProductQuantity(editedProductId, newQuantity) {
    await cartItemsDal.editProductQuantity(editedProductId, newQuantity);
}

async function deleteCartItem(deletedCartItemId) {
    await cartItemsDal.deleteCartItem(deletedCartItemId);
}


module.exports = {
    addProductToCart,
    editProductQuantity,
    deleteCartItem,
};