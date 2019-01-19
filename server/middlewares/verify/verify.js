import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY;

function verifyAdmin(req, res, next) {
  const { role } = req.authData;

  if (role !== 'admin') {
    return res.status(401).json({ message: 'Sorry, accessible to admin only' });
  }

  return next();
}

function verifyAttendant(req, res, next) {
  const { role } = req.authData;

  if (role !== 'attendant') {
    return res.status(401).json({ message: 'Sorry, accessible to store attendants only' });
  }

  return next();
}

function authVerify(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Please, you have to sign in',
      error: true,
    });
  }

  jwt.verify(authorization, secret, (err, authData) => {
    if (err) {
      return res.status(401).json({
        message: 'You must provide valid authorization',
        error: true,
      });
    }
    req.authData = authData;
    return next();
  });
}

export default { verifyAdmin, verifyAttendant, authVerify };
