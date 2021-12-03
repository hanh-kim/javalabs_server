const Chat = require('../model/ChatModel')

class ChatController {
    addComment(req, res) {
        if (req.body.questionId == null ||
            req.body.userId == null ||
            req.body.quizId == null ||
            req.body.message == null ||
            req.body.date == null) {
            res.json({
                message: 'Cần truyền questionId, userId, quizId, message, date'
            })
            return
        }
        Chat({
            questionId: req.body.questionId,
            userId: req.body.questionId,
            quizId: req.body.quizId,
            vote: req.body.vote,
            message: req.body.message,
            date: req.body.date,
        }).save().then(chat => {
            res.json({
                message: 'Thành công',
                code: 200,
                isSuccess: true,
                data: chat
            })
        }).catch(e => {
            res.json({
                message: e.message,
                code: 404,
                isSuccess: false,
            })
        })
    }

    updateComment(req, res) {
        if (req.body.id == null) {
            res.json({
                message: 'Cần truyền id'
            })
            return
        }

        Chat.findOne({ _id: req.body.id }).then(chat => {
            if (chat != null) {
                chat.vote = Number(chat.vote) + 1
                chat.save().then(c => res.json({
                    message: 'Thành công',
                    code: 200,
                    isSuccess: true,
                    data: c
                })).catch(e => res.json({
                    message: e.message,
                    code: 404,
                    isSuccess: false,
                }))
            }
        })
    }


    deleteChat(req, res) {
        if (req.body.id == null) {
            res.json({ message: 'Cần truyền params id', status: false })
            return
        }
        Chat.deleteOne({ _id: req.body.id }, function (err) {
            if (!err) {
                res.json({
                    message: 'Xoa thành công',
                    code: 200,
                    isSuccess: true,
                }) 
                return
            }else{
                res.json({ message: err.message, status: false, code: 400 })
            }
            
        })
        
    }

    getChatByQuestion(req, res) {
        if (req.query.questionId == null) {
            res.json({ message: 'Cần truyền params questionId', status: false })
            return
        }
        Chat.find({ questionId: req.query.questionId }).then(chats => {
            res.json({
                message: 'Thành công',
                code: 200,
                isSuccess: true,
                data: chats
            })
        }).catch(e => res.json({
            message: e.message,
            code: 404,
            isSuccess: false,
        }))
    }

    getChatByQuiz(req, res) {
        if (req.query.quizId == null) {
            res.json({ message: 'Cần truyền params quizId', status: false })
            return
        }
        Chat.find({ quizId: req.query.quizId }).then(chats => {
            res.json({
                message: 'Thành công',
                code: 200,
                isSuccess: true,
                data: chats
            })
        }).catch(e => res.json({
            message: e.message,
            code: 404,
            isSuccess: false,
        }))
    }

    getAllChat(req, res){
        Chat.find({}).then(chats => {
            res.json({
                message: 'Thành công',
                code: 200,
                isSuccess: true,
                data: chats
            })
        }).catch(e => res.json({
            message: e.message,
            code: 404,
            isSuccess: false,
        }))
    }
}

module.exports = new ChatController()