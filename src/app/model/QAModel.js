const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QA = new Schema({
    userId: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    status: { type: Number, default: 0 }
}, {
    versionKey: false
})

module.exports = mongoose.model('QA', QA)
