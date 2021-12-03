const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatModel = new Schema({
    id: {type: String, default: ''},
    userId: {type: String, default: ''},
    questionId: {type: String, default: ''},
    message: {type: String, default: ''}
})
module.exports = mongoose.model('ChatModel', ChatModel)