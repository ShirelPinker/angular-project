const { expressjwt: jwt } = require("express-jwt");

const config = require("../config/config.json")
const { secret } = config

function loginFilter() {
    return jwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/api/customers/login", method: "POST" },
            { url: "/api/customers/", method: "POST" },
        ],
        custom: isAllowed
    });
};
const ALLOWED_URLS = [
    /\/api\/products\/\?countOnly=true/,
    /\/api\/orders\/\?countOnly=true/,
    /\/api\/customers\/\?governmentId=*/,
    /\/api\/customers\/\?email=*/
]

function isAllowed(req) {
    return req.method == 'GET' && ALLOWED_URLS.some(regex => regex.test(req.url))
}

module.exports = loginFilter

