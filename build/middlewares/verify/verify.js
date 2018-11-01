'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var secret = process.env.SECRET_KEY;
var apiKey = process.env.ApiKey;

function verifyAdmin(req, res, next) {
  var password = req.authData.password;

  var hash = _bcryptjs2.default.hashSync(password, 10);

  if (!_bcryptjs2.default.compareSync(apiKey, hash)) {
    return res.status(401).json({ message: 'Sorry, accessible to admin only' });
  }

  return next();
}

function verifyAttendant(req, res, next) {
  var password = req.authData.password;

  var hash = _bcryptjs2.default.hashSync(password, 10);

  if (_bcryptjs2.default.compareSync(apiKey, hash)) {
    return res.status(401).json({ message: 'Sorry, accessible to store attendants only' });
  }

  return next();
}

function authVerify(req, res, next) {
  var authorization = req.headers.authorization;


  if (!authorization) {
    return res.status(401).json({
      message: 'Please, you have to sign in',
      error: true
    });
  }

  _jsonwebtoken2.default.verify(authorization, secret, function (err, authData) {
    if (err) {
      return res.status(401).json({
        message: 'You must provide valid authorization',
        error: true
      });
    }
    req.authData = authData;
    return next();
  });
}

exports.default = { verifyAdmin: verifyAdmin, verifyAttendant: verifyAttendant, authVerify: authVerify };
//# sourceMappingURL=verify.js.map