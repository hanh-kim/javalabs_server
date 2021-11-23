const express = require('express')
const route = express.Router()
const prgramDetailController = require('../controllers/ProgramDetailController')

route.get('/', prgramDetailController.index)

// route.post('/delete_quiz', lessonDetailController.deleteQuiz)

// route.post('/delete_topic', lessonDetailController.deleteTopic)

module.exports = route