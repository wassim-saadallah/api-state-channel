var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var clientsRouter = require('./routes/clients')
var usersRouter = require('./routes/users');
var clientsMd = require('./middlewares/clientMiddleware')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());



app.use('/users',clientsMd, usersRouter);
app.use('/clients', clientsRouter);

module.exports = app;
