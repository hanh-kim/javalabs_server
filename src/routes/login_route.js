const express = require('express')
const route = express.Router()
const loginController = require('../app/controllers/LoginController')

//GET /login
route.get('/', loginController.index)


module.exports = route