const User = require('../model/UserModel')
const Lesson = require('../model/LessonModel')
const QA = require('../model/QAModel')
const Process = require('../model/ProcessModel')
const { updateQA } = require('./QAController')


class HomeController {
    async getProperty(req, res) {
        var user = await User.find({})
        var ls = await Lesson.find({})
        var qa = await QA.find({})

        var data = new Map();
        var length = ls.length;
        var process = await Process.find({})
        for (var i of process) {
            if (!data.has(i.lessonId)) {
                data.set(i.lessonId, 1)
            } else {
                var count = Number(data.get(i.lessonId)) + 1
                data.set(i.lessonId, count)
            }
        }
        const dataSorted = new Map([...data.entries()].sort((a, b) => b[1] - a[1]));

        var listId = []
        dataSorted.forEach((value, key) => {
            listId.push(key)
        })

        var topBelow = await Lesson.find({ _id: { $nin: listId } });
        for (var k of topBelow) {
            dataSorted.set(k._id.toString(), 0)
        }
        listId = []
        dataSorted.forEach((value, key) => {
            listId.push(key)
        })
        var listLesson = ''
        var listCount = ''
        for (var j of listId) {
            try {
                var lesson = await Lesson.findOne({ _id: j })
                if (lesson != null) {
                    listLesson += lesson.title + '/'
                    listCount += dataSorted.get(j) + '/'
                }
            } catch (e) {
                res.json({
                    status: false,
                    message: e.message,
                    code: 404
                })
            }
        }
        res.render('home', { user: user.length, lesson: length, qa: qa.length, listLesson: listLesson, listCount: listCount })
    }
}

module.exports = new HomeController()