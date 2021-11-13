const express = require('express')
const route = express.Router()
const lessonController = require('../controllers/LessonController')

route.get('/get-lesson', lessonController.getAllLesson)

route.get('/get-topic', lessonController.getTopicByLessonId)

module.exports = route

