import loginRoute from './login_route'
import lessonRoute from './lesson_route'
import apiRoute from './api_route'
import lessonDetailRoute from './lesson_detail_route'
import programRoute from './add_program_route'
import proRoute from './program_route'
import detailProgram from './detail_program_route'
import userRoute from './user_route'
import homeRoute from './home_route'
import updateRoute from './update_route'
import updateQuestionRoute from './update_question_route'
import updateProgramRoute from './update_program_route'
import qaRoute from './qa_route'
import discussionRoute from './chat_route'
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
    app.use('/discussion', discussionRoute)

    app.get('/forgot-password.html', (req, res) => {
        res.render('forgot-password')
    })

    app.get('/import.html', (req, res) => {
        res.render('import')
    })

    app.use('/pending_request', qaRoute)

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

    app.use('/update_program_detail', updateProgramRoute)

    app.use('/update-question', updateQuestionRoute)

    app.get('*', function (req, res) {
        res.render('404')
    });


}
export default route