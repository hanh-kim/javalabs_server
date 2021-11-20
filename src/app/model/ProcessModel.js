const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Process = new Schema({
    userId: { type: String, default: '' },
    lessonId: { type: String, default: '' },
    completed: { type: Number, default: 0 },
    status: { type: Number, default: -1 },
    quizStatus: { type: Number, default: -1 },
    quizMarked: { type: Number, default: 0 },
    dateTime: { type: String, default: '' }
})

module.exports = mongoose.model('Process', Process)
