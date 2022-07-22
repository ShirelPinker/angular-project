const categoriesLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response, next) => {
    try {
        const categories = await categoriesLogic.getAllCategories();
        response.json(categories)
    }
    catch (e) {
        next(e)
    }
});

module.exports = router;