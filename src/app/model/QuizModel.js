const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Quiz = new Schema({
    lessonId: { type: String, default: '' },
    STT: { type: Number, default: 0 },
    question: { type: String, default: '' },
    answerA: { type: Array, default: [] },
    correctAnswer: { type: String, default: '' }
})
module.exports = mongoose.model('quiz', Quiz)