const connection = require("./connection-wrapper");

async function getAllCategories() {
    const sql = "SELECT * FROM shopdb.categories"
    const categories = await connection.execute(sql);
    return categories;
}




module.exports = {
    getAllCategories
};