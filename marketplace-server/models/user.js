var mongoose = require('mongoose')
var apiSchema = require('./api')

var userSchema = new mongoose.Schema({
    uid: String,
    api_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'api'
    }
})


const user = mongoose.model('user', userSchema, 'api-collection')

module.exports = user;