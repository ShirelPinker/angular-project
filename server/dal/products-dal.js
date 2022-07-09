const connection = require("./connection-wrapper");


async function addProduct(newProduct) {
    const sql = "insert into shopdb.products (name, price, category_id, img_url) values(?, ?, ?, ?)"
    const parameters = [newProduct.name, newProduct.price, newProduct.categoryId, newProduct.imgUrl];
    const response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function updateProduct(updatedProduct) {
    const sql = "UPDATE shopdb.products SET name=?, price=?, category_id=?, img_url=? WHERE id=?"
    const parameters = [updatedProduct.name, updatedProduct.price, updatedProduct.categoryId, updatedProduct.imgUrl, updatedProduct.id];
    await connection.executeWithParameters(sql, parameters);
}


async function getProductsCount() {
    const sql = "SELECT COUNT(*) as productsCount FROM shopdb.products;"
    let [productsCount] = await connection.execute(sql);
    return productsCount
}

async function getProductsByName(searchedProduct) {
    const sql = `SELECT id, name, price, category_id as categoryId, img_url as imgUrl FROM shopdb.products where name LIKE '%${searchedProduct}%'`
    const parameters = [searchedProduct];
    let products = await connection.executeWithParameters(sql, parameters);
    return products
}

async function getProductsByCategoryId(categoryId) {
    const sql = "SELECT id, name, price, category_id as categoryId, img_url as imgUrl FROM shopdb.products where category_id=?"
    const parameters = [categoryId];
    let products = await connection.executeWithParameters(sql, parameters);
    return products
}

async function getProductPriceById(productId) {
    const sql = "SELECT  price FROM shopdb.products where id=?"
    const parameters = [productId];
    let [productPrice] = await connection.executeWithParameters(sql, parameters);
    return productPrice
}

module.exports = {
    getProductsByCategoryId,
    addProduct,
    updateProduct,
    getProductsByName,
    getProductsCount,
    getProductPriceById
};