const cartsDal = require("../dal/carts-dal");
const cartItemsDal = require("../dal/cartItems-dal");


async function getCartItemsByCartId(cartId) {
    const cartItems = await cartItemsDal.getCartItemsByCartId(cartId);
    return cartItems;
}


async function createNewCart(newCart) {
    const newCartId = await cartsDal.createNewCart(newCart);
    return newCartId
}


async function deleteCartItemsByCartId(deletedCartId) {
    await cartItemsDal.deleteCartItemsByCartId(deletedCartId);
}

async function updateCartStatus(cartId, cartStatus) {
    await cartsDal.updateCartStatus(cartId, cartStatus);
}

module.exports = {
    deleteCartItemsByCartId,
    getCartItemsByCartId,
    createNewCart,
    updateCartStatus

};