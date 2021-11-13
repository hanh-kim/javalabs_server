const path = require('path')
const Lesson = require('../model/LessonModel')
const xlsx = require('xlsx');
const Topic = require('../model/TopicModel')
const Quiz = require('../model/QuizModel')

class LessonController {

    //read excel file:
    index(req, res) {
        res.render('add_page')
    }
    importLessonFromExcelFile(req, res, next) {
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
                let topicSheet = workbook.Sheets[workbook.SheetNames[1]]
                xlData = xlsx.utils.sheet_to_json(topicSheet);
                for (var i in xlData) {
                    console.log({
                        lessonId: newLesson._id,
                        title: xlData[i].title,
                        content: xlData[i].content
                    })
                    Topic({
                        lessonId: newLesson._id,
                        title: xlData[i].title,
                        content: xlData[i].content
                    }).save().then((newTopic) => {
                        return res.status(201).json({
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
                    })
                }

                //import quiz:
                const quizSheet = workbook.Sheets[workbook.SheetNames[2]]
                xlData = xlsx.utils.sheet_to_json(quizSheet);
                for (var i in xlData) {
                    Quiz({
                        lessonId: newLesson._id,
                        STT: xlData[i].STT,
                        question: xlData[i].question,
                        answer: [
                            xlData[i].answerA,
                            xlData[i].answerB,
                            xlData[i].answerC,
                            xlData[i].answerD
                        ],
                        correctAnswer: xlData[i].correctAnswer,

                    }).save().then((newTopic) => {
                        return res.status(201).json({
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
            });



        } catch (e) {
            res.send('Lỗi ' + e)
        }
    }

    //get all lesson:
    getAllLesson(req, res, next) {
        Lesson.find({}).then(lesson => res.json(lesson)).catch(e => res.json({ status: faild }))
    }

    getTopicByLessonId(req, res, next) {
        Topic.find({}).then(topic => res.json(topic)).catch(e => res.json({ status: faild }))
    }

}

module.exports = new LessonController()