const cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();

router.post("/", async (request, response, next) => {
    const newCart = request.body;
    try {
        const cart = await cartsLogic.createNewCart(newCart);
        response.json(cart)
    }
    catch (e) {
        next(e)
    }
});

router.get("/:id/cartItems", async (request, response, next) => {
    const cartId = request.params.id;
    try {
        const cartItems = await cartsLogic.getCartItemsByCartId(cartId);
        response.json(cartItems)
    }
    catch (e) {
        next(e)
    }
});


router.delete("/:id/cartItems", async (request, response, next) => {
    const deletedCartId = request.params.id;
    try {
        await cartsLogic.deleteCartItemsByCartId(deletedCartId);
        response.json()
    }
    catch (e) {
        next(e)
    }
});

router.put("/:id", async (request, response, next) => {
    const cartStatus = request.body;
    const cartId = request.params.id;
    try {
        await cartsLogic.updateCartStatus(cartId, cartStatus);
        response.json()
    }
    catch (e) {
        next(e)
    }
});

module.exports = router;