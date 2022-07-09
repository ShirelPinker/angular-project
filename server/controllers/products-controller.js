const productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();


router.post("/", async (request, response) => {
    let newProduct = request.body;
    try {
        const product = await productsLogic.addProduct(newProduct);
        response.json(product)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});


router.put("/:id", async (request, response) => {
    const updatedProduct = request.body;
    try {
        await productsLogic.updateProduct(updatedProduct);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.get("/", async (request, response) => {
    try {

        if (request.query.countOnly) {
            const productsCount = await productsLogic.getProductsCount();
            response.json(productsCount)
        }
        else if (request.query.searchedProduct) {
            const searchedProduct = request.query.searchedProduct;
            const products = await productsLogic.getProductsByName(searchedProduct);
            response.json(products)
        }
        else if (request.query.categoryId) {
            const categoryId = request.query.categoryId;
            const products = await productsLogic.getProductsByCategoryId(categoryId);
            response.json(products)
        }
        else {
            const errorMsg = "query params doesnt exist"
            console.error(errorMsg);
            response.status(400).send(errorMsg)
        }


    } catch (error) {
        console.error(e);
        response.status(500).send(e.message)
    }

});




module.exports = router;