"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function validateLogin(req, res, next) {
  var _req$body = req.body,
      usernameInput = _req$body.usernameInput,
      passwordInput = _req$body.passwordInput;

  if (usernameInput === '' || passwordInput === '') {
    res.status(422).json({
      error: true,
      message: 'username and password fields must not be empty'
    });
  }

  next();
}

var _default = validateLogin;
exports.default = _default;
//# sourceMappingURL=validateLogin.js.map