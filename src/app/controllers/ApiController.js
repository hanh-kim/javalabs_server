const Lesson = require('../model/LessonModel')
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')
const Question = require('../model/QuestionModel')
const Program = require('../model/ProgramModel')
const ProgramDetail = require('../model/ProgramDetailModel')
const User = require('../model/UserModel')

class ApiController {

    //get all lesson:
    getAllLesson(req, res, next) {
        Lesson.find({}).then(lesson => res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: lesson,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    } 

    //get topic by id
    getTopicByLessonId(req, res, next) {
        if (req.query.lessonId == null) {
            res.json({
                message: 'Cần truyền param lessonId',
                isSuccess: false
            })
            return;
        }
        Topic.find({ lessonId: req.query.lessonId }).then(topic => {
            res.json({
                isSuccess: true,
                code: 200,
                message: "success",
                data: topic,
            })
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    //get question by id
    getQuestionByLessonId(req, res, next) {
        if (req.query.lessonId == null) {
            res.json({
                message: 'Cần truyền param lessonId',
                isSuccess: false
            })
            return;
        }
        Quiz.findOne({ lessonId: req.query.lessonId }).then(quiz => {
            if (quiz == null) {
                res.json({
                    isSuccess: true,
                    code: 200,
                    message: "success",
                    data: [],
                })
                return
            }
            Question.find({ quizId: quiz._id }).then(question => res.json({
                isSuccess: true,
                code: 200,
                message: "success",
                data: question,
            })).catch(e => {
                res.json({
                    status: false,
                    message: e.message,
                    code: 404
                })
                return
            })
        }).catch(e => {
            res.json({
                isSuccess: false,
                status: false,
                message: e.message,
                code: 404
            })
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
        res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: listData
        })
    }

    //get Program:
    getProgram(req, res, next) {
        var listData = []
        Program.find({}).then(program => {
            for (var pr of program) {
                // var data = Buffer.from(pr.image.data, "binary").toString("base64");
                var programMd = new ProgramMD(pr._id, pr.name, pr.image)
                listData.push(programMd)
            }
            res.json(listData)

        }).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }

    //get program detail by id:
    getProgramDetail(req, res, next) {
        if (req.query.programId == null) {
            res.json({
                message: 'Cần truyền param programId',
                status: false
            })
            return;
        }
        ProgramDetail.find({ programId: req.query.programId }).then(programDetail => {
            res.json(programDetail)
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    //get all in program
    async getAllInProgram(req, res, next) {
        var program = await Program.find({})
        var listData = [];
        for (var pr of program) {
            const programDetail = await ProgramDetail.find({ programId: pr._id })
            // var data = Buffer.from(pr.image.data, "binary").toString("base64");
            var program = new ProgramWithDetail(pr._id, pr.name, programDetail, pr.image)
            listData.push(program)
        }
        res.json(listData)
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

class ProgramWithDetail {
    _id
    name
    image
    programDetail
    constructor(id, name, programDetail, image) {
        this._id = id
        this.name = name
        this.image = image
        this.programDetail = programDetail
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