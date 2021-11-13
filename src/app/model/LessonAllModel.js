const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LessonAll = new Schema({
    lesson: { type: Object, default: null },
    topic: { type: Array, default: [] },
    quiz: { type: Array, default: [] }
})
module.exports = mongoose.model('LessonAll', LessonAll)