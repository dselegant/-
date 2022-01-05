var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin/admin.js');
const lrRouter = require('./routes/loginregister/lr.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 配置session
app.use(session({
  secret: "xzsagjasoigjasoi",
  resave:true,//强制保存session
  cookie:{
    maxAge:7*24*60*60*1000,//设置session的有效期为1周
  },
  saveUninitialized:true//是否保存初始化的session
}))
// 前台路由
app.use('/', indexRouter);
// 后台路由
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/lr',lrRouter);
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
