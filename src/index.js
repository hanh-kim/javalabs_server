const express = require('express')
const app = express();
const handlebars = require('express-handlebars');
// const morgan = require('morgan');
const {extname} = require('path');
const path = require('path')


const db = require('./config/db')
const route = require('./app/routes')
const port = 3000;
//import thư  viện socket
var server = require("http").Server(app)
const Chat = require('./app/model/ChatModel')
const ChatController = require('./app/controllers/ChatController')

var io = require('socket.io')(server)

//connect to mongodb
db.connect()

//HTTP logger
// app.use(morgan('combined'))

//use public folder
app.use(express.static(path.join(__dirname, 'public')))

//body parse giúp xem đc params thông qua body. VD: req.body._ten_param
app.use(express.urlencoded({extended: true}))
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
    console.log("đã kết nối máy chủ thử nghiệm ")
    socket.volatile.on('JoinRoomChat', function (chat) {
        const Data = JSON.parse(chat);

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(Data.questionId)
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

            }).catch(e => {

            })
            socket.join(Data.questionId)
            io.in(Data.questionId).emit('ChatAtRoom', {data: Data});

        } else {
            socket.join(Data.questionId)
            io.in(Data.questionId).emit('ChatAtRoom', {data: ''});
        }

    });

    socket.on('ClickLike', function (data) {
        const Data = JSON.parse(data);
        socket.join(Data.questionId)
        io.in(Data.questionId).emit('Refresh', {data: Data});

    });


    socket.on('disconnect', function () {
        console.log('đã ngắt kết nối  máy chủ thử nghiệm ');
        socket.on('leaveroom', function () {
            console.log('user đã out  phòng chat');
        });

    });

})


server.listen(process.env.PORT || port)

