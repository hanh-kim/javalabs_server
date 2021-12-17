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
const User = require('./app/model/UserModel')

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
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
io.sockets.on('connection', function (socket) {
    console.log("đã kết nối máy chủ thử nghiệm  v1")
    socket.volatile.on('JoinRoomChat', function (chat) {
        const Data = JSON.parse(chat);

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
                socket.join(Data.questionId)
                io.in(Data.questionId).emit('ChatAtRoom', {data: chat});
            }).catch(e => {

            })


        } else {
            socket.join(Data.questionId)
            io.in(Data.questionId).emit('ChatAtRoom', {data: ''});
        }

    });
    socket.on('ClickLike', function (data, id) {
        const Data = JSON.parse(data);
        Chat.findOne({_id: Data._id}).then(chat => {
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
                    Chat.find({questionId: c.questionId}).then(chats => {
                        socket.join(Data.questionId)
                        io.in(Data.questionId).emit('Refresh', {data: chats});
                    })
                })
            }
        })

    });
    socket.on('userOut', function (id) {
        User.findOne({_id: id}).then(chat => {
            if (chat != null) {
                // chat.lastSignIn = date
                console.log('user đã out  phòng chat' + chat);

                chat.save().then(c => {
                    io.emit('out', {data: chat})
                })
            }
        })


    });


})


//kết nối

var FCM = require('fcm-node');
const {firestore} = require("firebase-admin");
var serverKey = 'AAAA1B7zZfc:APA91bGq3hOJ-QZmrMtnf5_63KsQvE75_E2HglUoiC3ITPqGrsV8O7IU3o9TOXhS4SGU4xfdmQ-mZcZ_7kxS3NGHVH9AJiz1tzRgZl9vmnk-OvTVh7_51dCEDrZ-VMvIuTvloTFMLngw';
var fcm = new FCM(serverKey);

var message = {
    to: 'dX_ztlvvZ3E:APA91bHGFd_RUphm7ufLsJWfK1fZl6XTXjdpmecCbkLQXGPsZVcnb5ww2OQ_yabXVe5nAk33zfkZ1TEWK5oT00-kOwE6Lh68Z4gbRGkJSk0uis2-QbHuHjPZ1AMZKsNXQECzoyGaAhnX',
    notification: {
        title: ' ơi , đã đến giờ học bài rồi ',
        body: 'Bổ xung kiến thức mới mỗi ngày, sẽ giúp bạn nâng cao trình độ bản thân ',
    },

    data: {
        title: 'tiêu đề là gì cho hay ',
        body: '{"name" : "Hi Want","product_id" : "123"}'
    }

};





// fcm.send(message, function (err, response) {
//     if (err) {
//         console.log("Something has gone wrong!" + err);
//     } else {
//         console.log("Successfullysent with response: ", response);
//     }
// });


server.listen(process.env.PORT || port)

