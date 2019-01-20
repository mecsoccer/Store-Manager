'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateSignup(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      email = _req$body.email;


  var errors = [];

  if (username.length < 1) errors.push('username field must not be empty');

  if (password.length < 1) errors.push('password field not be empty');

  if (email.length < 7 || !email.includes('@') || !email.includes('.com')) {
    errors.push('enter a valid email');
  }

  if (errors.length > 0) res.json({ errors: errors, success: false });

  return next();
}

exports.default = validateSignup;
//# sourceMappingURL=validateSignup.js.map