"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var secret = process.env.SECRET_KEY;

function verifyAdmin(req, res, next) {
  var role = req.authData.role;

  if (role === 'admin') {
    return next();
  }

  return res.status(401).json({
    message: 'Sorry, accessible to admin only'
  });
}

function verifyAttendant(req, res, next) {
  var role = req.authData.role;

  if (role === 'attendant') {
    return next();
  }

  return res.status(401).json({
    message: 'Sorry, accessible to store attendants only'
  });
}

function authVerify(req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: 'Please, you have to sign in',
      error: true
    });
  }

  _jsonwebtoken.default.verify(authorization, secret, function (err, authData) {
    if (err) {
      return res.status(401).json({
        message: 'You must provide valid authorization',
        error: true
      });
    }

    req.authData = authData;
  });

  return next();
}

var _default = {
  verifyAdmin: verifyAdmin,
  verifyAttendant: verifyAttendant,
  authVerify: authVerify
};
exports.default = _default;
//# sourceMappingURL=verify.js.map