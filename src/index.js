const express = require('express')
const app = express();
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const {extname} = require('path');
const path = require('path')

const db = require('./config/db')
const route = require('./app/routes')
const port = 3000;
//import thư  viện socket
var server = require("http").Server(app)
var io = require('socket.io')(server)
server.listen(port)

//connect to mongodb
db.connect()

//HTTP logger
app.use(morgan('combined'))

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

    socket.on('send_message', function (message) {
        const text = JSON.parse(message);
        io.sockets.emit('receiver_message', {message});

    });

    socket.on('joinQiz', function (dataroom) {
        const text = JSON.parse(dataroom);
        console.log('data :\t'+dataroom);

        //luu monggo

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


        socket.join(text.idRoom)
        io.in(text.idRoom).emit('private_message', {dataroom});
    });


});

