const path = require('path')
const Lesson = require('../model/LessonModel')
const xlsx = require('xlsx');
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')
const Question = require('../model/QuestionModel')

class LessonController {


    index(req, res) {
        Lesson.find({}).then(
            lesson => {
                var listLesson = []
                for (var i of lesson) {
                    var ls = new LessonMD(i.title, i.totalTopic, i._id)
                    listLesson.push(ls)
                }
                res.render('lesson', { lesson: listLesson });
            }).catch(e => res.json({ status: e }))
    }

    //read excel file:
    async importLessonFromExcelFile(req, res, next) {
        const workbook = xlsx.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        if (sheet_name_list.length < 3) {
            res.send('<h1>File sai định dạng</h1>');
            return;
        }

        try {
            //import lesson
            let lessonSheet = workbook.Sheets[workbook.SheetNames[0]]
            var xlData = xlsx.utils.sheet_to_json(lessonSheet);

            Lesson({
                title: xlData[0].title,
                totalTopic: xlData[0].totalTopic,
            }).save().then((newLesson) => {
                //import quiz:
                Quiz({
                    lessonId: newLesson._id,
                    name: xlData[0].quizName
                }).save().then((newQuiz) => {
                    //import question:
                    const questionSheet = workbook.Sheets[workbook.SheetNames[2]]
                    xlData = xlsx.utils.sheet_to_json(questionSheet);
                    for (var i of xlData) {
                        Question({
                            quizId: newQuiz._id,
                            STT: i.STT,
                            question: i.question,
                            answerA: i.answerA,
                            answerB: i.answerB,
                            answerC: i.answerC,
                            answerD: i.answerD,
                            correctAnswer: i.correctAnswer,
                        }).save().catch((error) => {
                            console.log(error);
                            res.status(500).json({
                                success: false,
                                message: 'Create failed. Please try again.',
                                error: error.message,
                            });
                            return;
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Create failed. Please try again.',
                        error: error.message,
                    });
                    return;
                })
                let topicSheet = workbook.Sheets[workbook.SheetNames[1]]
                xlData = xlsx.utils.sheet_to_json(topicSheet);
                for (var i in xlData) {
                    Topic({
                        lessonId: newLesson._id,
                        title: xlData[i].title,
                        content: xlData[i].content
                    }).save().catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            success: false,
                            message: 'Create failed. Please try again.',
                            error: error.message,
                        });
                        return;
                    })
                }

                res.status(201).json({
                    success: true,
                    message: 'Create successfully',
                })
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Create failed. Please try again.',
                    error: error.message,
                });
                return;
            });



        } catch (e) {
            res.send('Lỗi ' + e)
        }
    }

}


class LessonMD {
    title
    topic
    _id
    constructor(title, totalTopic, _id) {
        this.title = title,
            this.totalTopic = totalTopic,
            this._id = _id
    }
}

module.exports = new LessonController()