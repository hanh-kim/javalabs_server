const express = require('express')
const route = express.Router()
const updateController = require('../controllers/UpdateController')

route.get('/', updateController.showTopic)

route.post('/update-topic', updateController.updateTopic)

module.exports = route