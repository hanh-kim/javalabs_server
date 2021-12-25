const QA = require('../model/QAModel')

class QAController {
    index(req, res) {
        QA.find().sort({status: 1}).then(qa => {
            var arr = []
            for (var i of qa) {
                var stt = ''
                if (i.status == 1) {
                    stt = 'Resolved'
                } else {
                    stt = 'Pending'
                }
                arr.push({userId: i.userId, title: i.title, content: i.content, status: stt, _id: i._id})
            }
            res.render('pending_request', {QA: arr})
        }).catch(e => res.send('Loi ' + e.message))
    }

    //addd
    addQA(req, res) {
        if (req.body.userId == null || req.body.content == null) {
            res.json({
                message: 'Cần truyền userId và content',
                isSuccess: false
            })
            return
        }
        QA({
            userId: req.body.userId,
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        }).save().then(qa => res.json({
            message: "Thanh cong",
            code: 200,
            isSuccess: true,
            data: qa
        })).catch(e => res.json({
            message: e.message,
            code: 404,
            isSuccess: false
        }))
    }

    updateQA(req, res) {
        if (req.body.id == null) {
            res.json({
                message: 'Cần truyền id ',
                isSuccess: false
            })
            return
        }
        QA.findOne({_id: req.body.id}).then(qa => {
            qa.status = 1
            qa.save().then(q => res.redirect('/pending_request')).catch(e => res.json({
                message: e.message,
                code: 404,
                isSuccess: false
            }))
        }).catch(e => es.json({
            message: e.message,
            code: 404,
            isSuccess: false
        }))
    }

    deleteQA(req, res) {
        if (req.body.id == null) {
            res.json({message: 'Cần truyền params id', status: false})
            return
        }
        QA.deleteOne({_id: req.body.id}, function (err) {
            if (err) {
                res.json({message: 'Delete failed', status: false, err: err})
                return
            }
            res.redirect('/pending_request')
        })
    }
}

module.exports = new QAController()