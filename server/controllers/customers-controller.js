const customersLogic = require("../logic/customers-logic");
const express = require("express");

const router = express.Router();

router.get("/", async (request, response) => {
    try {

        if (request.query.email) {
            const email = request.query.email;
            let customer = await customersLogic.getCustomerByEmail(email);
            response.json(customer)
        }
        else if (request.query.governmentId) {
            const governmentId = request.query.governmentId;
            let customer = await customersLogic.getCustomerByGovernmentId(governmentId);
            response.json(customer)
        }
        else {
            const errorMsg = "query param doesnt exist"
            console.error(errorMsg);
            response.status(400).send(errorMsg)
        }


    } catch (error) {
        console.error(e);
        response.status(500).send(e.message)
    }

});

router.post("/", async (request, response) => {
    let customerRegistrationData = request.body;

    try {
        const customer = await customersLogic.addCustomer(customerRegistrationData);
        response.json(customer);
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.post("/login", async (request, response) => {
    let customerLoginData = request.body;

    try {
        const customer = await customersLogic.login(customerLoginData);
        response.json(customer);
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
});

router.get("/byToken", async (request, response) => {
    const token = request.headers["authorization"];
    try {
        const customer = await customersLogic.getCustomerByToken(token);
        response.json(customer)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
})

router.get("/:id", async (request, response) => {

    try {
        if (request.query.addressOnly) {
            const customerId = request.params.id;
            let customerAddress = await customersLogic.getCustomerAddress(customerId);
            response.json(customerAddress)
        }
        else {
            const errorMsg = "query param doesnt exist"
            console.error(errorMsg);
            response.status(400).send(errorMsg)
        }

    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
})


router.get("/:id/carts", async (request, response) => {
    const customerId = request.params.id;
    const isMostRecentOnly = request.query.mostRecent;

    try {
        const cart = await customersLogic.getCartsByCustomerId(customerId, isMostRecentOnly);
        response.json(cart)
    }
    catch (e) {
        console.error(e);
        response.status(500).send(e.message)
    }
})

router.get("/:id/orders", async (request, response) => {
    const customerId = request.params.id;
    if (request.query.mostRecent) {
        try {
            const lastOrder = await customersLogic.getLastOrderByCustomerId(customerId);
            response.json(lastOrder)
        }
        catch (e) {
            console.error(e);
            response.status(500).send(e.message)
        }

    }
})



module.exports = router;