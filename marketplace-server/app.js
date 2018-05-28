var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/api-marketplace')
  .then(() => { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/api-marketplace`) })
  .catch(() => { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/api-marketplace`) })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
