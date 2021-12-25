const mongoose = require('mongoose');

async function connect() {
    try {
        const url = 'mongodb+srv://javalabs:123456789%40%40@javalabs.2ynww.mongodb.net/JavaLabs?retryWrites=true&w=majority'
        var a = await mongoose.connect(url);
        console.log('Connect to db success')
    } catch (e) {
        console.log('Connect to db failed')
    }
}

module.exports = {connect}