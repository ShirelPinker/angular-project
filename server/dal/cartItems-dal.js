const connection = require("./connection-wrapper");



async function getCartItemsByCartId(cartId) {
    const sql = "SELECT ci.id, ci.product_id as productId, ci.quantity, ci.unit_price as unitPrice , ci.cart_id as cartId, p.name as productName, p.img_url as productImgUrl FROM shopdb.cart_items ci LEFT JOIN shopdb.products p ON ci.product_id=p.id where cart_id=?"
    const parameters = [cartId];
    const cartItems = await connection.executeWithParameters(sql, parameters);
    return cartItems;
}


async function deleteCartItemsByCartId(cartId) {
    const sql = "DELETE FROM shopdb.cart_items where cart_id=?"
    const parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}

async function addProductToCart(addedProduct, unitPrice) {
    const sql = "insert into shopdb.cart_items (product_id, quantity, unit_price, cart_id) values(?, ?, ?, ?)"
    const parameters = [addedProduct.productId, addedProduct.quantity, unitPrice, addedProduct.cartId];
    const response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function getCartItemById(cartItemId){
    const sql = "SELECT ci.id, ci.product_id as productId, ci.quantity, ci.unit_price as unitPrice , ci.cart_id as cartId, p.name as productName, p.img_url as productImgUrl FROM shopdb.cart_items ci LEFT JOIN shopdb.products p ON ci.product_id=p.id where ci.id=?"
    const parameters = [cartItemId];
    const [cartItem] = await connection.executeWithParameters(sql, parameters);
    return cartItem;
}

async function editProductQuantity(editedProductId, newQuantity) {
    const sql = "UPDATE shopdb.cart_items SET quantity=? where id=?"
    const parameters = [newQuantity, editedProductId];
    await connection.executeWithParameters(sql, parameters);

}


async function deleteCartItem(deletedCartItemId) {
    const sql = "DELETE FROM shopdb.cart_items where id=?"
    const parameters = [deletedCartItemId];
    await connection.executeWithParameters(sql, parameters);

}


module.exports = {
    addProductToCart,
    editProductQuantity,
    deleteCartItem,
    getCartItemsByCartId,
    deleteCartItemsByCartId,
    getCartItemById


};