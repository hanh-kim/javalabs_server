const loginRoute = require('./login_route')
const lessonRoute = require('./lesson_route')
const apiRoute = require('./api_route')
const lessonDetailRoute = require('./lesson_detail_route')
const programRoute = require('./add_program_route')
const proRoute = require('./program_route')
const detailProgram = require('./detail_program_route')

function route(app) {
    app.use('/', loginRoute)

    app.use('/api', apiRoute)

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
    app.use('/lesson.html', lessonRoute)

    app.use('/lesson_detail', lessonDetailRoute)
    app.get('/pending_request.html', (req, res) => {
        res.render('pending_request')
    })
    app.get('/profile.html', (req, res) => {
        res.render('profile')
    })
    app.use('/add_program', programRoute)

    app.use('/program_detail', detailProgram)

    app.use('/programs.html', proRoute)

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