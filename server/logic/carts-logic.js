const cartsDal = require("../dal/carts-dal");
const cartItemsDal = require("../dal/cartItems-dal");


async function getCartItemsByCartId(cartId) {
    const cartItems = await cartItemsDal.getCartItemsByCartId(cartId);
    return cartItems;
}


async function createNewCart(newCart) {
    const newCartId = await cartsDal.createNewCart(newCart);
    const cart = getCartById(newCartId)
    return cart;
}


async function deleteCartItemsByCartId(deletedCartId) {
    await cartItemsDal.deleteCartItemsByCartId(deletedCartId);
}

async function updateCartStatus(cartId, cartStatus) {
    await cartsDal.updateCartStatus(cartId, cartStatus);
}

async function getCartById(cartId){
   const cart =  await cartsDal.getCartById(cartId);
    return cart;
}

module.exports = {
    deleteCartItemsByCartId,
    getCartItemsByCartId,
    createNewCart,
    updateCartStatus,
    getCartById

};