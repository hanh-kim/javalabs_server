const express = require('express')
const route = express.Router()
const apiController = require('../controllers/ApiController')
const processController = require('../controllers/ProcessController')
const userController = require('../controllers/UserController')


route.get('/get-lesson', apiController.getAllLesson)

route.get('/get-topic', apiController.getTopicByLessonId)

route.get('/get-quiz', apiController.getQuestionByLessonId)

route.get('/get-all-in-lesson', apiController.getAllByLesson)

route.get('/get-program', apiController.getProgram)

route.get('/get-program-detail', apiController.getProgramDetail)

route.get('/get-all-in-program', apiController.getAllInProgram)

route.post('/insert-user', userController.insertUser)

route.post('/update-mark-user', userController.updateUser)

route.get('/get-top-user', userController.getTopUser)

route.get('/get-user', userController.getUser)

route.post('/update-process', processController.insertOrUpdate)

route.get('/get-process', processController.getProcess)

route.get('/get-all-process', processController.getProcessByUser)

route.get('/get-daily-score', apiController.getDailyScore)

module.exports = route

