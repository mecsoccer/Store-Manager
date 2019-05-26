"use strict";

var _http = _interopRequireDefault(require("http"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));

var _saleRoutes = _interopRequireDefault(require("./routes/saleRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE');
  next();
});
app.use('/api/v1/auth', _userRoutes.default);
app.use('/api/v1/users', _userRoutes.default);
app.use('/api/v1/products', _productRoutes.default);
app.use('/api/v1/sales', _saleRoutes.default); // catch 404 and forward to error handler

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