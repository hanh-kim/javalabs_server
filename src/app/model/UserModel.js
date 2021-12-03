const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    gmail: { type: String, default: '' },
    username: { type: String, default: '' },
    mark: { type: Number, default: 0 }
})

module.exports = mongoose.model('User', User)
