const Process = require('../model/ProcessModel')

class ProcessController {
    insertOrUpdate(req, res) {
        if (req.body.userId == null || req.body.lessonId == null) {
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền ít nhất userId, lessonId',
                isSuccess: false
            })
            return
        }


        Process.findOne({
            userId: req.body.userId,
            lessonId: req.body.userId,
        }).then(process => {
            if (process == null) {
                var arr = [];
                if (req.body.completed != null)
                    arr.push(req.body.completed)
                Process({
                    userId: req.body.userId,
                    lessonId: req.body.userId,
                    completed: arr,
                    status: req.body.status,
                    quizStatus: req.body.quizStatus,
                    quizMarked: req.body.quizMarked,
                    dateTime: req.body.dateTime,
                    lastModify: req.body.dateTime
                }).save().then(pr => {
                    res.json({
                        code: 200,
                        message: 'Thành công',
                        isSuccess: true,
                        process: pr
                    })
                }).catch(e => res.json({
                    code: 404,
                    message: 'Thất bại',
                    isSuccess: false
                }))
            } else {
                //change value:
                if (req.body.completed != null) {
                    var arrCompleted = process.completed;
                    for (var i of req.body.completed) {
                        arrCompleted.push(i)
                    }
                    process.completed = arrCompleted
                }
                if (req.body.status != null) {
                    process.status = req.body.status
                }
                if (req.body.quizStatus != null) {
                    process.quizStatus = req.body.quizStatus
                }
                if (req.body.quizMarked != null) {
                    process.quizMarked = req.body.quizMarked
                }
                if (req.body.quizStatus != null) {
                    process.lastModify = req.body.dateTime
                }

                process.save().then(pro => {
                    res.json({
                        code: 200,
                        message: 'Thành công',
                        isSuccess: true,
                        process: pro
                    })
                }).catch(e => res.json({
                    code: 404,
                    message: 'Thất bại',
                    isSuccess: false
                }))

            }
        }).catch(e => {
            res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            })
        })
    }

    getProcess(req, res) {
        if(req.query.userId == null || req.query.lessonId == null){
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền userId, lessonId',
                isSuccess: false
            })
        }
        Process.findOne({ lessonId: req.query.lessonId, userId: req.query.userId }).then(process => {
            res.json({
                code: 200,
                message: 'Thành công',
                isSuccess: true,
                data: process
            })
        }).catch(e => {
            res.json({
                code: 404,
                message: 'Thất bại',
                isSuccess: false
            })
        })
    }

    getProcessByUser(req, res) {
        if(req.query.userId == null){
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền userId',
                isSuccess: false
            })
        }
        Process.find({userId: req.query.userId }).then(process => {
            res.json({
                code: 200,
                message: 'Thành công',
                isSuccess: true,
                data: process
            })
        }).catch(e => {
            res.json({
                code: 404,
                message: 'Thất bại',
                isSuccess: false
            })
        })
    }
}


module.exports = new ProcessController()