const e = require("express")
const ServerError = require('../errors/ServerError')


module.exports = function errorHandler(error, req, res, next) {
  if (error instanceof ServerError) {
    res.status(error.status)
    res.json({ msg: error.message, stackTrace: error.innerError })
  } else {
    res.status(500)
    res.json({ msg: error.message })
  }
}