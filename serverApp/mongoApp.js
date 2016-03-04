var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Make sure these requires are before the routes requires (or errors occur)
var mongoose = require('mongoose');
require('./models/creature-schema');
mongoose.connect('mongodb://localhost/guild-data');

var routes = require('./serverRoutes/index');
// var users = require('./routes/users');



var mongoApp = express();

// view engine setup
mongoApp.set('views', path.join(__dirname, 'views'));
mongoApp.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//mongoApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
mongoApp.use(logger('dev'));
mongoApp.use(bodyParser.json());
mongoApp.use(bodyParser.urlencoded({ extended: false }));
mongoApp.use(cookieParser());
mongoApp.use(express.static(path.join(__dirname, 'public')));

mongoApp.use('/', routes);
// mongoApp.use('/users', users);

// catch 404 and forward to error handler
mongoApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (mongoApp.get('env') === 'development') {
  mongoApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
mongoApp.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = mongoApp;
