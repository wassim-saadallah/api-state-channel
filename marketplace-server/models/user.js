var mongoose = require('mongoose')
var apiSchema = require('./api')

var userSchema = new mongoose.Schema({
    uid: String,
    api_ids: [mongoose.Schema.Types.ObjectId]
})


const user = mongoose.model('user', userSchema, 'api-collection')

module.exports = user;