const Lesson = require('../model/LessonModel')
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')
const Question = require('../model/QuestionModel')
const Program = require('../model/ProgramModel')
const ProgramDetail = require('../model/ProgramDetailModel')

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

    //get all in lesson
    async getAllByLesson(req, res, next) {
        var lesson = await Lesson.find({})
        var listData = [];
        for (var ls of lesson) {
            const topic = await Topic.find({ lessonId: ls._id })
            const quiz = await Quiz.findOne({ lessonId: ls._id })
            const question = await Question.find({ quizId: quiz._id }).sort({ STT: 1 })
            var quizMD = new QuizMD(quiz._id, quiz.lessonId, quiz.name, question)
            var lessonAll = new LessonAll(ls.id, ls.title, ls.totalTopic, topic, quizMD)
            listData.push(lessonAll)
        }
        res.json(listData)
    }

    //get Program:
    getProgram(req, res, next) {
        var listData = []
        Program.find({}).then(program => {
            for (var pr of program) {
                var data = Buffer.from(pr.image.data, "binary").toString("base64");
                var programMd = new ProgramMD(pr._id, pr.name, data)
                listData.push(programMd)
            }
            res.json(listData)

        }).catch(e => res.json({ error: e, message: 'Có lỗi' }))
    }

    //get program detail by id:
    getProgramDetail(req, res, nex) {
        if (req.query.programId == null) {
            res.json({
                message: 'Cần truyền param programId',
                status: false
            })
            return;
        }
        ProgramDetail.find({ programId: req.query.programId }).then(programDetail => {
            res.json(programDetail)
        }).catch(e => res.json({ message: 'Có lỗi', error: e }))
    }
}

class ProgramMD {
    _id
    name
    image
    constructor(id, name, image) {
        this._id = id
        this.name = name
        this.image = image
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