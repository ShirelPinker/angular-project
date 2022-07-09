const ordersDal = require("../dal/orders-dal");
const cartItemsDal = require("../dal/cartItems-dal");


async function getOrdersCount() {
    const ordersCount = await ordersDal.getOrdersCount();
    return ordersCount;
}


async function getOrdersByDeliveryDate(deliveryDate) {
    const orders = await ordersDal.getOrdersByDeliveryDate(deliveryDate);
    return orders;
}


async function addOrder(order) {
    let charge = 0;
    const cartItems = await cartItemsDal.getCartItemsByCartId(order.cartId);
    for (let item of cartItems) {
        charge += item.unitPrice * item.quantity
    }
    order['charge'] = charge;
    await ordersDal.addOrder(order);
}

module.exports = {
    getOrdersCount,
    getOrdersByDeliveryDate,
    addOrder

};