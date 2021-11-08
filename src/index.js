const express = require('express')
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const { extname } = require('path');
const path = require('path')
const app = express()
const db = require('./config/db')
const route = require('./routes')
const port = 3000

//connect to mongodb
db.connect()

//HTTP logger
// app.use(morgan('combined'))

//use public folder
app.use(express.static(path.join(__dirname, 'public/')))

//body parse giúp xem đc params thông qua body. VD: req.body._ten_param
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//template handlebars
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))

//set route
route(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})