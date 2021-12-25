const express = require('express')
const route = express.Router()
const notificationController = require('../controllers/NotificationController')

//GET /login
route.get('/', notificationController.sendNotifi)


module.exports = route