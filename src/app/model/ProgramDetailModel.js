const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProgramDetail = new Schema({
    programId: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' }
})

module.exports = mongoose.model('ProgramDetail', ProgramDetail)
