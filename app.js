var createError = require('http-errors');
var express = require('express'); //加载express模板
var path = require('path');//路径模板
var cookieParser = require('cookie-parser');//这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var logger = require('morgan');//在控制台中，显示req请求的信息
var ejs= require('ejs');
// 路由信息（接口地址），存放在routes的根目录
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info');
var infoLogin = require('./routes/login');
var upload = require('./routes/upload');
var messageTemplate = require('./routes/message');
var app = express();
// view engine setup模板开始
app.set('views', path.join(__dirname, 'views'));//设置视图根目录
// app.set('view engine', 'jade');//设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）
app.engine('.html',ejs.__express);//设置视图引擎后缀，为.html
app.set('view engine','html');// 设置视图引擎为html
// 载入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置路由，（'自定义路径'，上面设置的接口地址）
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info',infoRouter);
app.use('/login',infoLogin);
app.use('/upload',upload);
app.use('/message',messageTemplate);
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
