
const ProgramDetailModel = require('../model/ProgramDetailModel');

class ProgramDetailController {

    //Get /
    index(req, res) {
        if (req.query.programId == null) {
            res.json({ message: 'ProgramId không được trống' })
            return
        }
        ProgramDetailModel.find({ programId: req.query.programId }).then(program => {
            var listProgramDetail = []
            for (var i of program) {
                var pr = new ProgramDetailMD(i.content, i.title, i._id)
                listProgramDetail.push(pr)
                console.log(pr)
            }
            res.render('program_detail', { program: listProgramDetail });
        }).catch(e => res.json({ status: false, message: 'Lỗi', error: e.message }))
    }


    // //delete topic:
    // async deleteTopic(req, res, next) {
    //     if (req.body.id_topic == null) {
    //         res.json({ message: 'Cần truyền params id', status: false })
    //         return
    //     }
    //     Topic.deleteOne({ _id: req.body.id_topic }, function (err) {
    //         if (err) {
    //             res.json({ message: 'Delete failed', status: false, err: err })
    //             return
    //         }
    //     })
    //     const ls = await Lesson.findById(req.body.lessonId);
    //     ls.totalTopic = ls.totalTopic - 1
    //     await ls.save().catch(err => {
    //         res.json({ message: 'Delete failed', status: false, err: err })
    //         return
    //     })
    //     res.redirect('/lesson_detail?lessonId=' + req.body.lessonId)
    // }

    // //delete quiz:
    // deleteQuiz(req, res, next) {
    //     console.log(req.body)
    //     if (req.body.id == null) {
    //         res.json({ message: 'Cần truyền params id', status: false })
    //         return
    //     }
    //     QuestionModel.deleteOne({ _id: req.body.id }, function (err) {
    //         if (err) {
    //             res.json({ message: 'Delete failed', status: false, err: err })
    //             return
    //         }
    //         res.redirect('/lesson_detail?lessonId=' + req.body.lessonId)
    //     })
    // }
}


class ProgramDetailMD {
    content
    title
    _id
    constructor(content, title, _id) {
        this.content = content
        this.title = title
        this._id = _id
    }
}

module.exports = new ProgramDetailController()
