const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Question = new Schema({
    quizId: { type: String, default: '' },
    STT: { type: Number, default: 0 },
    question: { type: String, default: '' },
    answer: {
        type: Array, default: []
    },
    correctAnswer: { type: Number, default: 0 }
})
module.exports = mongoose.model('Question', Question)