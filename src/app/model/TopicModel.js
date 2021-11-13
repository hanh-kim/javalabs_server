const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Topic = new Schema({
    lessonId: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' }
})
module.exports = mongoose.model('topic', Topic)