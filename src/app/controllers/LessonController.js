const Lesson = require('../model/LessonModel')
class LessonController{
    index(req,res){
        Lesson.find({}, function(err, lessons){
            if(!err) 
                res.json(lessons)
            else
                res.json({status : 'Loi'})
        })
        // res.render('lesson')
    }
}

module.exports = new LessonController()