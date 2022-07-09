const customersDal = require("../dal/customers-dal");
const cartsDal = require("../dal/carts-dal");
const ordersDal = require("../dal/orders-dal");

const crypto = require("crypto");
const config = require('../config/config.json');
const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode");

async function addCustomer(customerRegistrationData) {
    if (await customersDal.isUserNameExist(customerRegistrationData)) {
        throw new Error("user already exist");
    }
    validateUserData(customerRegistrationData);
    customerRegistrationData.password = encryptPassword(customerRegistrationData.password);
    await customersDal.addCustomer(customerRegistrationData);

    let customerData = await customersDal.login(customerRegistrationData);
    let token = jwt.sign({ customerId: customerData.id, isAdmin: customerData.isAdmin }, config.secret)
    let signedCustomer = { token, firstName: customerData.firstName, lastName: customerData.lastName }
    return signedCustomer;
}

async function login(customerLoginData) {
    customerLoginData.password = encryptPassword(customerLoginData.password);
    let customerData = await customersDal.login(customerLoginData);

    if (!customerData) {
        throw new Error("One or more details are incorrect");
    }

    let token = jwt.sign({ customerId: customerData.id, isAdmin: customerData.isAdmin }, config.secret)
    let signedCustomer = { token, firstName: customerData.firstName, lastName: customerData.lastName }
    return signedCustomer;
}

async function getCustomerByToken(token) {
    const customerId = extractCustomerId(token)
    let customerData = await customersDal.getCustomerById(customerId);
    let newToken = jwt.sign({ customerId: customerData.id, isAdmin: customerData.isAdmin }, config.secret)
    let signedUser = { token: newToken, firstName: customerData.firstName, lastName: customerData.lastName }
    return signedUser;
}
async function getCustomerAddress(customerId) {
    const customerAddress = await customersDal.getCustomerAddress(customerId);
    return customerAddress;
}


async function getCartsByCustomerId(customerId, isMostRecentOnly) {
    const carts = await cartsDal.getCartsByCustomerId(customerId);
    if (isMostRecentOnly) {
        return carts.slice(0, 1);
    }
    return carts;
}


async function getLastOrderByCustomerId(customerId) {
    const lastOrder = await ordersDal.getLastOrderByCustomerId(customerId);

    return lastOrder;
}


function validateUserData(customerRegistrationData) {
    if (!customerRegistrationData.email) {
        throw new Error("Invalid email")
    }
    if (!customerRegistrationData.password) {
        throw new Error("Invalid password")
    }
    if (customerRegistrationData.password.length < 6) {
        throw new Error("password is too short")
    }
}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}


function extractCustomerId(token) {
    let decoded = jwt_decode(token)
    let customerId = decoded.customerId
    return customerId
}

async function getCustomerByEmail(email) {
    const customer = await customersDal.getCustomerByEmail(email);
    return customer
}

async function getCustomerByGovernmentId(governmentId) {
    const customer = await customersDal.getCustomerByGovernmentId(governmentId);
    return customer

}

module.exports = {
    addCustomer,
    login,
    getCustomerByToken,
    getCartsByCustomerId,
    getLastOrderByCustomerId,
    getCustomerByEmail,
    getCustomerByGovernmentId,
    getCustomerAddress

};