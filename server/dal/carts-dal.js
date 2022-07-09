const connection = require("./connection-wrapper");

async function getCartsByCustomerId(customerId){
    const sql = "SELECT id, customer_id as customerId, created_at as createdAt, is_active as isActive FROM shopdb.carts where customer_id=? order by created_at desc"
    const parameters = [customerId];
    const carts = await connection.executeWithParameters(sql, parameters);
    return carts;
}

async  function createNewCart(newCart){
    const sql = `insert into shopdb.carts(customer_id, created_at, is_active)` +
    `values(?, ?, ?)`
    const parameters = [newCart.customerId, newCart.createdAt, newCart.isActive];
    const response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}


async function updateCartStatus(cartId, cartStatus) {
    const sql = "UPDATE shopdb.carts SET is_active=? where id=?"
    const parameters = [ cartStatus.isActive, cartId] ;
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getCartsByCustomerId,
    createNewCart,
    updateCartStatus
    };