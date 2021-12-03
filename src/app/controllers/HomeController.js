const User = require('../model/UserModel')
const Lesson = require('../model/LessonModel')
const QA = require('../model/QAModel')


class HomeController{
    async getProperty(req, res){
        var user = await User.find({})
        var lesson = await Lesson.find({})
        var qa = await QA.find({})
        res.render('home', {user : user.length, lesson: lesson.length,qa: qa.length})
    }
}

module.exports = new HomeController()