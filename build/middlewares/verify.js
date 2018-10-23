'use strict';

exports.admin = function (req, res, next) {
  if (req.headers.authorization != 'Bearer admin') {
    return res.status(401).json({ message: 'Sorry, accessible to admin only' });
  }

  return next();
};

exports.attendant = function (req, res, next) {
  if (req.headers.authorization != 'Bearer attendant') {
    return res.status(401).json({ message: 'Sorry, accessible to attendant only' });
  }

  return next();
};

exports.adminOrAttendant = function (req, res, next) {
  var authorization = req.headers.authorization;


  if (authorization != 'Bearer admin' && authorization != 'Bearer attendant') {
    return res.status(401).json({ message: 'Sorry, accessible to admin/attendant only' });
  }

  return next();
};

exports.creator = function (req, res, next) {
  next();
};
//# sourceMappingURL=verify.js.map