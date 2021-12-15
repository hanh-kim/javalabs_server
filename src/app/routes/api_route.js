const express = require('express')
const route = express.Router()
const apiController = require('../controllers/ApiController')
const processController = require('../controllers/ProcessController')
const userController = require('../controllers/UserController')
const qaController = require('../controllers/QAController')
const chatController = require('../controllers/ChatController')


//lesson
route.get('/get-lesson', apiController.getAllLesson)

route.get('/get-topic', apiController.getTopicByLessonId)

route.get('/get-quiz', apiController.getQuestionByLessonId)

route.get('/get-all-in-lesson', apiController.getAllByLesson)

//program
route.get('/get-program', apiController.getProgram)

route.get('/get-program-detail', apiController.getProgramDetail)

route.get('/get-all-in-program', apiController.getAllInProgram)

// user && mark
route.post('/insert-user', userController.insertUser)

route.post('/update-mark-user', userController.updateUser)

route.get('/get-top-user', userController.getRank)

// route.get('/get-rank', userController.getRank)

route.get('/get-user', userController.getUser)

route.get('/get-daily-score', apiController.getDailyScore)

route.get('/get-score-profile', apiController.getMarkProfile)

// process
route.post('/update-process', processController.insertOrUpdate)

route.get('/get-process', processController.getProcess)

route.get('/get-all-process', processController.getProcessByUser)



//qa
route.post('/add-qa', qaController.addQA)

//chat:
route.post('/add-comment', chatController.addComment)

route.post('/update-comment', chatController.updateComment)

route.post('/delete-comment', chatController.deleteChat)

route.get('/get-comment-by-question', chatController.getChatByQuestionId)

route.get('/get-comment-by-quiz', chatController.getChatByQuiz)

route.get('/get-all-comment', chatController.getAllChat)

route.get('/get-comment-by-questionid', chatController.getChatByQuestion)



module.exports = route

