const express = require('express')
const route = express.Router()
const apiController = require('../controllers/ApiController')

route.get('/get-lesson', apiController.getAllLesson)

route.get('/get-topic', apiController.getTopicByLessonId)

route.get('/get-quiz', apiController.getQuestionByLessonId)

route.get('/get-all-in-lesson', apiController.getAllByLesson)

route.get('/get-program', apiController.getProgram)

route.get('/get-program-detail', apiController.getProgramDetail)

module.exports = route

