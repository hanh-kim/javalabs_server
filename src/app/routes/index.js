const loginRoute = require('./login_route')
const lessonRoute = require('./lesson_route')
const apiRoute = require('./api_route')
const lessonDetailRoute = require('./lesson_detail_route')
const programRoute = require('./add_program_route')
const proRoute = require('./program_route')
const detailProgram = require('./detail_program_route')
const userRoute = require('./user_route')
const homeRoute = require('./home_route')
const updateRoute = require('./update_route')
const Question = require('../model/QuestionModel')

function route(app) {

    app.use('/', loginRoute)

    app.use('/api', apiRoute)

    app.use('/login.html', loginRoute)

    app.use('/index.html', homeRoute)

    app.use('/lesson_detail', lessonDetailRoute)

    app.use('/add_program', programRoute)

    app.use('/program_detail', detailProgram)

    app.use('/programs.html', proRoute)

    app.use('/lesson.html', lessonRoute)

    app.use('/user.html', userRoute)

    app.get('/add_page.html', (req, res) => {
        res.render('add_page')
    })
    app.get('/discussion.html', (req, res) => {
        res.render('discussion')
    })

    app.get('/forgot-password.html', (req, res) => {
        res.render('forgot-password')
    })

    app.get('/import.html', (req, res) => {
        res.render('import')
    })

    app.get('/pending_request', (req, res) => {
        res.render('pending_request') 
    })
    app.get('/profile.html', (req, res) => {
        res.render('profile')
    })

    app.get('/quiz.html', (req, res) => {
        res.render('quiz')
    })
    app.get('/register.html', (req, res) => {
        res.render('register')
    })

    app.use('/update_topic', updateRoute)

    app.get('/update-question', (req, res) => {
        if (req.query.id == null) {
            res.send('Cần truyền Id')
        }
        Question.findOne({ _id: req.query.id }).then(ques => {
            console.log(ques)
            var cr = '';
                if (ques.correctAnswer == 1) {
                    cr = 'A';
                } else if (ques.correctAnswer == 2) {
                    cr = 'B';
                } else if (ques.correctAnswer == 3) {
                    cr = 'C';
                } else if (ques.correctAnswer == 4) {
                    cr = 'D';
                } else {
                    cr = ''
                }
            var a = { 
                id: ques._id, 
                question: ques.question, 
                anA : ques.answer[0], 
                anB : ques.answer[1], 
                anC : ques.answer[2], 
                anD : ques.answer[3], 
                correct: cr
            }
            res.render('update_question', { ques: a })
        }).catch(e => res.json(e.message))
    })

    app.get('*', function (req, res) {
        res.render('404')
    });

}
module.exports = route