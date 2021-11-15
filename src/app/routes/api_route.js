const express = require('express')
const route = express.Router()
const apiController = require('../controllers/ApiController')

route.get('/get-lesson', apiController.getAllLesson)

route.get('/get-topic', apiController.getTopicByLessonId)

route.get('/get-quiz', apiController.getQuizByLessonId)

route.get('/get-all-in-lesson', apiController.getAllByLesson)

module.exports = route

