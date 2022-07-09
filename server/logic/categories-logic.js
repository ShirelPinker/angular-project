const categoriesDal = require("../dal/categories-dal");

async function getAllCategories() {
    const categories = await categoriesDal.getAllCategories();
    return categories;
}


module.exports = {
    getAllCategories

};