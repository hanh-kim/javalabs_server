const express = require('express')
const route = express.Router()
const programController = require('../controllers/ProgramController')

route.get('/', programController.index)


module.exports = route