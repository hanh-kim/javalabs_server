var nodemailer = require('nodemailer');
const constance = require('../constance/index')

class FeedBackController {
    index(req, res) {
        res.render('login')
    }

    async adminsendMail(req, res) {
        const transporter = nodemailer.createTransport({
            host: constance.mailHost,
            port: constance.mailPort,
            secure: false,
            auth: {
                user: constance.adminEmail,
                pass: constance.adminPassword
            }
        })

        const options = {
            from: constance.adminEmail, // địa chỉ admin email  dùng để gửi
            to: req.body.email, // địa chỉ gửi đến
            subject: req.body.subject,// Tiêu đề của mail
            html: `
<style>
h3:{
color: #0527fa;
}
</style>
<h4 style="color: #2d4373;font-family: 'Candara'" class="text-primary m-0 font-weight-bold">${req.body.message}</h4>
    <h3 style="color: #2d4373;font-family: 'Candara'">Thank You & Best Regards.</h3>
        <p> ----------------------------------</p>
    <ul>  
      <li style="font-size: larger; color: #f34626;font-style: italic">Admin: Nguyen Hai Dang</li>
      <li style="color: #055ada">Company: JavaLab</li>
      <li style="color: #055ada">Email: dragonfly.javalab@gmail.com</li>
      <li style="color: #055ada">Phone: 0359424773</li>
      <li style="color: #055ada">Address: 1th floor,No.5 Trinh Van Bo,Xuan Phuong ,Nam Tu Liem, Ha Noi, Viet Nam</li>
    </ul>
`
        }

        transporter.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.render("index.html  ")
            }
        });


    }

    async sendMailFeedBack(req, res) {
        var transport = nodemailer.createTransport({
            host: constance.mailHost,
            port: constance.mailPort,
            service: "Gmail",
            auth: {
                user: constance.adminEmail,
                pass: constance.adminPassword
            }

        });
        const options = {
            from: constance.adminEmail, // địa chỉ admin email  dùng để gửi
            to: req.query.email, // địa chỉ gửi đến
            subject: req.query.subject,// Tiêu đề của mail
            html: constance.auto + constance.autoMess
        }

        transport.sendMail(options, function (error, info) {
            if (error) {
                res.json({
                    message: error
                })
            } else {
                res.json({
                    message: 'đã được'
                })
            }
        });


    }

    nextFeedBack(req, res) {
        console.log(req.query.id);
        res.render('feedback')
    }


}

module.exports = new FeedBackController();