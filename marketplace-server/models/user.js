var mongoose = require('mongoose')
var apiSchema = require('./api')

var userSchema = new mongoose.Schema({
    uid: String,
    address: String,
    api_ids: [mongoose.Schema.Types.ObjectId]
})


const user = mongoose.model('user', userSchema, 'user-collection')

module.exports = user;