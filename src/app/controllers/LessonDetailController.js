const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel');
const QuestionModel = require('../model/QuestionModel');

class LessonDetailController {

    //Get /
    async index(req, res, next) {
        if (req.query.lessonId == null) {
            res.render('404')
            return;
        }

        try {
            const topic = await Topic.find({ lessonId: req.query.lessonId })
            var listTopic = []
            for (var i of topic) {
                var tp = new TopicMD(i.lessonId, i.title, i.content)
                listTopic.push(tp)
            }
            const quiz = await Quiz.findOne({ lessonId: req.query.lessonId })
            var listQuestion = []
            const question = await QuestionModel.find({ quizId: quiz._id }).sort({ STT: 1 })
            for (var i of question) {
                var qz = new QuizMD(i.STT, i.quizId, i.question, i.answerA, i.answerB, i.answerC, i.answerD, i.correctAnswer)
                listQuestion.push(qz)
            }
            res.render('lesson_detail', { quiz: listQuestion, topic: listTopic })

        } catch (e) {
            res.json({
                message: 'Loi',
                error: e.message
            })
        }
    }
}

class TopicMD {
    lessonId
    title
    content

    constructor(lessonId, title, content) {
        this.lessonId = lessonId
        this.title = title
        this.content = content
    }
}

class QuizMD {
    STT
    quizId
    question
    answerA
    answerB
    answerC
    answerD
    correctAnswer

    constructor(STT, quizId, question, answerA, answerB, answerC, answerD, correctAnswer) {
        this.STT = STT
        this.quizId = quizId
        this.answerA = answerA
        this.answerB = answerB
        this.answerC = answerC
        this.answerD = answerD
        this.question = question
        this.correctAnswer = correctAnswer
    }
}

module.exports = new LessonDetailController()
