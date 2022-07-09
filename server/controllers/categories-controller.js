const categoriesLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();


router.get("/", async (request, response) => {
 
    try {
        const categories = await categoriesLogic.getAllCategories();
        response.json(categories)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});


module.exports = router;