const express = require('express')
const app = express();
const handlebars = require('express-handlebars');
// const morgan = require('morgan');
const { extname } = require('path');
const path = require('path')


const db = require('./config/db')
const route = require('./app/routes')
const port = 3000;
//import thư  viện socket
var server = require("http").Server(app)
const Chat = require('./app/model/ChatModel')

var io = require('socket.io')(server)

//connect to mongodb
db.connect()

//HTTP logger
// app.use(morgan('combined'))

//use public folder
app.use(express.static(path.join(__dirname, 'public')))

//body parse giúp xem đc params thông qua body. VD: req.body._ten_param
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//template handlebars
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))
// socket

//set route
route(app)


io.sockets.on('connection', function (socket) {
    socket.volatile.on('JoinRoomChat', function (chat) {
        const Data = JSON.parse(chat);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        if (!Data.message == null || !Data.message == '') {
            Chat({
                questionId: Data.questionId,
                userId: Data.userId,
                username: Data.username,
                quizId: Data.questionId,
                vote: Data.vote,
                imageUrl: Data.imageUrl,
                message: Data.message,
                date: date,
            }).save().then(chat => {
                socket.join(Data.questionId)
                io.in(Data.questionId).emit('ChatAtRoom', { data: chat });
            }).catch(e => {

            })


        } else {
            socket.join(Data.questionId)
            io.in(Data.questionId).emit('ChatAtRoom', { data: '' });
        }

    });

    socket.on('ClickLike', function (data, id) {
        const Data = JSON.parse(data);
        Chat.findOne({ _id: Data._id }).then(chat => {
            if (chat != null) {
                var arr = chat.userLiked
                if (chat.userLiked.includes(id)) {
                    chat.vote = Number(chat.vote) - 1
                    var index = arr.indexOf(id);

                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                } else {
                    chat.vote = Number(chat.vote) + 1
                    arr.push(id)

                }
                chat.userLiked = arr
                chat.save().then(c => {
                    Chat.find({ questionId: c.questionId }).then(chats => {
                        socket.join(Data.questionId)
                        io.in(Data.questionId).emit('Refresh', { data: chats });
                    })
                })
            }
        })
    });


    socket.on('disconnect', function () {
        socket.on('leaveroom', function () {
        });
    });

})


server.listen(process.env.PORT || port)

