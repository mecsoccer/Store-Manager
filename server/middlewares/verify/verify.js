exports.verifyAdmin = (req, res, next) => {
  if (req.headers.authorization != 'Bearer admin') {
    return res.status(401).json({ message: 'Sorry, accessible to admin only' });
  }

  return next();
};

exports.verifyAttendant = (req, res, next) => {
  if (req.headers.authorization != 'Bearer attendant') {
    return res.status(401).json({ message: 'Sorry, accessible to attendant only' });
  }

  return next();
};

exports.verifyAdminOrAttendant = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization != 'Bearer admin' && authorization != 'Bearer attendant') {
    return res.status(401).json({ message: 'Sorry, accessible to admin/attendant only' });
  }

  return next();
};

exports.creator = (req, res, next) => {
  next();
};
