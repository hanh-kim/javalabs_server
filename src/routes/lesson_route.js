const express = require('express')
const route = express.Router()
const lessonController = require('../app/controllers/LessonController')

//GET /lesson
route.get('/', lessonController.index)


module.exports = route