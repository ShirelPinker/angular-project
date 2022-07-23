const { expressjwt: jwt } = require("express-jwt");

const config = require("../config/config.json")
const { secret } = config

function loginFilter() {
    return jwt({ secret, algorithms: ["HS256"] }).unless({
        custom: isAllowed
    });
};
const ALLOWED_URLS = new Set(['/api/orders/?countOnly=true', '/api/products/?countOnly=true']) 

function isAllowed(req){
    return req.method == 'GET' && ALLOWED_URLS.has(req.url)
}

module.exports = loginFilter