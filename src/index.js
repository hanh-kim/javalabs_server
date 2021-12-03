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
const Chat = require('./app/model/ChatModel')

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
        const data = JSON.parse(dataroom);
        console.log('data :\t' + dataroom);

        //luu monggo

        Chat({
            questionId: data.questionId,
            userId: data.username,
            quizId: data.questionId,
            vote: data.vote,
            message: data.message,
            date: '2021-12-3',
        }).save().then(chat => {

        }).catch(e => {

        })


        socket.join(data.questionId)
        io.in(data.idRoom).emit('private_message', {dataroom});
    });


});

