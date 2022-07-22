const ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();


router.get("/", async (request, response, next) => {
    try {

        if (request.query.countOnly) {
            let ordersCount = await ordersLogic.getOrdersCount();
            response.json(ordersCount)

        } else if (request.query.deliveryDate) {
            const deliveryDate = request.query.deliveryDate;
            let orders = await ordersLogic.getOrdersByDeliveryDate(deliveryDate);
            response.json(orders)
        }
        else {
            throw new ServerError("query param doesnt exist", { query })
        }
    }
    catch (e) {
        next(e)
    }
});

router.post("/", async (request, response, next) => {
    let order = request.body;

    try {
        await ordersLogic.addOrder(order);
        response.json();
    }
    catch (e) {
        next(e)
    }
});


module.exports = router;