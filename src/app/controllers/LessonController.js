const path = require('path')
const Lesson = require('../model/LessonModel')
const xlsx = require('xlsx');
const Topic = require('../model/TopicModel')

class LessonController {

    //read excel file:
    index(req, res) {
        res.render('add_page')
    }



    importLessonFromExcelFile(req, res, next) {
        const workbook = xlsx.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        if (sheet_name_list.length < 2) {
            res.send('<h1>File sai định dạng</h1>');
            return;
        }
        let lessonSheet = workbook.Sheets[workbook.SheetNames[0]]

        try {
            const lesson = Lesson({
                title: lessonSheet[`A${2}`].v,
                totalTopic: parseInt(lessonSheet[`B${2}`].v),
            })
            lesson.save().then((newLesson) => {
                let topicSheet = workbook.Sheets[workbook.SheetNames[1]]
                var range = xlsx.utils.decode_range(topicSheet['!ref']);
                var num_rows = range.e.r - range.s.r + 1;

                for (var i = 2; i <= num_rows; i++) {
                    const topic = Topic({
                        lessonId: newLesson._id,
                        title: topicSheet[`A${i}`].v,
                        content: topicSheet[`B${i}`].v
                    })
                    topic.save().then((newTopic) => {
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
            })
                .catch((error) => {
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