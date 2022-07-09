const cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();

router.post("/", async (request, response) => {
    const newCart = request.body;
    try {
        const newCartId = await cartsLogic.createNewCart(newCart);
        response.json(newCartId)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.get("/:id/cartItems", async (request, response) => {
    const cartId = request.params.id;
    try {
        const cartItems = await cartsLogic.getCartItemsByCartId(cartId);
        response.json(cartItems)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});


router.delete("/:id/cartItems", async (request, response) => {
    const deletedCartId = request.params.id;
    try {
        await cartsLogic.deleteCartItemsByCartId(deletedCartId);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.put("/:id", async (request, response) => {
    const cartStatus = request.body;
    const cartId = request.params.id;
    try {
        await cartsLogic.updateCartStatus(cartId, cartStatus);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

module.exports = router;