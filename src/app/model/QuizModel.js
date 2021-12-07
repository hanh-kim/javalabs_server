const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Quiz = new Schema({
    lessonId: { type: String, default: '' },
    name: { type: String, default: '' }
}, {
    versionKey: false
})
module.exports = mongoose.model('quiz', Quiz)