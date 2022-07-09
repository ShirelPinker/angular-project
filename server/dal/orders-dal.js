const connection = require("./connection-wrapper");


async function getOrdersCount() {
    const sql = "SELECT COUNT(*) as ordersCount FROM shopdb.orders;"
    let [ordersCount] = await connection.execute(sql);
    return ordersCount
}

async function getLastOrderByCustomerId(customerId) {
    const sql = "SELECT id, order_date as orderDate FROM shopdb.orders where customer_id=? order by order_date desc limit 1"
    const parameters = [customerId];
    let [lastOrder] = await connection.executeWithParameters(sql, parameters);
    return lastOrder
}

async function getOrdersByDeliveryDate(deliveryDate) {
    const sql = "SELECT * FROM shopdb.orders where delivery_date=?"
    const parameters = [deliveryDate];
    let orders = await connection.executeWithParameters(sql, parameters);
    return orders
}

async function addOrder(order) {
    const sql = `insert into shopdb.orders (customer_id, cart_id, charge, delivery_city, delivery_street, delivery_date, order_date, credit_card)` + `values(?,?,?,?,?,?,?,?)` 
    const parameters = [order.customerId, order.cartId, order.charge, order.deliveryCity, order.deliveryStreet, order.deliveryDate, order.orderDate, order.creditCard];
    await connection.executeWithParameters(sql, parameters);

}

module.exports = {
    getLastOrderByCustomerId,
    getOrdersCount,
    getOrdersByDeliveryDate,
    addOrder
};