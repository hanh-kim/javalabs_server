const FCM = require('fcm-node');
const {firestore} = require("firebase-admin");


class NotificationController {
    index(req, res) {
        res.render('login')
    }

    sendNotifi(req, res) {
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

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!" + err);
            } else {
                console.log("Successfullysent with response: ", response);
            }
        });
    }
}

module.exports = new NotificationController()