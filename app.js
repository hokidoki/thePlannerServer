const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


//
const config = require('./public/javascripts/config');
//
const app = express();
//
const signIn = require('./routes/user/signIn');
const signUp = require('./routes/user/signUp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//auth-key
app.set('jwt-secret',config.secret);

//route
app.use('/signin',signIn);
app.use('/signup',signUp);

// app.use('/',function(req, res, next) {
//   var err = new Error('Not Found - from app.js');
//   err.status = 404;
//   next(err);}
// )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
