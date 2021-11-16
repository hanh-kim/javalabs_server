const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Question = new Schema({
    quizId: { type: String, default: '' },
    STT: { type: Number, default: 0 },
    question: { type: String, default: '' },
    answerA: { type: String, default: '' },
    answerB: { type: String, default: '' },
    answerC: { type: String, default: '' },
    answerD: { type: String, default: '' },
    correctAnswer: { type: String, default: '' }
})
module.exports = mongoose.model('Question', Question)