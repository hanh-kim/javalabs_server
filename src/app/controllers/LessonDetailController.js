const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')

class LessonDetailController {

    //Get /
    async index(req, res, next) {
        if (req.query.lessonId == null) {
            res.json({
                message: 'Cần truyền param lessonId',
                status: false
            })
            return;
        }


        try {
            const topic = await Topic.find({ lessonId: req.query.lessonId })
            var listTopic = []
            for (var i of topic) {
                var tp = new TopicMD(i.lessonId, i.title, i.content)
                listTopic.push(tp)
            }
            const quiz = await Quiz.find({ lessonId: req.query.lessonId })
            var listQuiz = []
            for (var i of quiz) {
                var qz = new TopicMD(i.lessonId, i.question, i.anwser.i.correctAnswer)
                listQuiz.push(qz)
            }
        res.render('lesson_detail', { quiz: listQuiz, topic: listTopic })

        }catch(e){
            res.json({message: 'Loi'})
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
    lessonId
    question
    anwser
    correctAnswer

    constructor(lessonId, question, anwser, correctAnswer) {
        this.lessonId = lessonId
        this.question = question
        this.anwser = anwser
        this.correctAnswer = correctAnswer
    }
}

module.exports = new LessonDetailController()
