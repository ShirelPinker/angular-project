const productsDal = require("../dal/products-dal");


async function addProduct(newProduct) {
    validateProductData(newProduct);
    const newProductId = await productsDal.addProduct(newProduct);
    return { ...newProduct, id: newProductId }
}

async function updateProduct(updatedProduct) {
    validateProductData(updatedProduct);
    await productsDal.updateProduct(updatedProduct);

}

async function getProductsCount() {
    let productsCount = await productsDal.getProductsCount();
    return productsCount;
}

async function getProductsByName(searchedProduct) {
    let products = await productsDal.getProductsByName(searchedProduct);
    return products;
}


async function getProductsByCategoryId(categoryId) {
    let products = await productsDal.getProductsByCategoryId(categoryId);
    return products;

}


function validateProductData(newProduct) {
    if (newProduct.name == "" || newProduct.price == "" ||
        newProduct.categoryId == "" || newProduct.imgUrl == "") {
        throw new Error("All feilds should be filled")
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProductsByName,
    getProductsByCategoryId,
    getProductsCount

};