'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateLogin(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;


  if (username === '' || password === '') {
    res.status(422).json({ error: true, message: 'username and password fields must not be empty' });
  }

  next();
}

exports.default = validateLogin;
//# sourceMappingURL=validateLogin.js.map