const Lesson = require('../model/LessonModel')
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')
const Question = require('../model/QuestionModel')

class ApiController {

    //get all lesson:
    getAllLesson(req, res, next) {
        Lesson.find({}).then(lesson => res.json(lesson)).catch(e => res.json({ status: faild }))
    }

    //get topic by id
    getTopicByLessonId(req, res, next) {
        if (req.query.lessonId == null) {
            res.json({
                message: 'Cần truyền param lessonId',
                status: false
            })
            return;
        }
        Topic.find({ lessonId: req.query.lessonId }).then(topic => {
            res.json(topic)
        }).catch(e => res.json({ status: 'Có lỗi xảy ra' }))
    }

    //get question by id
    getQuestionByLessonId(req, res, next) {
        if (req.query.lessonId == null) {
            res.json({
                message: 'Cần truyền param lessonId',
                status: false
            })
            return;
        }
        Quiz.findOne({ lessonId: req.query.lessonId }).then(quiz => {
            Question.find({ quizId: quiz._id }).then(question => res.json(question))
        })
    }

    //get all
    async getAllByLesson(req, res, next) {
        var lesson = await Lesson.find({})
        var listData = [];
        for (var ls of lesson) {
            const topic = await Topic.find({ lessonId: ls._id })
            const quiz = await Quiz.findOne({ lessonId: ls._id }).sort()
            const question = await Question.find({ quizId: quiz._id }).sort({ STT: 1 })
            var quizMD = new QuizMD(quiz._id, quiz.lessonId, quiz.name, question)
            var lessonAll = new LessonAll(ls.id, ls.title, ls.totalTopic, topic, quizMD)
            listData.push(lessonAll)
        }
        res.json(listData)
    }

}
class QuizMD {
    _id
    lessonId
    name
    question

    constructor(_id, lessonId, name, question) {
        this._id = _id
        this.lessonId = lessonId
        this.name = name
        this.question = question
    }

}


class LessonAll {
    id
    title
    totalTopic
    quiz
    topic
    constructor(id, title, totalTopic, topic, quiz) {
        this.id = id,
            this.title = title,
            this.totalTopic = totalTopic,
            this.topic = topic,
            this.quiz = quiz
    }
}

module.exports = new ApiController()