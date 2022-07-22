const cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
const router = express.Router();

router.post("/", async (request, response, next) => {
    const addedProduct = request.body;
    try {
        const cartItem = await cartItemsLogic.addProductToCart(addedProduct);
        response.json(cartItem)
    }
    catch (e) {
        next(e)
    }
});

router.put("/:id", async (request, response, next) => {
    const editedProductId = request.params.id;
    const newQuantity = request.body.quantity
    try {
        await cartItemsLogic.editProductQuantity(editedProductId, newQuantity);
        response.json()
    }
    catch (e) {
        next(e)
    }
});

router.delete("/:id", async (request, response, next) => {
    const deletedCartItemId = request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(deletedCartItemId);
        response.json()
    }
    catch (e) {
        next(e)
    }
});




module.exports = router;