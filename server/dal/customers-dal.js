const connection = require("./connection-wrapper");

async function addCustomer(customerRegistrationData) {
    const sql = `insert into shopdb.customers(first_name, last_name, email, password, city, street, is_admin, government_id)` +
        `values(?, ?, ?, ?, ?, ?, ?, ?)`;
    const parameters = [customerRegistrationData.firstName, customerRegistrationData.lastName, customerRegistrationData.email, customerRegistrationData.password, customerRegistrationData.city, customerRegistrationData.street, 0, customerRegistrationData.governmentId];
    await connection.executeWithParameters(sql, parameters);
    
}
async function login(customerLoginData) {
    const sql = "SELECT id, first_name as firstName, last_name as lastName, is_admin as isAdmin FROM shopdb.customers where email=? and password=?"
    const parameters = [customerLoginData.email, customerLoginData.password];
    const [customerData] = await connection.executeWithParameters(sql, parameters);
    return customerData;
}

async function isUserNameExist(customerRegistrationData) {
    const sql = "SELECT id from shopdb.customers where email=?"
    const parameters = [customerRegistrationData.email];
    const customers = await connection.executeWithParameters(sql, parameters);

    return customers.length > 0

}

async function getCustomerById(customerId){
    const sql = "SELECT id, first_name as firstName, last_name as lastName, is_admin as isAdmin FROM shopdb.customers where id=?"
    const parameters = [customerId];
    const [customerData] = await connection.executeWithParameters(sql, parameters);
    return customerData; 
}


async function getCustomerByEmail(email){
    const sql = "SELECT * FROM shopdb.customers where email=?"
    const parameters = [email];
    const [customer] = await connection.executeWithParameters(sql, parameters);
    return customer; 
}

async function getCustomerByGovernmentId(governmentId){
    const sql = "SELECT * FROM shopdb.customers where government_id=?"
    const parameters = [governmentId];
    const [customer] = await connection.executeWithParameters(sql, parameters);
    return customer; 
}

async function getCustomerAddress(customerId){
    const sql = "SELECT  city, street FROM shopdb.customers where id=?"
    const parameters = [customerId];
    const [customerAddress] = await connection.executeWithParameters(sql, parameters);
    return customerAddress; 
}

module.exports = {
    isUserNameExist,
    addCustomer,
    login,
    getCustomerById,
    getCustomerByEmail,
    getCustomerByGovernmentId,
    getCustomerAddress
};