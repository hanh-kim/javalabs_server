const express = require('express')
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const { extname } = require('path');
const path = require('path')
const app = express()
const port = 3000

//HTTP logger
app.use(morgan('combined'))

//use public folder
app.use(express.static(path.join(__dirname, 'public/')))

//template handlebars
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))


//set path
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/login.html', (req, res) => {
    res.render('login')
})
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})