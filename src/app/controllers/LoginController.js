class LoginController {

    index(req, res) {
        res.render('login')
    }

}

module.exports = new LoginController()