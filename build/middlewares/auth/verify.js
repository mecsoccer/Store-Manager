"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = _interopRequireDefault(require("../../models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var secret = process.env.SECRET_KEY;

function authVerify(req, res, next) {
  var authorization = req.headers.authorization;

  if (authorization) {
    _jsonwebtoken.default.verify(authorization, secret, function (err, authData) {
      if (err) {
        res.status(401).json({
          error: 'please provide valid token'
        });
      }

      if (authData) {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: 'please, you have to sign in'
    });
  }
}

function verifyAdmin(req, res, next) {
  var role = req.authData.role;

  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({
      error: 'Sorry, accessible to admin only'
    });
  }
}

function verifyAttendant(req, res, next) {
  var role = req.authData.role;

  if (role === 'attendant') {
    next();
  } else {
    res.status(403).json({
      error: 'Sorry, accessible to store attendants only'
    });
  }
}

function verifyAdminOrSeller(req, res, next) {
  var saleId = req.params.saleId;
  var _req$authData = req.authData,
      username = _req$authData.username,
      role = _req$authData.role;

  _database.default.query('SELECT * FROM sales WHERE id=$1;', [saleId]).then(function (salesArray) {
    var sale = salesArray.rows[0];

    if (!sale) {
      res.status(404).json({
        error: 'sale record does not exist'
      });
    } else if (sale.seller === username || role === 'admin') {
      next();
    } else {
      res.status(403).json({
        error: 'sorry, resource accessible to seller and admin only'
      });
    }
  }).catch(
  /* istanbul ignore next */
  function (err) {
    return res.status(500).json(err);
  });
}

var _default = {
  authVerify: authVerify,
  verifyAdmin: verifyAdmin,
  verifyAttendant: verifyAttendant,
  verifyAdminOrSeller: verifyAdminOrSeller
};
exports.default = _default;
//# sourceMappingURL=verify.js.map