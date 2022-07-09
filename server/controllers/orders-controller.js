const ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();


router.get("/", async (request, response) => {
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
            const errorMsg = "query param doesnt exist"
            console.error(errorMsg);
            response.status(400).send(errorMsg)
        }
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.post("/", async (request, response) => {
    let order = request.body;

    try {
        await ordersLogic.addOrder(order);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});


module.exports = router;