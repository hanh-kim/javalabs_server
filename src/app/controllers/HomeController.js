const User = require('../model/UserModel')
const Lesson = require('../model/LessonModel')
// const User = require('../model/UserModel')


class HomeController{
    async getProperty(req, res){
        var user = await User.find({})
        var lesson = await Lesson.find({})

        res.render('home', {user : user.length, lesson: lesson.length})
    }
}

module.exports = new HomeController()