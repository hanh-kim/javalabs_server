const loginRoute = require('./login')

function route(app) {
    app.use('/', loginRoute)

    app.use('/login.html', loginRoute)

    app.get('/404.html', (req, res) => {
        res.render('404')
    })
    app.get('/add_page.html', (req, res) => {
        res.render('add_page')
    })
    app.get('/discussion.html', (req, res) => {
        res.render('discussion')
    })
    app.get('/forgot-password.html', (req, res) => {
        res.render('forgot-password')
    })
    app.get('/index.html', (req, res) => {
        res.render('home')
    })
    app.get('/import.html', (req, res) => {
        res.render('import')
    })
    app.get('/lesson.html', (req, res) => {
        res.render('lesson')
    })
    app.get('/lesson_detail.html', (req, res) => {
        res.render('lesson_detail')
    })
    app.get('/pending_request.html', (req, res) => {
        res.render('pending_request')
    })
    app.get('/profile.html', (req, res) => {
        res.render('profile')
    })
    app.get('/program_detail.html', (req, res) => {
        res.render('program_detail')
    })
    app.get('/programs.html', (req, res) => {
        res.render('programs')
    })
    app.get('/quiz.html', (req, res) => {
        res.render('quiz')
    })
    app.get('/register.html', (req, res) => {
        res.render('register')
    })
    app.get('/user.html', (req, res) => {
        res.render('user')
    })

}
module.exports = route