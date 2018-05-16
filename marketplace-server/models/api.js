var mongoose = require('mongoose')

var apiSchema = new mongoose.Schema({
    name: String,
    description: String,
    URIs: []
})


const api = mongoose.model('api', apiSchema, 'api-collection')

module.exports = api;