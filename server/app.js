const express = require("express");
const cors = require("cors");
const customersController = require("./controllers/customers-controller");
const productsController = require("./controllers/products-controller");
const categoriesController = require("./controllers/categories-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const cartsController = require("./controllers/carts-controller");
const ordersController = require("./controllers/orders-controller");
const receiptController = require("./controllers/receipt-controller");



const server = express();


server.use(cors({origin: "http://localhost:4200"}));
server.use(express.json());
server.use("/api/customers", customersController);
server.use("/api/products", productsController);
server.use("/api/categories", categoriesController);
server.use("/api/cartItems", cartItemsController);
server.use("/api/carts", cartsController);
server.use("/api/orders", ordersController);
server.use("/api/receipt", receiptController);



server.listen(3001, () => console.log("Listening on http://localhost:3001"));

