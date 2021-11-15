const Lesson = require('../model/LessonModel')
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')

class ApiController {

    //get all lesson:
    getAllLesson(req, res, next) {
        Lesson.find({}).then(lesson => res.json(lesson)).catch(e => res.json({ status: faild }))
    }

    //get topic by id
    getTopicByLessonId(req, res, next) {
        if(req.query.lessonId == null){
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

    //get quiz by id
    getQuizByLessonId(req, res, next) {
        if(req.query.lessonId == null){
            res.json({
            message: 'Cần truyền param lessonId',
            status: false
        })
        return;
    }
        Quiz.find({lessonId: req.query.lessonId}).then(quiz => res.json(quiz)).catch(e => res.json({ status: 'Có lỗi xảy ra' }))
    }

    //get all
    async getAllByLesson(req, res, next) {
        const lesson = await Lesson.find({})
        var listData = [];
        for (var ls of lesson) {
            const topic = await Topic.find({ lessonId: ls._id })
            const quiz = await Quiz.find({ lessonId: ls._id })

            const lessonAll = new LessonAll(lesson,topic, quiz)
            listData.push(lessonAll);
        }
        res.json(listData)
    }

}
class LessonMD{
    title = '';
    totalTopic = '';
    
    constructor(title, totalTopic){
        this.title = title
        this.totalTopic = totalTopic
    }

}

class LessonAll{
    lesson
    topic
    quiz
    constructor(lesson, topic, quiz){
        this.lesson = lesson,
        this.topic = topic,
        this.quiz = quiz
    }
}
                
module.exports = new ApiController()