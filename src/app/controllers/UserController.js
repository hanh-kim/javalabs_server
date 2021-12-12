const User = require('../model/UserModel')

class UserController {
    //insert user:
    insertUser(req, res, next) {
        if (req.body.gmail == null) {
            res.json({ message: 'gmail không được trống' })
            return
        }

        User.findOne({ gmail: req.body.gmail }).then(user => {
            if (user != null) {
                res.json({
                    message: "Thành công",
                    type: 1,
                    isSuccess: true,
                    code: 200,
                    data: user
                })
                return;
            } else {
                var mark = 0;
                if (req.body.mark == null) {
                    mark = 0;
                } else {
                    mark = req.body.mark
                }

                var username = ''
                if (req.body.username == null) {
                    username = ''
                } else {
                    username = req.body.username
                }
                User({
                    gmail: req.body.gmail,
                    mark: mark,
                    imageUrl: req.body.imageUrl,
                    username: username
                }).save().then(user => {
                    res.json({
                        message: "Thành công",
                        type: 0,
                        isSuccess: true,
                        code: 200,
                        data: user
                    })
                }).catch(e => res.json({
                    isSuccess: false,
                    message: e.message,
                    code: 404
                }))
            }

        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))


    }

    //update
    updateUser(req, res, next) {
        if (req.body.id == null || req.body.mark == null) {
            res.json({ message: 'Cân truyền id, mark' })
            return
        }
        User.findOne({ _id: req.body.id }).then(user => {
            if (user == null) {
                res.json({ message: "User không tồn tại, kiểm tra lại id", isSuccess: false })
            }
            var mark = user.mark;
            if (req.body.mark != '') {
                mark += Number(req.body.mark)
                user.mark = mark;
            }
            user.save().then(user => res.json(
                {
                    message: "success",
                    isSuccess: true,
                    code: 200,
                    data: user
                })).catch(e => res.json(
                    {
                        isSuccess: false,
                        message: e.message,
                        code: 404
                    }))
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    //get 
    getUser(req, res) {
        if (req.query.gmail == null) {
            res.json({
                isSuccess: false,
                message: "Cần truyền param gmail",
                code: 404
            })
        }
        User.findOne({ gmail: req.query.gmail }).then(user => {
            res.json({
                message: "success",
                isSuccess: true,
                code: 200,
                data: user
            })
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    //GET /
    index(req, res) {
        User.find({}).sort({ mark: -1 }).then(user => {
            var arr = []
            for (var i of user) {
                var obj = new UserMD(i.gmail, i.mark, i.username, i.imageUrl)
                arr.push(obj)
            }
            console.log(arr)

            res.render('user', { user: arr, totalUser: user.length })
        }).catch(e => {
            res.render('404')
        })
    }

    //get top N user:
    getTopUser(req, res) {
        if (req.query.topUser == null) {
            User.find({}).sort({ mark: -1 }).then(users => {
                var arr = []
                for (var i of users) {
                    arr.push({
                        _id: i._id,
                        gmail: i.gmail,
                        username: i.username,
                        imageUrl: i.imageUrl,
                        mark: i.mark,
                        top: users.indexOf(i) + 1
                    })
                }
                res.json({
                    message: "success",
                    isSuccess: true,
                    code: 200,
                    data: arr
                })
                return
            }).catch(e => {
                res.json({
                    isSuccess: false,
                    message: e.message,
                    code: 404
                })
            })
        } else {
            User.find({}).limit((Number(req.query.topUser))).sort({ mark: -1 }).then(users => {
                var arr = []
                for (var i of users) {
                    arr.push({
                        _id: i._id,
                        gmail: i.gmail,
                        username: i.username,
                        imageUrl: i.imageUrl,
                        mark: i.mark,
                        top: users.indexOf(i) + 1
                    })
                }
                res.json({
                    message: "success",
                    isSuccess: true,
                    code: 200,
                    data: arr
                })
                return
            }).catch(e => {
                res.json({
                    isSuccess: false,
                    message: e.message,
                    code: 404
                })
            })
        }

    }
}

class UserMD {
    gmail
    mark
    username
    imageUrl

    constructor(gmail, mark, username, imageUrl) {
        this.gmail = gmail
        this.mark = mark
        this.username = username
        this.imageUrl = imageUrl
    }
}

module.exports = new UserController()