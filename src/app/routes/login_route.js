const express = require('express')
const route = express.Router()

//GET /login
route.get('/', (req, res) => {
    res.render('login')
})


module.exports = route