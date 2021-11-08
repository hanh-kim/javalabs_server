const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lesson = new Schema({
    title: {String, default: ''},
    totalTopic: {Number, default: 0}
})
module.exports = mongoose.model('Lessons', Lesson)