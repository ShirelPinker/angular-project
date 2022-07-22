module.exports = class ServerError extends Error{
    constructor(message, innerError){
        super(message)
        this.status = 400;
        this.innerError = innerError;
    }
}