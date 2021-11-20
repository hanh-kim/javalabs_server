const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Program = new Schema({
    name: { type: String, default: '' },
    image: { data: Buffer, contentType: String },
})

module.exports = mongoose.model('Program', Program)
