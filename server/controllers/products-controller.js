const productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();


router.post("/", async (request, response, next) => {
    let newProduct = request.body;
    try {
        const product = await productsLogic.addProduct(newProduct);
        response.json(product)
    }
    catch (e) {
        next(e)
    }
});


router.put("/:id", async (request, response, next) => {
    const updatedProduct = request.body;
    try {
        await productsLogic.updateProduct(updatedProduct);
        response.json()
    }
    catch (e) {
        next(e)
    }
});

router.get("/", async (request, response, next) => {
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
            throw new ServerError("query param doesnt exist", { query })
        }
    } catch (e) {
        next(e)
    }
});




module.exports = router;