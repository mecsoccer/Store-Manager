"use strict";

var _http = _interopRequireDefault(require("http"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _ejs = _interopRequireDefault(require("ejs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _home = _interopRequireDefault(require("./routes/home"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)(); // view engine setup

app.set('views', _path.default.join(__dirname, 'UI'));
app.engine('html', _ejs.default.renderFile);
app.set('view engine', 'html');
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, 'UI')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://mecsoccer.github.io/Store-Manager');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE');
  next();
});
app.use('/', _home.default);
app.use('/api/v1', _index.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var port = process.env.PORT || '3000';
app.set('port', port);

var server = _http.default.createServer(app);

server.listen(port);
module.exports = app;
//# sourceMappingURL=app.js.map