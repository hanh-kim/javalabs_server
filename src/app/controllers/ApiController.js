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
            if (quiz == null) {
                res.json({})
                return
            }
            Question.find({ quizId: quiz._id }).then(question => res.json(question)).catch(e => {
                res.json({ message: "Lỗi", status: false, err: e })
                return
            })
        }).catch(e => {
            res.json({ message: "Lỗi", status: false, err: e })
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
                // var data = Buffer.from(pr.image.data, "binary").toString("base64");
                var programMd = new ProgramMD(pr._id, pr.name, pr.image)
                listData.push(programMd)
            }
            res.json(listData)

        }).catch(e => res.json({ error: e, message: 'Có lỗi' }))
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
        }).catch(e => res.json({ message: 'Có lỗi', error: e }))
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


    //insert user:
    insertUser(req, res, next) {
        if (req.body.gmail == null) {
            res.json({ message: 'gmail không được trống' })
            return
        }
        var mark = 0;
        if (req.body.mark == null) {
            mark = 0;
        } else {
            mark = req.body.mark
        }

        var username = ''
        if (req.body.username == null) {
            username = ''
        } else {
            username = req.body.username
        }
        User({
            gmail: req.body.gmail,
            mark: mark,
            username: username
        }).save().then(user => {
            res.json({ message: "Thành công", isSuccess: true })
            console.log(user)
        }).catch(e => res.json({ message: "Thất bại", isSuccess: false }))
    }


    updateUser(req, res, next) {
        if (req.body.gmail == null || req.body.mark == null) {
            res.json({ message: 'Cân truyền gmail, mark' })
            return
        }
        User.findOne({ gmail: req.body.gmail }).then(user => {
            if (user == null) {
                res.json({ message: "User không tồn tại, kiểm tra lại gmail", isSuccess: false })
            }
            var mark = 0;
            if (req.body.mark != '') {
                mark = req.body.mark
            }
            user.mark += Number(req.body.mark)
            user.save().then(user => res.json({ message: "Thành công", isSuccess: true, user: user })).catch(e => res.json({ message: 'Lỗi', isSuccess: false, error: e.message }))
        }).catch(e => res.json({ message: 'Lỗi', isSuccess: false, error: e.message }))
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