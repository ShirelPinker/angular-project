const cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
const router = express.Router();



router.post("/", async (request, response) => {
    const addedProduct = request.body;
    try {
       const cartItem= await cartItemsLogic.addProductToCart(addedProduct);
        response.json(cartItem)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.put("/:id", async (request, response) => {
    const editedProductId = request.params.id;
    const newQuantity = request.body.quantity
    try {
        await cartItemsLogic.editProductQuantity(editedProductId, newQuantity);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.delete("/:id", async (request, response) => {
    const deletedCartItemId = request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(deletedCartItemId);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});




module.exports = router;