const express = require('express')
const route = express.Router()
const lessonController = require('../controllers/LessonController')

route.get('/get-lesson', lessonController.getAllLesson)

route.get('/get-topic', lessonController.getTopicByLessonId)

route.get('/get-quiz', lessonController.getQuizByLessonId)

route.get('/get-all-lesson', lessonController.getAllByLesson)

module.exports = route

