const express = require('express')
const route = express.Router()
const lessonDetailController = require('../controllers/LessonDetailController')

route.get('/', lessonDetailController.index)


module.exports = route