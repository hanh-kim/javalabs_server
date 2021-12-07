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

var io = require('socket.io')(server)
server.listen(port)

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

var idRoom = '';
io.sockets.on('connection', function (socket) {
    console.log("đã kết nối máy chủ thử nghiệm ")
    socket.on('joinQiz', function (chat) {
        const Data = JSON.parse(chat);
        console.log(chat)

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(Data.questionId)
        if (Data.message == '') {
            return
        } else {
            Chat({
                questionId: Data.questionId,
                userId: Data.username,
                username: Data.username,
                quizId: Data.questionId,
                vote: Data.vote,
                imageUrl: Data.imageUrl,
                message: Data.message,
                date: date,
            }).save().then(chat => {

            }).catch(e => {

            })
        }

        idRoom = Data.questionId
        socket.join(Data.questionId)
        io.in(Data.questionId).emit('private_message', {data: Data});
    });

    socket.on('disconnect', function () {
        console.log('đã ngắt kết nối  máy chủ thử nghiệm ');

    });

});



